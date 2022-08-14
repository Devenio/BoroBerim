<template>
  <div>
    <main ref="main" class="main" :class="[vuexMenuState ? 'blur' : '',vuexLogregMobileState ? 'blur' : '']" @click="closeMenu">
      <section class="search-box">
        <div class="title">
          <h1>اجاره ویلا در شمال و سراسر ایران بزرگ</h1>
          <p>رزرو ویلا، سوییت، آپارتمان، بومگردی  و ...</p>
        </div>
        <div class="new-view">
<!--          <nuxt-link to="/residences/populars" class="view">پربازدید ترین ها</nuxt-link>-->
        </div>
        <div class="calender">
          <form action="#">
            <div class="enter">
              <i class="bx bxs-city"></i>
              <div class="form-group">
                <label>مقصد</label>
                <input type="text" placeholder="شهر یا استان" @click="showModalProvince" v-if="citiesSearchNames.length === 0 && selectedProvinceCheck === false" />
                <input type="text" :value="`شهرهای استان `+selectedProvinceName" @click="showModalProvince" v-else-if="citiesSearchNames.length === 0 && selectedProvinceCheck === true" />
                <input type="text" :placeholder="citiesSearchNames[0]" @click="showModalProvince" v-else-if="citiesSearchNames.length !== 0 && selectedProvinceCheck === false" />
              </div>
            </div>
            <div class="enter">
              <i class="bx bx-calendar"></i>
              <div class="form-group">
                <label>تاریخ ورود و خروج</label>
                <input type="text" placeholder="انتخاب از تقویم" @click="showModalCalendar"
                       v-if="date.dates.length === 0" />
                <input type="text" :placeholder="`از `+date.dates[0].month+`/`+date.dates[0].date+` تا `+date.dates[1].month+`/`+date.dates[1].date"
                       v-else-if="date.dates[0] && date.dates[1]" @click="showModalCalendar" />
                <input type="text" placeholder="انتخاب از تقویم" @click="showModalCalendar"
                       v-else />
              </div>
            </div>
            <div class="count">
              <a href="javascript:void(0)" class="plus" @click="plusPerson"><i class="bx bx-plus"></i></a>
              <div>
                <span class="number" v-if="startPerson !== null">{{ startPerson }}</span>
                <span>تعداد نفرات</span>
              </div>
              <a href="javascript:void(0)" class="minus" @click="minusPerson"><i class="bx bx-minus"></i></a>
            </div>
            <div class="submit">
              <button type="button" @click="search">
                <i class="bx bx-search"></i>
              </button>
            </div>
          </form>
        </div>
      </section>
      <section class="calender-responsive">
        <form action="#">
          <div class="slogan">
            <div>اجاره ویلا در شمال و سراسر ایران بزرگ</div>
            <br>
            <p>رزرو ویلا، سوییت، آپارتمان، بومگردی  و ...</p>
          </div>
          <div class="enter uk-margin-top">
            <i class="bx bx-calendar"></i>
            <div class="form-group">
              <label>مقصد</label>
              <input type="text" placeholder="شهر یا استان" @click="showModalProvince" v-if="citiesSearchNames.length === 0 && selectedProvinceCheck === false" />
              <input type="text" :value="`شهرهای استان `+selectedProvinceName" @click="showModalProvince" v-else-if="citiesSearchNames.length === 0 && selectedProvinceCheck === true" />
              <input type="text" :placeholder="citiesSearchNames[0]" @click="showModalProvince" v-else-if="citiesSearchNames.length !== 0 && selectedProvinceCheck === false" />
            </div>
          </div>
          <div class="enter mt-2">
            <i class="bx bx-calendar"></i>
            <div class="form-group">
              <label>تاریخ ورود و خروج</label>
              <input type="text" placeholder="انتخاب از تقویم" @click="showModalCalendar"
                     v-if="date.dates.length === 0" />
              <input type="text" :placeholder="`از `+date.dates[0].month+`/`+date.dates[0].date+` تا `+date.dates[1].month+`/`+date.dates[1].date"
                     v-else-if="date.dates[0] && date.dates[1]" @click="showModalCalendar" />
              <input type="text" placeholder="انتخاب از تقویم" @click="showModalCalendar"
                     v-else />
            </div>
          </div>
          <div class="count">
            <a href="javascript:void(0)" class="plus" @click="plusPerson"><i class="bx bx-plus"></i></a>
            <div>
              <span class="number" v-if="startPerson !== null">{{ startPerson }}</span>
              <span>تعداد نفرات</span>
            </div>
            <a href="javascript:void(0)" class="minus" @click="minusPerson"><i class="bx bx-minus"></i></a>
          </div>
          <div class="submit">
            <button type="button" @click="search">
              <i class="bx bx-search"></i>
            </button>
          </div>
        </form>
      </section>
      <section class="category-slider">
        <div class="uk-position-relative">
          <slider dir="ltr" :slides="settings.categories" title="دسته‌بندی‌ها" viewAllLink="/search" />
        </div>
      </section>
      <section class="economic-slider">
        <slider2 dir="ltr" :slides="fastResidences" title="اقامتگاه‌های تحویل فوری" viewAllLink="/residences/fasts" />
      </section>

      <section class="features services">
        <div class="serviceBox">
          <img src="/images/24hour.png" width="60" height="60" alt="رزرواسیون ۲۴ ساعته">
          <div>
            <div class="h4">
              رزرواسیون ۲۴ ساعته
            </div>
            <p>
              خدمات آنلاین در تمامی روز های هفته
            </p>
          </div>
        </div>
        <div class="serviceBox">
          <img src="/images/guarantee.png" width="60" height="60" alt="ضمانت تحویل اقامتگاه">
          <div>
            <div class="h4">
              ضمانت تحویل اقامتگاه
            </div>
            <p>
              تسویه با میزبان پس از تحویل اقامتگاه
            </p>
          </div>
        </div>
        <div class="serviceBox">
          <img src="/images/price.png" width="60" height="60" alt="کم هزینه و با کیفیت">
          <div>
            <div class="h4">
              کم هزینه و با کیفیت
            </div>
            <p>
              اقامت با کیفیت‌ تر با هزینه کمتر
            </p>
          </div>
        </div>
      </section>

      <section class="cabin-slider">
        <slider2 dir="ltr" :slides="favoriteResidences" title="اقامتگاه‌های محبوب" viewAllLink="/residences/populars" />
      </section>

      <section class="features">
        <div v-show="settings.rightBannerLink !== null">
          <a :href="settings.rightBannerLink">
            <img :src="settings.rightBannerImage" :alt="settings.sitename" />
          </a>
        </div>
        <div v-show="settings.leftBannerLink !== null">
          <a :href="settings.leftBannerLink">
            <img :src="settings.leftBannerImage" :alt="settings.sitename" />
          </a>
        </div>
      </section>

      <section class="economic-slider">
        <slider2 dir="ltr" :slides="affordableResidences" title="اقامتگاه‌های اقتصادی" viewAllLink="/residences/affordables" />
      </section>
      <section class="cabin-slider">
        <slider2 dir="ltr" :slides="markResidences" title="اقامتگاه‌های خاص" viewAllLink="/residences/specials" />
      </section>
      <section class="how-be-host">
        <div class="right">
          <div class="title">
            <i class="bx bx-flag"></i>
            <h3>چگونه میزبان شویم ؟</h3>
          </div>
          <div class="text">
            <p v-html="info.howtoHost"></p>
          </div>
        </div>
        <div class="left">
          <div class="title">
            <i class="bx bxs-plane"></i>
            <h3>چگونه مهمان شویم ؟</h3>
          </div>
          <div class="text">
            <p v-html="info.howtoGuest"></p>
          </div>
        </div>
      </section>
    </main>
    <vk-modal center id="provinceModal" class="confirm-information-modal select-province-modal" :show.sync="provinceModal">
      <div class="title">
        <div>
          <i class="bx bx-layer-plus"></i>
          <h3>انتخاب استان</h3>
        </div>
        <vk-modal-close @click="provinceModal = false"></vk-modal-close>
      </div>
      <div class="form">
        <form @submit.prevent="">
          <div class="form-group">
            <input type="text" id="provinceName" placeholder="نام شهر یا استان" :value="provinceName" @input='e => provinceName = e.target.value' @keyup="searchProvince" />
            <button type="button" @click="searchProvince">
              <i class="bx bx-search"></i>
            </button>
          </div>
          <p class="province-title" v-if="cities != null && !!provinceName">شهر‌ها</p>
          <div class="lists second-list" v-if="cities != null && !!provinceName">
            <a href="javascript:void(0)" v-for="city in cities" @click="searchCity(city)">
              <i class="bx bx-notification"></i>
              {{ city.name }} ({{ city.residenceCount }} اقامتگاه)
            </a>
          </div>
          <p class="province-title">استان‌ها</p>
          <div class="lists" v-if="provinces != null">
            <a href="javascript:void(0)" v-for="province in provinces" @click="chooseProvince(province.id,province.name)">
              <i class="bx bx-notification"></i>
              {{ province.name }} ({{ province.cityCount }} شهر)
            </a>
          </div>
        </form>
      </div>
    </vk-modal>
    <vk-modal center id="cityModal" class="confirm-information-modal select-province-modal" :show.sync="cityModal">
      <div class="title">
        <div>
          <i class="bx bx-layer-plus"></i>
          <h3>انتخاب شهر</h3>
        </div>
        <vk-modal-close @click="closeCityModal"></vk-modal-close>
      </div>
      <div class="form">
        <form action="">
          <div class="form-group">
            <input type="text" id="cityName" placeholder="نام شهر" :value="cityName" @input='e => cityName = e.target.value' @keyup="searchCity2" />
            <button type="button" @click="searchCity2">
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
            <button type="button" @click="searchCities">انتخاب شهر‌ها</button>
          </div>
        </form>
      </div>
    </vk-modal>
    <vk-modal center id="calendarModal" class="confirm-information-modal select-province-modal" :show.sync="calendarModal">
      <div class="title">
        <div>
          <i class="bx bx-layer-plus"></i>
          <h3>تقویم</h3>
        </div>
        <vk-modal-close @click="calendarModal = false"></vk-modal-close>
      </div>
      <div class="form">
        <form action="" style="box-sizing: border-box !important;">
          <datepicker
            :forward-limit="settings.nextMonth"
            :backward-limit="settings.previousMonth"
            :disabled-map="{}"
            :holiday-map="{}"
            lang="Jalali"
            type="range"
            size="sm"
            :debug-selector="false"
            :enable-all-days="true"
            :days="settings.dates"
            @datemodel="handledate"
          />
        </form>
      </div>
    </vk-modal>
    <Footer />
  </div>
</template>

<style scoped>
  * {
    box-sizing: inherit !important;
  }
</style>

<script>
  import slider from '~/components/slider.vue'
  import slider2 from '~/components/slider2.vue'
  import ResidenceIndex from "~/components/ResidenceIndex";
  import datepicker from '@/components/datepicker3';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      slider,
      slider2,
      datepicker,
      ResidenceIndex
    },
    data() {
      return {
        provinceModal: false,
        cityModal: false,
        calendarModal: false,
        markResidences: [],
        affordableResidences: [],
        fastResidences: [],
        favoriteResidences: [],
        info: [],
        provinces: [],
        date: {
          dates: []
        },
        timer: null,
        city: null,
        startPerson: null,
        cities: [],
        citiesSearchNames: [],
        province: null,
        provinceName: null,
        selectedProvinceName: null,
        selectedProvinceCheck: false,
        cityName: null
      }
    },
    async asyncData({ $axios }) {
      const { data } = await $axios.get(`api/v1/home`);
      return {
        markResidences: data.data.markResidences,
        affordableResidences: data.data.affordableResidences,
        fastResidences: data.data.fastResidences,
        favoriteResidences: data.data.favoriteResidences,
        info: data.data.info,
        provinces: data.data.provinces
      };
    },
    methods: {
      minusPerson() {
        if(this.startPerson > 0)
          this.startPerson -= 1;
        if(this.startPerson === 0)
          this.startPerson = null;
      },
      plusPerson() {
        this.startPerson += 1;
      },
      closeCityModal() {
        this.cityModal = false;
        this.provinceModal = true;
      },
      search() {
        let startDate = null;
        let endDate = null;
        if(this.date.dates.length > 0) {
          startDate = this.date.dates[0]['year']+"-"+this.date.dates[0]['month']+"-"+this.date.dates[0]['date'];
          endDate = this.date.dates[1]['year']+"-"+this.date.dates[1]['month']+"-"+this.date.dates[1]['date'];
        }
        let cities = '';
        if(this.citiesSearchNames.length > 0) {
          for (let index = 0; index < this.citiesSearchNames.length; ++index) {
            const city = this.citiesSearchNames[index];
            if(index !== this.citiesSearchNames.length-1)
              cities += city+',';
            else
              cities += city;
          }
        }
        this.$router.push({path: '/residences/search', query:{city: this.city,startDate:startDate,endDate:endDate,
            startPerson:this.startPerson,provinceName:this.selectedProvinceName,province:this.province,cities: cities}});
      },
      showModalCalendar() {
        this.calendarModal = true;
      },
      async showModalProvince() {
        this.provinces = null;
        this.cities = null;
        this.provinceModal = true;
        this.city = null;
        this.citiesSearchNames = [];
        this.cities = [];
        this.province = null;
        this.provinceName = null;
        this.selectedProvinceName = null;
        this.selectedProvinceCheck = false;
        this.cityName = null;
        let provinces = await this.$axios.post('api/v1/searchProvince',{name:this.provinceName,mark:1});
        this.provinces = provinces.data.provinces;
      },
      async chooseProvince(id,name) {
        this.cities = null;
        this.provinceModal = false;
        this.cityModal = true;
        this.citiesSearchNames = [];
        this.province = id;
        this.selectedProvinceName = name;
        let cities = await this.$axios.post('api/v1/searchCity',{id:this.province});
        if(cities.data.status === 1) {
          this.cities = cities.data.cities;
        }
      },
      addCity (city) {
        if(!this.citiesSearchNames.includes(city))
          this.citiesSearchNames.push(city);
        else
          this.citiesSearchNames.splice(this.citiesSearchNames.indexOf(city), 1);
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
      searchCities() {
        this.cityModal = false;
        // if(this.citiesSearchNames.length > 0) {
        //   let cities = '';
        //   for (let index = 0; index < this.citiesSearchNames.length; ++index) {
        //     const city = this.citiesSearchNames[index];
        //     if(index !== this.citiesSearchNames.length-1)
        //       cities += city+',';
        //     else
        //       cities += city;
        //   }
        //   this.$router.push({path: '/residences/city/search', query:{cities: cities}});
        // }
      },
      async searchCity2() {
        let cities = await this.$axios.post('api/v1/searchCity',{id:this.province,name:this.cityName});
        if(cities.data.status === 1) {
          this.cities = cities.data.cities;
        }
      },
      searchCity(city) {
        this.provinceModal = false;
        this.$router.push({path: '/residences/city/search', query:{cities: city.name}});
      },
      selectProvince() {
        this.selectedProvinceCheck = !this.selectedProvinceCheck;
        if(this.selectedProvinceCheck === true)
          this.cityModal = false;
      },
      handledate(e) {
        this.date = e;
      },
      number_3_3(num, sep) {
        const number = typeof num === 'number' ? num.toString() : num;
        const separator = typeof sep === 'undefined' ? ',' : sep;
        if(typeof number !== 'undefined')
          return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator);
      },
      closeMenu() {
        const main = this.$refs.main;
        if (main.classList.contains('blur')) {
          this.$store.dispatch('setVuexMenuState',false);
          this.$store.dispatch('setVuexLogregMobileState',false);
        }
      }
    },
    computed: {
      dateObj() {
        return this.date?.dates
      },
      vuexMenuState() {
        return this.$store.getters.vuexMenuState
      },
      vuexLogregMobileState() {
        return this.$store.getters.vuexLogregMobileState
      },
      ...mapGetters(['settings'])
    },
    watch: {
      date: {
        deep: true,
        handler(e) {
          if (e.dates.length === 2) {
            this.calendarModal = false;
          }
        },
      },
    },
    created() {
      this.$store.dispatch('setVuexMenuState',false);
    },
    head() {
      return {
        title: this.settings.sitename,
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
