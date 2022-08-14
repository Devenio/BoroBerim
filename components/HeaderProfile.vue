<template>
  <header class="header">
    <nav class="top">
      <p v-if="!$auth.loggedIn" class="username">کاربر مهمان</p>
      <p v-else class="username">{{ $auth.user.name }}</p>
      <p class="date">{{ settings.date }}</p>
      <div>
        <ul>
          <li><nuxt-link to="/">خانه</nuxt-link></li>
          <li><nuxt-link to="/rules">قوانین</nuxt-link></li>
          <li><nuxt-link to="/contact">تماس با ما</nuxt-link></li>
          <li><nuxt-link to="/about">درباره ما</nuxt-link></li>
          <li><a href="javascript:void(0)">{{ settings.phone }}</a></li>
        </ul>
      </div>
    </nav>
    <no-ssr>
      <nav class="menu" uk-sticky="bottom: .footer">
        <div class="logo-login">
          <div class="logo">
            <div class="img">
              <nuxt-link to="/"><img :src="settings.logo" :alt="settings.sitename" /></nuxt-link>
            </div>
            <div class="text">

            </div>
          </div>
          <div v-if="!$auth.loggedIn" class="login-link">
            <a href="javascript:void(0)" @click="openLogreg"> <i class="bx bx-user"></i> ورود یا ثبت نام </a>
          </div>
          <div v-else class="login-link">
            <nuxt-link to="/profile"> <i class="bx bx-user"></i> پنل کاربری </nuxt-link>
          </div>
        </div>
        <div class="search"> <i class="bx bx-current-location right-input"></i>
          <input placeholder="دنبال چی میگردی ؟" v-model="title" @click="showModalProvince" />
          <button type="button" @click="search" class="left-input"> <i class="bx bx-search"></i> </button>
        </div>
        <div class="host-list" v-if="$auth.loggedIn">
          <nuxt-link to="/profile/residences" class="be-host" v-if="$auth.user.level === 3"> <i class="bx bx-home"></i> مدیریت اقامتگاه ها </nuxt-link>
          <nuxt-link to="/profile/residence/new" class="be-host" v-else> <i class="bx bx-home"></i> میزبان شوید </nuxt-link>
        </div>
        <div class="host-list" v-else>
          <nuxt-link to="/residences/search" class="be-host"> <i class="bx bx-building-house"></i> تمام اقامتگاه ها </nuxt-link>
        </div>
      </nav>
    </no-ssr>
    <div class="header__responsive">
      <div class="header__responsive-collapse" :class="[vuexMenuState ? 'active' : '']">
        <div class="collapse-menu">
          <div class="logo">
            <nuxt-link to="/">
              <img :src="settings.logo" :alt="settings.sitename" />
            </nuxt-link>
          </div>
          <div class="date-phone-login">
            <ul>
              <li>
                <a href="javascript:void(0)"> <i class="bx bx-phone"></i> {{ settings.phone }} </a>
              </li>
              <li>
                <a href="javascript:void(0)"> <i class="bx bxs-calendar"></i> {{ settings.date }} </a>
              </li>
              <li v-if="!$auth.loggedIn">
                <a href="javascript:void(0)" @click="openLogreg"> <i class="bx bx-user"></i> ورود یا ثبت نام </a>
              </li>
              <li v-else>
                <a href="javascript:void(0)" class="uk-text-danger"> <i class="bx bx-exit"></i> خروج </a>
              </li>
              <li class="list" v-show="$auth.loggedIn">
                <nuxt-link to="/profile"> <i class="bx bx-user"></i> حساب کاربری </nuxt-link>
              </li>
              <li class="list">
                <nuxt-link to="/residences/search"> <i class="bx bx-building-house"></i> لیست اقامتگاه ها </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="other">
            <ul>
              <li> <nuxt-link to="/">خانه</nuxt-link> </li>
              <li> <nuxt-link to="/rules">قوانین و مقررات</nuxt-link> </li>
              <li> <nuxt-link to="/contact">تماس با ما</nuxt-link> </li>
              <li> <nuxt-link to="/about">درباره ما</nuxt-link> </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="header__responsive-show">
        <div>
          <div class="logo">
            <nuxt-link to="/">
              <img :src="settings.logo" :alt="settings.sitename" />
            </nuxt-link>
          </div>
        </div>
        <form @submit.prevent="">
          <input type="text" placeholder="دنبال چی میگردی ؟" @click="showModalProvince" />
          <button type="button" @click="search"> <i class="bx bx-search"></i> </button>
        </form>
      </div>
    </div>
    <vk-modal id="logreg" :show.sync="vuexLogregState">
      <div v-if="rlStatus === 1">
        <button class="return" @click="openLogreg"> × </button>
        <div class="title">
          <i class="bx bxs-user-account"></i>
          <h2>ورود یا ثبت نام</h2>
          <p>لطفا ابتدا شماره موبایل خود را وارد کنید</p>
        </div>
        <form @submit.prevent="">
          <div class="form-group">
            <input type="text" v-model="mobile" :class="errors.mobile ? 'error' : ''" placeholder="شماره موبایل خود را وارد کنید" @keyup.enter="checkMobile" />
            <span v-if="errors.mobile" class="error">{{ errors.mobile[0] }}</span>
          </div>
          <div class="submit">
            <button v-if="checkingMobile === false" type="button" @click="checkMobile">
              ورود/ثبت نام
            </button>
            <button v-else type="button">چند لحظه صبر کنید</button>
          </div>
        </form>
      </div>
      <div v-if="rlStatus === 2">
        <button class="return" uk-tooltip="title: بازگشت به مرحله قبل; pos: right" @click="changeStatus(1)"> <i class="bx bx-arrow-back"></i> </button>
        <div class="title">
          <i class="bx bxs-user-account"></i>
          <h2>رمز عبور خود را وارد کنید</h2>
        </div>
        <form @submit.prevent="">
          <div class="form-group">
            <input type="password" v-model="password" :class="errors.password ? 'error' : ''" placeholder="رمز عبور" @keyup.enter="signIn" />
            <a href="javascript:void(0)" @click="showRecoverPassword" class="forget">رمز عبور را فراموش کرده اید ؟ کلیک کنید !</a>
            <span v-if="errors.password" class="error">{{ errors.password[0] }}</span>
          </div>
          <div class="submit">
            <button v-if="signingIn === false" type="button" @click="signIn">ورود</button>
            <button v-else type="button">چند لحظه صبر کنید</button>
          </div>
        </form>
      </div>
      <div v-if="rlStatus === 3">
        <div class="title">
          <i class="bx bxs-user-account"></i>
          <h2>عضویت</h2>
          <p>مشخصات خود را وارد کنید</p>
        </div>
        <form @submit.prevent="">
          <div class="form-group">
            <input type="text" v-model="name" :class="errors.name ? 'error' : ''" placeholder="نام" @keyup.enter="signUp" />
            <span v-if="errors.name" class="error">{{ errors.name[0] }}</span>
          </div>
          <div class="form-group">
            <input type="password" v-model="rpassword" :class="errors.rpassword ? 'error' : ''" placeholder="گذرواژه" @keyup.enter="signUp" />
            <span v-if="errors.rpassword" class="error">{{ errors.rpassword[0] }}</span>
          </div>
          <div class="form-group">
            <input type="password" v-model="rerpassword" placeholder="تایپ مجدد گذرواژه" @keyup.enter="signUp" />
          </div>
          <div class="form-group">
            <input type="text" v-model="affiliateCode" :class="errors.affiliateCode ? 'error' : ''" placeholder="کد معرف" @keyup.enter="signUp" />
            <span v-if="errors.affiliateCode" class="error">{{ errors.affiliateCode[0] }}</span>
          </div>
          <div class="submit">
            <button v-if="signingUp === false" type="button" @click="signUp">
              عضویت
            </button>
            <button v-else type="button">چند لحظه صبر کنید</button>
          </div>
        </form>
      </div>
      <div v-if="rlStatus === 4">
        <div class="title">
          <i class="bx bxs-user-account"></i>
          <h2>تأیید شماره موبایل</h2>
          <p>کد را وارد کنید</p>
        </div>
        <form @submit.prevent="">
          <div class="form-group">
            <input type="text" v-model="code" :class="errors.code ? 'error' : ''" placeholder="کد را وارد کنید" @keyup.enter="verify" />
            <span v-if="errors.code" class="error">{{ errors.code[0] }}</span>
          </div>
          <div class="submit">
            <button v-if="verifying === false" id="resendButton" type="button" @click="verify">
              بررسی کد
            </button>
            <button v-else type="button">چند لحظه صبر کنید</button>

            <button v-if="counter === 0" type="button" @click="resendCode" class="uk-margin-top">
              ارسال مجدد کد
            </button>
            <button v-else type="button" class="uk-margin-top" disabled>{{ counter }}</button>
          </div>
        </form>
      </div>
      <div v-if="rlStatus === 5">
        <div class="title">
          <i class="bx bxs-user-account"></i>
          <h2>بازیابی رمز عبور</h2>
          <p>کد دریافت شده روی موبایل خود را وارد کنید</p>
        </div>
        <form>
          <div class="form-group">
            <input type="text" v-model="code" :class="errors.code ? 'error' : ''" placeholder="کد را وارد کنید" @keyup.enter="recoverPassword" />
            <span v-if="errors.code" class="error">{{ errors.code[0] }}</span>
          </div>
          <div class="submit">
            <button v-if="recoveringPassword === false" id="resendButtonr" type="button" @click="recoverPassword">
              بررسی کد
            </button>
            <button v-else type="button">چند لحظه صبر کنید</button>

            <button v-if="counter === 0" type="button" @click="resendCode" class="uk-margin-top">
              ارسال مجدد کد
            </button>
            <button v-else type="button" class="uk-margin-top" disabled>{{ counter }}</button>
          </div>
        </form>
      </div>
    </vk-modal>

    <vk-modal id="provinceModalh" class="confirm-information-modal select-province-modal" :show.sync="provinceModalh">
      <div class="title">
        <div>
          <i class="bx bx-layer-plus"></i>
          <h3>انتخاب استان</h3>
        </div>
        <vk-modal-close @click="provinceModalh = false"></vk-modal-close>
      </div>
      <div class="form">
        <form @submit.prevent="">
          <div class="form-group">
            <input type="text" id="provinceName" placeholder="نام شهر یا استان" v-model="provinceName" @keyup="searchProvince" />
            <button type="button" @click="searchProvince">
              <i class="bx bx-search"></i>
            </button>
          </div>
          <p class="province-title">استان ها</p>
          <div class="lists" v-if="provinces != null">
            <a href="javascript:void(0)" v-for="province in provinces" @click="chooseProvince(province.id,province.name)">
              <i class="bx bx-notification"></i>
              {{ province.name }} ({{ province.cityCount }} شهر)
            </a>
          </div>
          <p class="province-title" v-if="cities != null && !!provinceName">شهر ها</p>
          <div class="lists second-list" v-if="cities != null && !!provinceName">
            <a href="javascript:void(0)" v-for="city in cities" @click="searchCity(city)">
              <i class="bx bx-notification"></i>
              {{ city.name }} ({{ city.residenceCount }} اقامتگاه)
            </a>
          </div>
        </form>
      </div>
    </vk-modal>
    <vk-modal id="cityModalh" class="confirm-information-modal select-province-modal" :show.sync="cityModalh">
      <div class="title">
        <div>
          <i class="bx bx-layer-plus"></i>
          <h3>انتخاب شهر</h3>
        </div>
        <vk-modal-close @click="closeCityModalh"></vk-modal-close>
      </div>
      <div class="form">
        <form action="">
          <div class="form-group">
            <input type="text" id="cityName" placeholder="نام شهر" v-model="cityName" />
            <button>
              <i class="bx bx-search"></i>
            </button>
          </div>
          <div class="checkbox">
            <label for="selectedProvinceCheck">
              <input class="uk-checkbox" type="checkbox" id="selectedProvinceCheck"
                     v-model="selectedProvinceCheck" :checked="selectedProvinceCheck" @click="selectProvince" />
              جستجو در کل استان
            </label>
          </div>

          <div class="city-lists" v-if="cities != null">
            <a href="javascript:void(0)" v-bind:class="[citiesSearchNames.includes(city.name) ? 'active' : '']"
               v-for="city in cities" @click="addCity(city.name)">
                  <span>
                    <i class="bx bx-notification"></i>
                    {{ city.name }}
                  </span>
              <span>
                      ({{ city.residenceCount }} اقامتگاه)
                  </span>
            </a>
          </div>
          <div class="city-lists" v-else>
            <a href="javascript:void(0)">
              <i class="bx bx-notification"></i>
              چند لحظه صبر کنید
            </a>
          </div>
          <div class="submit" v-if="citiesSearchNames.length > 0">
            <button type="button" @click="searchCities">انتخاب شهر ها</button>
          </div>
        </form>
      </div>
    </vk-modal>
  </header>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        provinceModalh: false,
        cityModalh: false,
        title: null,
        mobile: null,
        password: null,
        code: null,
        name: null,
        rpassword: null,
        rerpassword: null,
        affiliateCode: null,
        checkingMobile: false,
        signingIn: false,
        signingUp: false,
        verifying: false,
        recoveringPassword: false,
        rlStatus: 1,
        counter: 0,
        provinces: [],
        cities: [],
        citiesSearchNames: [],
        province: [],
        provinceName: [],
        selectedProvinceName: [],
        cityName: [],
        selectedProvinceCheck: false,
        errors: []
      }
    },
    methods: {
      changeStatus(number) {
        this.rlStatus = number;
      },
      async search() {
        this.$router.push({path: '/residences/search', query:{title: this.title}})
      },
      closeCityModalh() {
        this.cityModalh = false;
        this.provinceModalh = true;
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
      async showModalProvince() {
        this.provinces = null;
        this.cities = null;
        this.provinceModalh = true;
        this.city = null;
        this.cities = [];
        this.province = null;
        this.provinceName = null;
        this.selectedProvinceName = null;
        this.selectedProvinceCheck = false;
        this.cityName = null;
        let provinces = await this.$axios.post('api/v1/searchProvince',{name:this.provinceName});
        this.provinces = provinces.data.provinces;
      },
      async chooseProvince(id,name) {
        this.cities = null;
        this.provinceModalh = false;
        this.cityModalh = true;
        this.province = id;
        this.selectedProvinceName = name;
        let cities = await this.$axios.post('api/v1/searchCity',{id:this.province});
        if(cities.data.status === 1) {
          this.cities = cities.data.cities;
        }
      },
      async searchProvince() {
        this.cities = [];
        let provinces = await this.$axios.post('api/v1/searchProvince',{name:this.provinceName});
        if(provinces.data.status === 1) {
          this.provinces = provinces.data.provinces;
          this.cities = provinces.data.cities;
        } else if(provinces.data.status === 422) {
          this.errors = provinces.data.errors;
          this.$snotify.warning(provinces.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        } else {
          this.$snotify.error(provinces.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        }
      },
      selectProvince() {
        this.selectedProvinceCheck = !this.selectedProvinceCheck;
        if(this.selectedProvinceCheck === true) {
          this.cityModalh = false;
          this.search2();
        }
      },
      addCity (city) {
        if(!this.citiesSearchNames.includes(city))
          this.citiesSearchNames.push(city);
        else
          this.citiesSearchNames.splice(this.citiesSearchNames.indexOf(city), 1);
      },
      searchCities() {
        this.cityModalh = false;
        if(this.citiesSearchNames.length > 0) {
          let cities = '';
          for (let index = 0; index < this.citiesSearchNames.length; ++index) {
            const city = this.citiesSearchNames[index];
            if(index !== this.citiesSearchNames.length-1)
              cities += city+',';
            else
              cities += city;
          }
          this.$router.push({path: '/residences/city/search', query:{cities: cities}});
        }
      },
      search2() {
        this.$router.push({path: '/residences/search', query:{provinceName:this.selectedProvinceName,province:this.province}});
      },
      number_3_3(num, sep) {
        const number = typeof num === 'number' ? num.toString() : num
        const separator = typeof sep === 'undefined' ? ',' : sep
        return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator)
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
      },
      openLogreg() {
        if(this.vuexLogregState === true) {
          this.$store.dispatch('setVuexLogregState',false);
        } else {
          this.$store.dispatch('setVuexLogregState',true);
        }
      },
      logout() {
        this.$auth.logout();
        this.$router.push('/');
      }
    },
    computed: {
      vuexMenuState() {
        return this.$store.getters.vuexMenuState
      },
      vuexLogregState() {
        return this.$store.getters.vuexLogregState
      },
      ...mapGetters(['settings'])
    }
  }
</script>
