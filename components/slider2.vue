<template>
    <div>
        <div class="title flex justify-between mt-6" dir="rtl">
            <div class="name flex flex-row">
                <h3 style="border-right: 5px solid #1749FF;padding: 0.5rem;">{{ title }}</h3>
            </div>
            <div class="arrows relative flex">
                <a class="see-more-slider2" :href="url+viewAllLink">
                    <span>مشاهده همه</span>
                </a>
            </div>
        </div>
        <div class="flex w-full h-full">
            <swiper ref="mySwiper" :options="swiperOption" dir="rtl">
                <swiper-slide v-for="(slide, index) in slides" :key="index">
                  <Place :slide="slide" />
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<style scoped>
  @media screen and (max-width: 699px) {
    .swiper-slide {
      width: 90% !important;
    }
  }
</style>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import Place from '../components/place.vue';

import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.css'

export default {
    components: {
        Swiper,
        SwiperSlide,
        Place
    },
    props: {
      slides: { type: Array, default: () => [] },
      title: { type: String, default: '' },
      viewAllLink: { type: String, default: '#' },
      url: { type: String, default: 'http://localhost:3000' }
    },
    name: 'carrousel',
    data() {
        return {
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 30,
                breakpoints: {
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    700: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    320: {
                        slidesPerView: 1,
                        freeMode: true,

                        spaceBetween: 20
                    }
                },

                dir: 'rtl'
            }
        }
    },
    computed: {
      swiper() {
          return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {

    },
    methods: {
      number_3_3(num, sep) {
        const number = typeof num === 'number' ? num.toString() : num
        const separator = typeof sep === 'undefined' ? ',' : sep
        return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator)
      },
      next() {
          this.swiper.slideNext()
      },
      prev() {
          this.swiper.slidePrev()
      }
    }
}
</script>
