<template>
  <div>
    <main
      ref="main"
      class="main"
      :class="[
        vuexMenuState ? 'blur' : '',
        vuexLogregMobileState ? 'blur' : '',
      ]"
      @click="closeMenu"
    >
      <div class="user-profile-title">
        <div class="inner-title">
          <div>
            <div class="img"></div>
          </div>
        </div>
      </div>

      <section class="set-place mb-5">
        <div class="body flex flex-col overflow-x-auto">
          <div class="flex items-start justify-between text-center" v-show="menu === true">
            <!-- Steps -->
            <template v-for="(step, index) in steps">
              <div
                class="w-8 flex flex-col items-center space-y-2 cursor-pointer md:mx-0 group"
                :class="{
                  'mr-3': index === 0,
                  'ml-3': index+1 === steps.length
                }"
                @click="steps[index].isActive = !steps[index].isActive"
              >
                <div
                  class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition duration-100 transform group-hover:scale-125 group-hover:bg-blue-600"
                  :class="{
                    'bg-blue-600': step.isActive,
                  }"
                >
                  <i
                    class="bx bx-xs group-hover:text-white"
                    :class="[step.icon, step.isActive && 'text-white']"
                  />
                </div>

                <span
                  class="text-xs group-hover:text-blue-600 w-max"
                  :class="{
                    'text-blue-600': step.isActive,
                  }"
                >
                  {{ step.title }}
                </span>
              </div>

              <div
                class="flex-grow h-1 bg-gray-100 mt-4 relative"
                style="min-width: 90px"
                v-if="index + 1 !== steps.length"
              >
                <i class="bx bxs-lock bx-xs bg-white absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
              </div>
            </template>
          </div>
        </div>
      </section>

      <section class="set-place">
        <div class="body">
          <h3 class="page-name">
            <i class="bx bx-building-house"></i>
            اقامتگاه جدید
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
                  <a href="javascript:void(0)">
                    <span class="counter">1</span>
                    <span class="name">اطلاعات اصلی</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="counter">2</span>
                    <span class="name">اطلاعات جزئی</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="counter">3</span>
                    <span class="name">تقویم کاری</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="counter">4</span>
                    <span class="name">تصاویر</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="counter">5</span>
                    <span class="name">اطلاعات محیطی</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="counter">6</span>
                    <span class="name">امکانات اقامتگاه</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="counter">7</span>
                    <span class="name">سرویس‌بهداشتی و حمام</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="counter">8</span>
                    <span class="name">اتاق‌ها</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="counter">9</span>
                    <span class="name">اطلاعات مالکیت</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="counter">10</span>
                    <span class="name">اطلاعات فردی</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="counter">11</span>
                    <span class="name">پارکینگ</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="counter">12</span>
                    <span class="name">نقشه</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="counter">13</span>
                    <span class="name">قوانین و مقررات</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <span class="counter">14</span>
                    <span class="name">قوانین کنسلی</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="form">
              <p class="form-name"><span> اطلاعات اصلی اقامتگاه</span></p>
              <p class="form-description">
                در اینجا لازم است تا اطلاعات اصلی مربوط به اقامتگاه‌تان را وارد
                کنید و قیمت‌گذاری مربوط به روزهای مختلف را انجام دهید.
              </p>
              <div class="border"></div>
              <div class="icon-wrapper">
                <div>
                  <img src="/images/icon-doc.png" alt="" />
                </div>
              </div>
              <strong class="strong-form-title"
                >برای ادامه روند ثبت اقامتگاه اطلاعات زیر را با دقت تکمیل
                کنید:</strong
              >
              <form action="" class="form-submit">
                <div class="row">
                  <div class="form-group w-50">
                    <input
                      type="text"
                      id="title"
                      v-model="newForm.title"
                      placeholder=""
                      required
                    />
                    <span class="floating-label">عنوان اقامتگاه</span>
                    <span v-if="errors.title" class="error">{{
                      errors.title[0]
                    }}</span>
                  </div>
                  <div class="form-group w-50">
                    <input
                      type="text"
                      id="maxMonth"
                      v-model="newForm.maxMonth"
                      placeholder=""
                      required
                    />
                    <span class="floating-label"
                      >اجازه رزرو تا چند ماه بعد ؟</span
                    >
                    <span v-if="errors.maxMonth" class="error">{{
                      errors.maxMonth[0]
                    }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group w-30">
                    <input
                      type="text"
                      id="meter"
                      v-model="newForm.meter"
                      placeholder=""
                      required
                    />
                    <span class="floating-label">مساحت</span>
                    <span v-if="errors.meter" class="error">{{
                      errors.meter[0]
                    }}</span>
                  </div>
                  <div class="form-group w-30">
                    <input
                      type="text"
                      id="buildingMeter"
                      v-model="newForm.buildingMeter"
                      placeholder=""
                      required
                    />
                    <span class="floating-label">زیربنا</span>
                    <span v-if="errors.buildingMeter" class="error">{{
                      errors.buildingMeter[0]
                    }}</span>
                  </div>
                  <div class="form-group w-30">
                    <input
                      type="text"
                      id="plaque"
                      v-model="newForm.plaque"
                      placeholder=""
                      required
                    />
                    <span class="floating-label">شماره پلاک</span>
                    <span v-if="errors.plaque" class="error">{{
                      errors.plaque[0]
                    }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group w-50">
                    <no-ssr>
                      <v-select
                        :options="provinces"
                        id="province"
                        v-model="selectedProvince"
                        @input="setCities"
                        placeholder="استان"
                      ></v-select>
                    </no-ssr>
                  </div>
                  <div class="form-group w-50">
                    <no-ssr>
                      <v-select
                        :options="cities"
                        id="city"
                        v-model="newForm.city"
                        placeholder="شهر"
                      ></v-select>
                    </no-ssr>
                    <span v-if="errors.city" class="error">{{
                      errors.city[0]
                    }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group w-50">
                    <no-ssr>
                      <v-select
                        :options="types"
                        id="type"
                        v-model="newForm.type"
                        placeholder="نوع اقامتگاه"
                      ></v-select>
                    </no-ssr>
                    <span v-if="errors.type" class="error">{{
                      errors.type[0]
                    }}</span>
                  </div>
                  <div class="form-group w-50">
                    <no-ssr>
                      <v-select
                        multiple
                        :options="categories"
                        id="categories"
                        v-model="newForm.categories"
                        placeholder="دسته بندی"
                      ></v-select>
                    </no-ssr>
                    <span v-if="errors.categories" class="error">{{
                      errors.categories[0]
                    }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group w-30">
                    <input
                      type="text"
                      id="priceDefault"
                      v-model="newForm.priceDefault"
                      @keyup="priceDefaultFormatted(newForm.priceDefault)"
                      placeholder=""
                      required
                    />
                    <span class="floating-label">قیمت روزهای عادی (تومان)</span>
                    <span v-if="errors.priceDefault" class="error">{{
                      errors.priceDefault[0]
                    }}</span>
                  </div>
                  <div class="form-group w-30">
                    <input
                      type="text"
                      id="priceVacation"
                      v-model="newForm.priceVacation"
                      @keyup="priceVacationFormatted(newForm.priceVacation)"
                      placeholder=""
                      required
                    />
                    <span class="floating-label"
                      >قیمت روزهای تعطیل و پیک (تومان)</span
                    >
                    <span v-if="errors.priceVacation" class="error">{{
                      errors.priceVacation[0]
                    }}</span>
                  </div>
                  <div class="form-group w-30">
                    <input
                      type="text"
                      id="offAmount"
                      v-model="newForm.offAmount"
                      @keyup="offAmountFormatted(newForm.offAmount)"
                      placeholder=""
                      required
                    />
                    <span class="floating-label"
                      >مبلغ تخفیف بابت هر روز (تومان)</span
                    >
                    <span v-if="errors.offAmount" class="error">{{
                      errors.offAmount[0]
                    }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group w-50">
                    <input
                      type="text"
                      id="priceExtra"
                      v-model="newForm.priceExtra"
                      @keyup="priceExtraFormatted(newForm.priceExtra)"
                      placeholder=""
                      required
                    />
                    <span class="floating-label"
                      >هزینه اضافه بابت هر نفر (تومان)</span
                    >
                    <span v-if="errors.priceExtra" class="error">{{
                      errors.priceExtra[0]
                    }}</span>
                  </div>
                  <div class="form-group w-50">
                    <input
                      type="text"
                      id="priceExtraVacation"
                      v-model="newForm.priceExtraVacation"
                      @keyup="
                        priceExtraVacationFormatted(newForm.priceExtraVacation)
                      "
                      placeholder=""
                      required
                    />
                    <span class="floating-label"
                      >هزینه اضافه بابت هر نفر در روز های تعطیل و پیک
                      (تومان)</span
                    >
                    <span v-if="errors.priceExtraVacation" class="error">{{
                      errors.priceExtraVacation[0]
                    }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group w-100">
                    <textarea
                      id="address"
                      rows="7"
                      v-model="newForm.address"
                      placeholder=""
                      required
                    ></textarea>
                    <span class="floating-label">آدرس کامل اقامتگاه</span>
                    <span v-if="errors.address" class="error">{{
                      errors.address[0]
                    }}</span>
                  </div>
                </div>
                <div class="row submit-cancel">
                  <button
                    class="submit"
                    type="button"
                    v-if="creating === false"
                    @click="saveResidence"
                  >
                    <i class="bx bx-chevron-right"></i> ثبت و ادامه
                  </button>
                  <button class="submit" type="button" v-else>
                    <i class="bx bx-chevron-right"></i>
                    چند لحظه صبر کنید
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style src="~/assets/styles/css/newResidence.css" scoped />

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'profile',
  data() {
    return {
      provinces: [],
      cities: [],
      types: [],
      categories: [],
      selectedProvince: [],
      menu: true,
      newForm: {
        title: null,
        maxMonth: null,
        ownerName: null,
        priceDefault: null,
        priceVacation: null,
        priceExtra: null,
        priceExtraVacation: null,
        offAmount: null,
        address: null,
        plaque: null,
        city: null,
        type: null,
        meter: null,
        buildingMeter: null,
        categories: [],
      },
      errors: [],
      creating: false,
      steps: [
        {
          title: 'اطلاعات اصلی',
          icon: 'bx-info-circle',
          isActive: false,
        },
        {
          title: 'اطلاعات جزیی',
          icon: 'bx-detail',
          isActive: false,
        },
        {
          title: 'تقویم کاری',
          icon: 'bx-calendar',
          isActive: false,
        },
        {
          title: 'تصاویر',
          icon: 'bx-images',
          isActive: false,
        },
        {
          title: 'اطلاعات محیطی',
          icon: 'bx-current-location',
          isActive: false,
        },
        {
          title: 'امکانات اقامتگاه',
          icon: 'bx-football',
          isActive: false,
        },
        {
          title: 'سرویس بهداشتی و حمام',
          icon: 'bx-bath',
          isActive: false,
        },
        {
          title: 'اتاق ها',
          icon: 'bx-building-house',
          isActive: false,
        },
        {
          title: 'اطلاعات مالکیت',
          icon: 'bx-user-pin',
          isActive: false,
        },
        {
          title: 'اطلاعات فردی',
          icon: 'bx-user',
          isActive: false,
        },
        {
          title: 'پارکینگ',
          icon: 'bxs-parking',
          isActive: false,
        },
        {
          title: 'نقشه',
          icon: 'bx-map',
          isActive: false,
        },
        {
          title: 'قوانین و مقررات',
          icon: 'bx-traffic-cone',
          isActive: false,
        },
        {
          title: 'قوانین کنسلی',
          icon: 'bx-window-close',
          isActive: false,
        },
      ],
    }
  },
  async asyncData({ $auth, $axios, redirect }) {
    // if(!$auth.loggedIn)
    //   redirect('/');

    const { data } = await $axios.post('api/v1/user/residence/data')

    return {
      provinces: data.provinces,
      types: data.types,
      categories: data.categories,
    }
  },
  methods: {
    numberWithCommas(value) {
      value = value.replace(/\D/g, '')
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    priceDefaultFormatted() {
      if (!!this.newForm.priceDefault)
        this.newForm.priceDefault = this.numberWithCommas(
          this.newForm.priceDefault
        )
    },
    priceVacationFormatted() {
      if (!!this.newForm.priceVacation)
        this.newForm.priceVacation = this.numberWithCommas(
          this.newForm.priceVacation
        )
    },
    offAmountFormatted() {
      if (!!this.newForm.offAmount)
        this.newForm.offAmount = this.numberWithCommas(this.newForm.offAmount)
    },
    priceExtraFormatted() {
      if (!!this.newForm.priceExtra)
        this.newForm.priceExtra = this.numberWithCommas(this.newForm.priceExtra)
    },
    priceExtraVacationFormatted() {
      if (!!this.newForm.priceExtraVacation)
        this.newForm.priceExtraVacation = this.numberWithCommas(
          this.newForm.priceExtraVacation
        )
    },
    async setCities() {
      if (this.selectedProvince !== null)
        this.cities = this.selectedProvince.cities
      else this.cities = []
    },
    async saveResidence() {
      this.creating = true
      this.errors = []

      if (!!this.newForm.priceDefault)
        this.newForm.priceDefault = this.newForm.priceDefault.replace(/\D/g, '')

      if (!!this.newForm.priceVacation)
        this.newForm.priceVacation = this.newForm.priceVacation.replace(
          /\D/g,
          ''
        )

      if (!!this.newForm.offAmount)
        this.newForm.offAmount = this.newForm.offAmount.replace(/\D/g, '')

      if (!!this.newForm.priceExtra)
        this.newForm.priceExtra = this.newForm.priceExtra.replace(/\D/g, '')

      if (!!this.newForm.priceExtraVacation)
        this.newForm.priceExtraVacation =
          this.newForm.priceExtraVacation.replace(/\D/g, '')

      const newResidence = await this.$axios.post(
        'api/v1/user/residence/saveResidence',
        this.newForm
      )
      if (newResidence.data.status === 1) {
        this.$snotify.success(newResidence.data.msg, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })
        this.newForm = {
          title: null,
          ownerName: null,
          priceDefault: null,
          priceVacation: null,
          priceExtra: null,
          offAmount: null,
          address: null,
          plaque: null,
          city: null,
          type: null,
          meter: null,
          buildingMeter: null,
          categories: [],
        }
        this.$router.push(
          '/profile/residence/edit/detail/' + newResidence.data.id
        )
      } else if (newResidence.data.status === 422) {
        this.errors = newResidence.data.errors
        this.$snotify.warning(newResidence.data.msg, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })
        this.priceDefaultFormatted()
        this.priceVacationFormatted()
        this.offAmountFormatted()
        this.priceExtraFormatted()
        this.priceExtraVacationFormatted()
      } else {
        this.$snotify.error(newResidence.data.msg, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })
      }
      this.creating = false
    },
    closeMenu() {
      const main = this.$refs.main
      if (main.classList.contains('blur')) {
        this.$store.dispatch('setVuexMenuState', false)
        this.$store.dispatch('setVuexLogregMobileState', false)
      }
    },
    openPageMenu() {
      this.menu = !this.menu
    },
    number_3_3(num, sep) {
      const number = typeof num === 'number' ? num.toString() : num
      const separator = typeof sep === 'undefined' ? ',' : sep
      if (typeof number !== 'undefined')
        return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator)
    },
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
  created() {
    this.$store.dispatch('setVuexMenuState', false)
    this.$store.dispatch('setVuexProfileMenuState', false)
  },
  head() {
    return {
      title: 'ثبت اقامتگاه - ' + this.settings.sitename,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.settings.sitedesc,
        },
      ],
    }
  },
}
</script>
