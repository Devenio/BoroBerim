<template>
  <div>
    <main ref="main" class="main" :class="[vuexMenuState ? 'blur' : '',vuexLogregMobileState ? 'blur' : '']" @click="closeMenu">
      <div class="user-profile-title">
        <div class="mobile-icon">
          <a href="javascript:void(0)" @click="openProfileMenu">
            <img src="/images/burger.svg" alt="">
          </a>
        </div>
        <div class="inner-title">
          <div>
            <div class="img">
              <img :src="$auth.user.image" :alt="$auth.user.name">
            </div>
            <div class="name-mobile">
              <p class="name">{{ $auth.user.name }}</p>
              <span class="mobile">{{ $auth.user.mobile }}</span>
              <p class="deposit">
                <span>موجودی : </span>
                <span>{{ number_3_3($auth.user.wallet) }} تومان</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section class="profile">
        <aside class="sidebar" :class="[vuexProfileMenuState ? 'active' : '']">
          <div class="top">
            <ul>
              <li>
                <nuxt-link to="/profile">
                  <i class="bx bx-chart"></i>
                  داشبورد
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile/reserves">
                  <i class="bx bx-git-pull-request"></i>
                  لیست رزروها
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile/residences" class="active">
                  <i class="bx bx-building-house"></i>
                  مدیریت اقامتگاه‌ها
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile/comments">
                  <i class="bx bx-chat"></i>
                  نظرات کاربران
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile/complains">
                  <i class="bx bx-chat"></i>
                  شکایات کاربران
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="bottom">
            <ul>
              <li>
                <nuxt-link to="/checkOut">
                  <i class="bx bx-shopping-bag"></i>
                  سفرهای من
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile?panel=1">
                  <i class="bx bx-user-check"></i>
                  ویرایش مشخصات
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile/residence/new">
                  <i class="bx bx-star"></i>
                  ثبت اقامتگاه
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile?panel=2">
                  <i class="bx bx-heart"></i>
                  علاقه مندی‌ها
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile?panel=10">
                  <i class="bx bx-heart"></i>
                  بازاریابی
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile?panel=4">
                  <i class="bx bx-wallet"></i>
                  کیف پول و تراکنش‌ها
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile?panel=5">
                  <i class="bx bx-credit-card"></i>
                  تسویه حساب
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile?panel=6">
                  <i class="bx bx-error"></i>
                  شکایت‌ها
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile?panel=7">
                  <i class="bx bx-headphone"></i>
                  پشتیبانی
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/profile?panel=9">
                  <i class="bx bx-credit-card"></i>
                  کارت‌های بانکی
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="logout">
            <a href="javascript:void(0)" @click="logout">
              <i class="bx bx-log-out-circle"></i>
              خروج از حساب کاربری
            </a>
          </div>
        </aside>

        <div class="body reserve-management-list">
          <h1 class="profile-title">
            <i class="bx bx-building-house"></i>
            مدیریت اقامتگاه‌ها (ثبت آگهی)
          </h1>
          <div class="show-lists">
            <div class="link-submit">
              <div class="profile-links">
                <a href="javascript:void(0)" v-bind:class="(status === 1)?'active':''" @click="changeStatus(1)">
                  <span class="name">اقامتگاه‌های فعال</span>
                  <span class="counter">{{ activeResidences }}</span>
                </a>
                <a href="javascript:void(0)" v-bind:class="(status === 2)?'active':''" @click="changeStatus(2)">
                  <span class="name">اقامتگاه‌های غیرفعال</span>
                  <span class="counter">{{ deactiveResidences }}</span>
                </a>
              </div>
              <div class="submit-new-reserve">
                <nuxt-link to="/profile/residence/new">
                  <i class="bx bx-list-plus"></i>
                  اقامتگاه جدید
                </nuxt-link>
              </div>
            </div>
            <div class="reserve-items">
              <div class="items" v-for="residence in residences">
                <div class="top">
                  <div class="right">
                    <div class="img-name">
                      <div class="img">
                        <img :src="residence.image" :alt="residence.title">
                      </div>
                      <div class="name">
                        <p>{{ residence.title }}</p>
                        <span class="code">کد اقامتگاه: {{ residence.id }}</span>
                        <span class="date">{{ residence.date }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="left" v-if="status === 1">
                    <nuxt-link :to="`/profile/residence/edit/`+residence.id" class="edit">
                      <span>
                          <i class="bx bx-edit"></i>
                      </span>
                      ویرایش اقامتگاه
                    </nuxt-link>
                    <a href="javascript:void(0)" class="delete" @click="deactivate(residence.id)" v-if="deactivating === false">
                      <i class="bx bxs-circle"></i>
                      غیر فعال کنید
                    </a>
                    <a href="javascript:void(0)" class="delete" v-else>
                      <i class="bx bxs-circle"></i>
                      چند لحظه صبر کنید
                    </a>
                  </div>
                  <div class="left" v-else>
                    <nuxt-link :to="`/profile/residence/edit/`+residence.id" class="edit">
                      <span>
                          <i class="bx bx-edit"></i>
                      </span>
                      ویرایش اقامتگاه
                    </nuxt-link>
                    <a href="javascript:void(0)" class="delete" @click="activate(residence.id)" v-if="deactivating === false">
                      <i class="bx bxs-circle"></i>
                      فعال کنید
                    </a>
                    <a href="javascript:void(0)" class="delete" v-else>
                      <i class="bx bxs-circle"></i>
                      چند لحظه صبر کنید
                    </a>
                  </div>
                </div>
                <div class="bottom">
                  <div class="right">
                    <div class="star">
                      <no-ssr><star-rating :rating="residence.score" :star-size="20" :increment="0.5" :rtl="true" :round-start-rating="false" :read-only="true" /></no-ssr>
                    </div>
                  </div>
                  <div class="left">
                    <nuxt-link :to="`/profile/residence/edit/calendar/`+residence.id" class="calender">
                      <i class="bx bx-calendar"></i>
                      تقویم
                    </nuxt-link>
                  </div>
                </div>
                <hr>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
  * {
    box-sizing: inherit !important;
  }
</style>

<script>
  import { mapGetters } from 'vuex';

  export default {
    layout: 'profile',
    data() {
      return {
        status: 1,
        activeResidences: 0,
        deactiveResidences: 0,
        residences: [],
        skip: 0,
        deactivating: false,
        activating: false
      }
    },
    async asyncData({$auth,$axios,redirect}) {
      if(!$auth.loggedIn)
        redirect('/');

      const {data} = await $axios.post('api/v1/user/residences',{skip:0});

      return {
        activeResidences: data.activeResidences,
        deactiveResidences: data.deactiveResidences,
        residences: data.residences
      };
    },
    methods: {
      async changeStatus(number) {
        this.status = number;
        const residences = await this.$axios.post('api/v1/user/residences',{skip:this.skip,status:this.status});
        this.residences = residences.data.residences;
      },
      async deactivate(id) {
        this.deactivating = true;
        let deactivateResidence = await this.$axios.post('api/v1/user/deactivateResidence',{id:id});
        if(deactivateResidence.data.status === 1) {
          this.$snotify.success(deactivateResidence.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          const residences = await this.$axios.post('api/v1/user/residences',{skip:this.skip});
          this.activeResidences = residences.data.activeResidences;
          this.deactiveResidences = residences.data.deactiveResidences;
          this.residences = residences.data.residences;
        } else if(deactivateResidence.data.status === 422) {
          this.errors = deactivateResidence.data.errors;
          this.$snotify.warning(deactivateResidence.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        } else {
          this.$snotify.error(deactivateResidence.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        }
        this.deactivating = false;
      },
      async activate(id) {
        this.activating = true;
        let activateResidence = await this.$axios.post('api/v1/user/activateResidence',{id:id});
        if(activateResidence.data.status === 1) {
          this.$snotify.success(activateResidence.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          const residences = await this.$axios.post('api/v1/user/residences',{skip:this.skip});
          this.activeResidences = residences.data.activeResidences;
          this.deactiveResidences = residences.data.deactiveResidences;
          this.residences = residences.data.residences;
        } else if(activateResidence.data.status === 422) {
          this.errors = activateResidence.data.errors;
          this.$snotify.warning(activateResidence.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        } else {
          this.$snotify.error(activateResidence.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        }
        this.activating = false;
      },
      number_3_3(num, sep) {
        const number = typeof num === 'number' ? num.toString() : num;
        const separator = typeof sep === 'undefined' ? ',' : sep;
        if(typeof number !== 'undefined')
          return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator);
      },
      openProfileMenu() {
        if(this.vuexProfileMenuState === true) {
          this.$store.dispatch('setVuexProfileMenuState',false);
        } else {
          this.$store.dispatch('setVuexProfileMenuState',true);
        }
      },
      closeProfileMenu() {
        const dashboard = this.$refs.dashboard;
        if (dashboard.classList.contains('blur'))
          this.$store.dispatch('setVuexProfileMenuState',false);
      },
      closeMenu() {
        const main = this.$refs.main;
        if (main.classList.contains('blur')) {
          this.$store.dispatch('setVuexMenuState',false);
          this.$store.dispatch('setVuexLogregMobileState',false);
        }
      },
      logout() {
        this.$auth.logout();
        this.$router.push('/');
      }
    },
    computed: {
      vuexProfileMenuState() {
        return this.$store.getters.vuexProfileMenuState
      },
      vuexMenuState() {
        return this.$store.getters.vuexMenuState
      },
      vuexLogregMobileState() {
        return this.$store.getters.vuexLogregMobileState
      },
      ...mapGetters(['settings'])
    },
    created() {
      this.$store.dispatch('setVuexMenuState',false);
      this.$store.dispatch('setVuexProfileMenuState',false);
    },
    head() {
      return {
        title: 'لیست اقامتگاه‌ها - '+this.settings.sitename,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.settings.sitedesc
          },
        ],
      }
    }
  }
</script>
