<template>
  <div>
    <!-- Mobile fixed-bottom navbar -->
    <nav class="mobile-fixed-bottom-navbar">
      <nuxt-link to="/" class="mobile-fixed-bottom-navbar-item">
        <i class='bx bx-home-alt'></i><small>صفحه اصلی</small>
      </nuxt-link>
      <a href="javascript:void(0)" @click="openLogreg" class="mobile-fixed-bottom-navbar-item" v-if="!$auth.loggedIn">
        <i class='bx bx-user'></i><small>ورود / ثبت نام</small>
      </a>
      <nuxt-link to="/profile" class="mobile-fixed-bottom-navbar-item" v-else>
        <i class='bx bx-user'></i><small>حساب کاربری</small>
      </nuxt-link>

      <a href="javascript:void(0)" @click="openLogreg" class="mobile-fixed-bottom-navbar-item" v-if="!$auth.loggedIn">
        <i class='bx bx-plus-circle'></i><small>میزبان شوید</small>
      </a>
      <template v-else>
        <nuxt-link to="/profile/residences" class="mobile-fixed-bottom-navbar-item" v-if="$auth.user.level === 3">
          <i class='bx bx-plus-circle'></i><small>مدیریت اقامتگاه ها</small>
        </nuxt-link>
        <nuxt-link to="/profile/residence/new" class="mobile-fixed-bottom-navbar-item" v-else>
          <i class='bx bx-plus-circle'></i><small>میزبان شوید</small>
        </nuxt-link>
      </template>

      <a href="javascript:void(0)" @click="openLogreg" class="mobile-fixed-bottom-navbar-item" v-if="!$auth.loggedIn">
        <i class='bx bx-plus-circle'></i><small>سفر های من</small>
      </a>
      <nuxt-link to="/checkOut" class="mobile-fixed-bottom-navbar-item" v-else>
        <i class='bx bx-building-house'></i><small>سفر های من</small>
      </nuxt-link>
    </nav>

    <!-- Mobile login modal -->
    <section class="mobile-login-modal" :class="[vuexLogregMobileState ? '' : 'hidden']">
      <div class="modal-wrapper" v-if="rlStatus === 1">
        <button type="button" class="modal-close-btn" @click="closeMenu"><i class='bx bx-x'></i></button>
        <div class="h3">ورود / ثبت نام</div>
        <p>برای ورود یا ثبت نام، شماره همراه خود را وارد کنید</p>
        <form class="mobile-login-modal-form">
          <input type="text" placeholder="شماره همراه" v-model="mobile" :class="errors.mobile ? 'error' : ''" @keyup.enter="checkMobile">
          <span v-if="errors.mobile" class="error2">{{ errors.mobile[0] }}</span>
          <button type="button" v-if="checkingMobile === false" @click="checkMobile">
            ورود / ثبت نام
          </button>
          <button type="button" v-else>
            چند لحظه صبر کنید
          </button>
        </form>
      </div>
      <div class="modal-wrapper" v-if="rlStatus === 2">
        <button type="button" class="modal-close-btn" @click="returnToLogin"><i class='bx bx-x'></i></button>
        <div class="h3">ورود</div>
        <p>رمز عبور خود را وارد کنید</p>
        <form class="mobile-login-modal-form">
          <input type="text" v-model="password" :class="errors.password ? 'error' : ''" placeholder="رمز عبور" @keyup.enter="signIn">
          <span v-if="errors.password" class="error2">{{ errors.password[0] }}</span>

          <br>
          <a href="javascript:void(0)" @click="showRecoverPassword">رمز عبور را فراموش کرده اید ؟ کلیک کنید !</a>
          <br>

          <button type="button" v-if="signingIn === false" @click="signIn">
            ورود
          </button>
          <button type="button" v-else>
            چند لحظه صبر کنید
          </button>
        </form>
      </div>
      <div class="modal-wrapper" v-if="rlStatus === 3">
        <button type="button" class="modal-close-btn" @click="returnToLogin"><i class='bx bx-x'></i></button>
        <div class="h3">عضویت</div>
        <p>مشخصات خود را وارد کنید</p>
        <form class="mobile-login-modal-form">
          <input type="text" v-model="name" :class="errors.name ? 'error' : ''" placeholder="نام" @keyup.enter="signUp">
          <span v-if="errors.name" class="error2">{{ errors.name[0] }}</span>

          <input type="password" v-model="rpassword" :class="errors.rpassword ? 'error' : ''" placeholder="گذرواژه" @keyup.enter="signUp">
          <span v-if="errors.rpassword" class="error2">{{ errors.rpassword[0] }}</span>

          <input type="password" v-model="rerpassword" placeholder="تایپ مجدد گذرواژه" @keyup.enter="signUp">

          <input type="text" v-model="affiliateCode" :class="errors.affiliateCode ? 'error' : ''" placeholder="کد معرف" @keyup.enter="signUp" v-show="affiliateInput">
          <span v-if="errors.affiliateCode" class="error2">{{ errors.affiliateCode[0] }}</span>

          <button type="button" v-if="signingUp === false" @click="signUp">
            عضویت
          </button>
          <button type="button" v-else>
            چند لحظه صبر کنید
          </button>
        </form>
      </div>
      <div class="modal-wrapper" v-if="rlStatus === 4">
        <button type="button" class="modal-close-btn" @click="returnToLogin"><i class='bx bx-x'></i></button>
        <div class="h3">تأیید شماره موبایل</div>
        <p>کد را وارد کنید</p>
        <form class="mobile-login-modal-form">
          <input type="text" v-model="code" :class="errors.code ? 'error' : ''" placeholder="کد را وارد کنید" @keyup.enter="verify">
          <span v-if="errors.code" class="error2">{{ errors.code[0] }}</span>

          <br>
          <a href="javascript:void(0)" @click="resendCode" v-if="counter === 0">ارسال مجدد کد</a>
          <a href="javascript:void(0)" v-else>{{ counter }}</a>
          <br>

          <button type="button" v-if="verifying === false" @click="verify">
            بررسی کد
          </button>
          <button type="button" v-else>
            چند لحظه صبر کنید
          </button>
        </form>
      </div>
      <div class="modal-wrapper" v-if="rlStatus === 5">
        <button type="button" class="modal-close-btn" @click="returnToLogin"><i class='bx bx-x'></i></button>
        <div class="h3">بازیابی رمز عبور</div>
        <p>کد دریافت شده روی موبایل خود را وارد کنید</p>
        <form class="mobile-login-modal-form">
          <input type="text" v-model="code" :class="errors.code ? 'error' : ''" placeholder="کد را وارد کنید" @keyup.enter="recoverPassword">
          <span v-if="errors.code" class="error2">{{ errors.code[0] }}</span>

          <br>
          <a href="javascript:void(0)" @click="resendCode" v-if="counter === 0">ارسال مجدد کد</a>
          <a href="javascript:void(0)" v-else>{{ counter }}</a>
          <br>

          <button type="button" v-if="recoveringPassword === false" @click="recoverPassword">
            بررسی کد
          </button>
          <button type="button" v-else>
            چند لحظه صبر کنید
          </button>
        </form>
      </div>
    </section>

    <footer ref="footer" class="footer" :class="[vuexMenuState ? 'blur' : '',vuexLogregMobileState ? 'blur' : '']" @click="closeMenu">
      <nav class="top">
        <ul>
          <li><nuxt-link to="/">صفحه اصلی</nuxt-link></li>
          <li><nuxt-link to="/faq">سوالات متداول</nuxt-link></li>
          <li><nuxt-link to="/about">درباره ما</nuxt-link></li>
          <li><nuxt-link to="/contact">ارتباط با ما</nuxt-link></li>
        </ul>
        <no-ssr>
          <a class="go-to-top" href="javascript:void(0)" uk-totop uk-scroll>
            <i class="bx bx-chevron-up"></i>
          </a>
        </no-ssr>
      </nav>
      <div class="middle">
        <div class="info">
          <div class="logo">
            <div class="img">
              <img :src="settings.logo" :alt="settings.sitename" />
            </div>
            <div class="text">

            </div>
          </div>
          <div class="description" v-html="settings.aboutFooter"></div>
          <div class="contact">
            <div class="phone">
              <div class="img">
                <i class="bx bx-headphone"></i>
              </div>
              <div class="text">
                <span>تماس با پشتیبانی</span>
                <p>{{ settings.phone }}</p>
              </div>
            </div>
            <div class="social">
              <a v-if="settings.telegram !== null" :href="settings.telegram">
                <i class="bx bxl-telegram"></i>
              </a>
              <a v-if="settings.instagram !== null" :href="settings.instagram">
                <i class="bx bxl-instagram"></i>
              </a>
              <a v-if="settings.linkedin !== null" :href="settings.linkedin">
                <i class="bx bxl-linkedin"></i>
              </a>
              <a v-if="settings.twitter !== null" :href="settings.twitter">
                <i class="bx bxl-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="guiad">
          <h3>راهنمای مسافر</h3>
          <ul>
            <li><a href="#">پیگیری رزرو</a></li>
            <li><a href="#">قوانین رزرو</a></li>
            <li><a href="#">زمان های شگفت انگیز</a></li>
            <li><a href="#">لینک نمونه</a></li>
            <li><a href="#">لینک نمونه 2</a></li>
            <li><a href="#">لینک نمونه 3</a></li>
            <li><a href="#">لینک نمونه 4</a></li>
          </ul>
        </div>
        <div class="e-namad">
          <div>
            <a href="https://logo.samandehi.ir/Verify.aspx?id=315580&p=xlaorfthdshwdshwmcsiobpd" rel=”nofollow” target="_blank">
              <img referrerpolicy='origin' id = 'rgvjjxlzapfuapfuoeukesgt' style = 'cursor:pointer' alt = 'logo-samandehi' src = 'https://logo.samandehi.ir/logo.aspx?id=315580&p=qftinbpdujynujynaqgwlyma' />
            </a>
          </div>
          <div>
            <a href="#">

            </a>
          </div>
        </div>
      </div>
      <hr />
      <div class="copyright">
        <p>تمامی حقوق این وبسایت متعلق به {{ settings.sitename }} می باشد</p>
        <p>2021 - 2022</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      errors: {},
      mobile: null,
      password: null,
      code: null,
      name: null,
      rpassword: null,
      rerpassword: null,
      affiliateCode: null,
      affiliateInput: true,
      checkingMobile: false,
      signingIn: false,
      signingUp: false,
      verifying: false,
      recoveringPassword: false,
      rlStatus: 1,
      counter: 0
    }
  },
  methods: {
    closeMenu() {
      const footer = this.$refs.footer;
      if (footer.classList.contains('blur')) {
        this.$store.dispatch('setVuexMenuState',false);
        this.$store.dispatch('setVuexLogregMobileState',false);
      }
    },
    returnToLogin() {
      this.rlStatus = 1;
    },
    openLogreg() {
      if(window.innerWidth < 700) {
        this.$store.dispatch('setVuexMenuState',false);
        if(this.vuexLogregMobileState === true) {
          this.$store.dispatch('setVuexLogregMobileState',false);
        } else {
          this.$store.dispatch('setVuexLogregMobileState',true);
        }
      } else {
        if(this.vuexLogregState === true) {
          this.$store.dispatch('setVuexLogregState',false);
        } else {
          this.$store.dispatch('setVuexLogregState',true);
        }
      }
    },
    async showRecoverPassword() {
      let res = await this.$axios.post('api/v1/resendCode',{mobile:this.mobile});
      if(res.data.status === 1) {
        this.$snotify.success(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        this.rlStatus = 5;
      }
      else if (res.data.status === 422) {
        this.errors = res.data.errors;
        this.$snotify.warning(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
      }
      else {
        this.$snotify.error(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
      }
    },
    async checkMobile() {
      this.checkingMobile = true;
      const res = await this.$axios.post('api/v1/checkMobile', { mobile: this.mobile});
      if(res.data.status === 1) {
        this.rlStatus = 2;
        this.errors = [];
      } else if(res.data.status === 422) {
        this.errors = res.data.errors;
        this.$snotify.warning(res.data.msg, { timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true, });
      } else {
        const affiliateCode = this.$cookies.get('affiliateCode');
        if(affiliateCode) {
          this.affiliateInput = false;
          this.affiliateCode = affiliateCode;
        }
        this.rlStatus = 3;
        this.errors = [];
      }
      this.checkingMobile = false;
    },
    async signIn() {
      this.signingIn = true;
      const res = await this.$axios.post('api/v1/signIn', { mobile: this.mobile, password: this.password});
      if(res.data.status === 1) {
        this.errors = [];
        const res2 = await this.$auth.loginWith('local',{data:{'mobile':this.mobile,'password':this.password}});
        if(res2.data.status === 1) {
          this.$snotify.success(res2.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          this.openLogreg();
          this.rlStatus = 1;
        } else {
          this.$snotify.error(res2.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        }
      } else if(res.data.status === 422) {
        this.errors = res.data.errors;
        this.$snotify.warning(res.data.msg, { timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true, });
      } else {
        this.$snotify.error(res.data.msg, { timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true, });
        this.errors = [];
      }
      this.signingIn = false;
    },
    async signUp() {
      if(this.rpassword !== this.rerpassword) {
        this.$snotify.error('گذرواژه با تایپ مجدد آن خوانایی ندارد', { timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true, });
        this.errors = [];
        return;
      }
      this.signingUp = true;
      const res = await this.$axios.post('api/v1/signUp', { mobile: this.mobile, name: this.name, rpassword: this.rpassword, affiliateCode: this.affiliateCode});
      if(res.data.status === 1) {
        this.$snotify.success(res.data.msg, { timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true, });
        this.errors = [];
        this.rlStatus = 4;
      } else if(res.data.status === 422) {
        this.errors = res.data.errors;
        this.$snotify.warning(res.data.msg, { timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true, });
      } else {
        this.$snotify.error(res.data.msg, { timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true, });
        this.errors = [];
      }
      this.signingUp = false;
    },
    async verify() {
      this.errors = [];
      this.verifying = true;
      let res = await this.$axios.post('api/v1/verify',{'code':this.code,'mobile':this.mobile});
      if(res.data.status === 1) {
        const res2 = await this.$auth.loginWith('local',{data:{'mobile':this.mobile,'password':this.rpassword}});
        if(res2.data.status === 1) {
          this.$snotify.success(res2.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          this.openLogreg();
          this.rlStatus = 1;
        } else {
          this.$snotify.error(res2.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        }
      } else if (res.data.status === 422) {
        this.errors = res.data.errors;
        this.$snotify.warning(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
      }
      else {
        this.$snotify.error(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
      }
      this.verifying = false;
    },
    async resendCode() {
      if (this.counter <= 0) {
        this.resendVerifyCode();
        this.counter = 60;
        if (this.prevInterval) {
          clearInterval(this.prevInterval);
        }
        let resendButton = document.getElementById("resendButton");
        this.prevInterval = setInterval(() => {
          if (this.counter > 0) {
            this.counter -= 1;
            resendButton.innerHTML = this.counter + ' لطفاً صبور باشید';
          } else {
            resendButton.innerHTML = 'ارسال مجدد کد امنیتی';
          }
        }, 1000);
      }
    },
    async resendVerifyCode() {
      let res = await this.$axios.post('api/v1/resendCode',{mobile:this.mobile});
      if(res.data.status === 1) {
        this.$snotify.success(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
      }
      else if (res.data.status === 422) {
        this.errors = res.data.errors;
        this.$snotify.warning(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
      }
      else {
        this.$snotify.error(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
      }
    },
    async recoverPassword() {
      this.errors = [];
      this.recoveringPassword = true;
      let res = await this.$axios.post('api/v1/recoverPassword',{'code':this.code,'mobile':this.mobile});
      if(res.data.status === 1) {
        this.rlStatus = 2;
        this.$snotify.success(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
      } else if (res.data.status === 422) {
        this.errors = res.data.errors;
        this.$snotify.warning(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
      }
      else {
        this.$snotify.error(res.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
      }
      this.recoveringPassword = false;
    }
  },
  computed: {
    vuexMenuState() {
      return this.$store.getters.vuexMenuState
    },
    vuexLogregMobileState() {
      return this.$store.getters.vuexLogregMobileState
    },
    ...mapGetters(['settings']),
  },
}
</script>
