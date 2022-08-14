<template>
  <div>
    <main ref="main" class="main" :class="[vuexMenuState ? 'blur' : '',vuexLogregMobileState ? 'blur' : '']" @click="closeMenu">
      <div class="user-profile-title">
        <div class="mobile-icon">
          <a href="javascript:void(0)" @click="openPageMenu">
            <img src="/images/burger.svg" alt="openPageMenu">
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

      <section class="set-place">
        <div class="body">
          <h3 class="page-name">
            <i class="bx bx-building-house"></i>
            ویرایش اقامتگاه
          </h3>
          <div class="sidebar-form">
            <div class="sidebar">
              <ul v-show="menu === true">
                <li>
                  <nuxt-link to="/profile">
                    <span class="counter"><i class="bx bx-home"></i></span>
                    <span class="name">پروفایل</span>
                  </nuxt-link>
                </li>
                <li class="active">
                  <nuxt-link :to="`/profile/residence/edit/`+id">
                    <span class="counter">1</span>
                    <span class="name">اطلاعات اصلی</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/profile/residence/edit/detail/`+id">
                    <span class="counter">2</span>
                    <span class="name">اطلاعات جزئی</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/profile/residence/edit/calendar/`+id">
                    <span class="counter">3</span>
                    <span class="name">تقویم کاری</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/profile/residence/edit/images/`+id">
                    <span class="counter">4</span>
                    <span class="name">تصاویر</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/profile/residence/edit/roadOptions/`+id">
                    <span class="counter">5</span>
                    <span class="name">اطلاعات محیطی</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/profile/residence/edit/facilities/`+id">
                    <span class="counter">6</span>
                    <span class="name">امکانات اقامتگاه</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/profile/residence/edit/wcs/`+id">
                    <span class="counter">7</span>
                    <span class="name">سرویس بهداشتی و حمام</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/profile/residence/edit/rooms/`+id">
                    <span class="counter">8</span>
                    <span class="name">اتاق ها</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/profile/residence/edit/ownership/`+id">
                    <span class="counter">9</span>
                    <span class="name">اطلاعات مالکیت</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/profile/residence/edit/personal/`+id">
                    <span class="counter">10</span>
                    <span class="name">اطلاعات فردی</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/profile/residence/edit/parking/`+id">
                    <span class="counter">11</span>
                    <span class="name">پارکینگ</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/profile/residence/edit/map/`+id">
                    <span class="counter">12</span>
                    <span class="name">نقشه</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/profile/residence/edit/rules/`+id">
                    <span class="counter">13</span>
                    <span class="name">قوانین و مقررات</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/profile/residence/edit/crules/`+id">
                    <span class="counter">14</span>
                    <span class="name">قوانین کنسلی</span>
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <div class="form">
              <p class="form-name"><span>اطلاعات اصلی</span></p>
              <p class="form-description">
                اطلاعات اصلی و پایه اقامتگاه‌تان را وارد کنید.
              </p>
              <form action="" class="form-submit">
                <div class="row">
                  <div class="form-group w-50">
                    <input type="text" id="title" v-model="newForm.title" placeholder="" required>
                    <span class="floating-label">عنوان آگهی</span>
                    <span v-if="errors.title" class="error">{{ errors.title[0] }}</span>
                  </div>
                  <div class="form-group w-50">
                    <input type="text" id="maxMonth" v-model="newForm.maxMonth" placeholder="" required>
                    <span class="floating-label">اجازه رزرو تا چند ماه بعد ؟</span>
                    <span v-if="errors.maxMonth" class="error">{{ errors.maxMonth[0] }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group w-30">
                    <input type="text" id="meter" v-model="newForm.meter" placeholder="" required>
                    <span class="floating-label">مساحت</span>
                    <span v-if="errors.meter" class="error">{{ errors.meter[0] }}</span>
                  </div>
                  <div class="form-group w-30">
                    <input type="text" id="buildingMeter" v-model="newForm.buildingMeter" placeholder="" required>
                    <span class="floating-label">زیربنا</span>
                    <span v-if="errors.buildingMeter" class="error">{{ errors.buildingMeter[0] }}</span>
                  </div>
                  <div class="form-group w-30">
                    <input type="text" id="plaque" v-model="newForm.plaque" placeholder="" required>
                    <span class="floating-label">شماره پلاک</span>
                    <span v-if="errors.plaque" class="error">{{ errors.plaque[0] }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group w-50">
                    <no-ssr>
                      <v-select :options="provinces" id="province" v-model="selectedProvince" :value="newForm.province" @input="setCities" placeholder="استان"></v-select>
                    </no-ssr>
                  </div>
                  <div class="form-group w-50">
                    <no-ssr>
                      <v-select :options="cities" id="city" v-model="newForm.city" :value="newForm.city" placeholder="شهر"></v-select>
                    </no-ssr>
                    <span v-if="errors.city" class="error">{{ errors.city[0] }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group w-50">
                    <no-ssr>
                      <v-select :options="types" id="type" v-model="newForm.type" :value="newForm.type" placeholder="نوع اقامتگاه"></v-select>
                    </no-ssr>
                    <span v-if="errors.type" class="error">{{ errors.type[0] }}</span>
                  </div>
                  <div class="form-group w-50">
                    <no-ssr>
                      <v-select multiple :options="categories" id="categories" v-model="newForm.categories" placeholder="دسته بندی"></v-select>
                    </no-ssr>
                    <span v-if="errors.categories" class="error">{{ errors.categories[0] }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group w-30">
                    <input type="text" id="priceDefault" v-model="newForm.priceDefault" @keyup="priceDefaultFormatted" placeholder="" required>
                    <span class="floating-label">قیمت روزهای عادی (تومان)</span>
                    <span v-if="errors.priceDefault" class="error">{{ errors.priceDefault[0] }}</span>
                  </div>
                  <div class="form-group w-30">
                    <input type="text" id="priceVacation" v-model="newForm.priceVacation" @keyup="priceVacationFormatted" placeholder="" required>
                    <span class="floating-label">قیمت روزهای تعطیل و پیک (تومان)</span>
                    <span v-if="errors.priceVacation" class="error">{{ errors.priceVacation[0] }}</span>
                  </div>
                  <div class="form-group w-30">
                    <input type="text" id="offAmount" v-model="newForm.offAmount" @keyup="offAmountFormatted" placeholder="" required>
                    <span class="floating-label">مبلغ تخفیف بابت هر روز (تومان)</span>
                    <span v-if="errors.offAmount" class="error">{{ errors.offAmount[0] }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group w-50">
                    <input type="text" id="priceExtra" v-model="newForm.priceExtra" @keyup="priceExtraFormatted" placeholder="" required>
                    <span class="floating-label">هزینه اضافه هر نفر (تومان)</span>
                    <span v-if="errors.priceExtra" class="error">{{ errors.priceExtra[0] }}</span>
                  </div>
                  <div class="form-group w-50">
                    <input type="text" id="priceExtraVacation" v-model="newForm.priceExtraVacation" @keyup="priceExtraVacationFormatted" placeholder="" required>
                    <span class="floating-label">هزینه اضافه هر نفر در روزهای تعطیل (تومان)</span>
                    <span v-if="errors.priceExtraVacation" class="error">{{ errors.priceExtraVacation[0] }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group w-100">
                    <textarea id="address" rows="7" v-model="newForm.address" placeholder="" required></textarea>
                    <span class="floating-label">آدرس اقامتگاه</span>
                    <span v-if="errors.address" class="error">{{ errors.address[0] }}</span>
                  </div>
                </div>
                <div class="row submit-cancel">
                  <button class="submit" type="button" v-if="updating === false" @click="updateResidence">
                    بروزرسانی اطلاعات
                  </button>
                  <button class="submit" type="button" v-else>
                    چند لحظه صبر کنید
                  </button>
                  <nuxt-link class="cancel" to="/profile/residences">مدیریت اقامتگاه‌ها</nuxt-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style src="~/assets/styles/css/newResidence2.css" scoped />

<script>
  import { mapGetters } from 'vuex';

  export default {
    layout: 'profile',
    data() {
      return {
        id:0,
        provinces: [],
        cities: [],
        types: [],
        categories: [],
        selectedProvince: [],
        menu: true,
        newForm: {
          id: null,
          title: null,
          maxMonth: null,
          ownerName: null,
          priceDefault: null,
          priceFast: null,
          priceVacation: null,
          priceExtra: null,
          priceExtraVacation: null,
          offAmount: null,
          off: null,
          address: null,
          plaque: null,
          city: null,
          province: null,
          type: null,
          meter: null,
          buildingMeter: null,
          categories: []
        },
        errors: [],
        updating: false
      }
    },
    async asyncData({params,$auth,$axios,redirect}) {
      if(!$auth.loggedIn)
        redirect('/');

      const editResidence = await $axios.post('api/v1/user/residence/editResidence',{id:params.id});
      const data = await $axios.post('api/v1/user/residence/data');

      return {
        id: params.id,
        newForm: editResidence.data.residence,
        selectedProvince: editResidence.data.residence.province,
        provinces: data.data.provinces,
        types: data.data.types,
        categories: data.data.categories
      };
    },
    methods: {
      numberWithCommas(value) {
        value = value.replace(/\D/g,'');
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      priceDefaultFormatted() {
        if(!!this.newForm.priceDefault)
          this.newForm.priceDefault = this.numberWithCommas(this.newForm.priceDefault);
      },
      priceVacationFormatted() {
        if(!!this.newForm.priceVacation)
          this.newForm.priceVacation = this.numberWithCommas(this.newForm.priceVacation);
      },
      offAmountFormatted() {
        if(!!this.newForm.offAmount)
          this.newForm.offAmount = this.numberWithCommas(this.newForm.offAmount);
      },
      priceExtraFormatted() {
        if(!!this.newForm.priceExtra)
          this.newForm.priceExtra = this.numberWithCommas(this.newForm.priceExtra);
      },
      priceExtraVacationFormatted() {
        if(!!this.newForm.priceExtraVacation)
          this.newForm.priceExtraVacation = this.numberWithCommas(this.newForm.priceExtraVacation);
      },
      async setCities() {
        if(this.selectedProvince !== null)
          this.cities = this.selectedProvince.cities;
        else
          this.cities = [];
      },
      async updateResidence() {
        this.updating = true;
        this.errors = [];

        if(!!this.newForm.priceDefault)
          this.newForm.priceDefault = this.newForm.priceDefault.replace(/\D/g,'');

        if(!!this.newForm.priceVacation)
          this.newForm.priceVacation = this.newForm.priceVacation.replace(/\D/g,'');

        if(!!this.newForm.offAmount)
          this.newForm.offAmount = this.newForm.offAmount.replace(/\D/g,'');

        if(!!this.newForm.priceExtra)
          this.newForm.priceExtra = this.newForm.priceExtra.replace(/\D/g,'');

        if(!!this.newForm.priceExtraVacation)
          this.newForm.priceExtraVacation = this.newForm.priceExtraVacation.replace(/\D/g,'');

        const updateResidence = await this.$axios.post('api/v1/user/residence/updateResidence',this.newForm);
        if(updateResidence.data.status === 1) {
          this.$snotify.success(updateResidence.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          this.$router.push('/profile/residence/edit/detail/'+this.id);
        } else if(updateResidence.data.status === 422) {
          this.errors = updateResidence.data.errors;
          this.$snotify.warning(updateResidence.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
          this.newForm.priceDefault = this.priceDefaultFormatted(this.newForm.priceDefault);
          this.newForm.priceVacation = this.priceDefaultFormatted(this.newForm.priceVacation);
          this.newForm.priceExtra = this.priceDefaultFormatted(this.newForm.priceExtra);
          this.newForm.offAmount = this.priceDefaultFormatted(this.newForm.offAmount);
          this.newForm.priceExtraVacation = this.priceDefaultFormatted(this.newForm.priceExtraVacation);
        } else {
          this.$snotify.error(updateResidence.data.msg, {timeout: 2000, showProgressBar: false, closeOnClick: true, pauseOnHover: true});
        }
        this.updating = false;
      },
      closeMenu() {
        const main = this.$refs.main;
        if (main.classList.contains('blur')) {
          this.$store.dispatch('setVuexMenuState',false);
          this.$store.dispatch('setVuexLogregMobileState',false);
        }
      },
      openPageMenu() {
        this.menu = !this.menu;
      },
      number_3_3(num, sep) {
        const number = typeof num === 'number' ? num.toString() : num;
        const separator = typeof sep === 'undefined' ? ',' : sep;
        if(typeof number !== 'undefined')
          return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator);
      }
    },
    computed: {
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
        title: 'ویرایش اقامتگاه - '+this.settings.sitename,
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
