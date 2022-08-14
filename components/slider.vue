<template>
    <div>
        <div class="title" dir="rtl">
            <div class="name">
                <i class="bx bx-category"></i>
                <h3>{{ title }}</h3>
            </div>

            <div class="arrows relative">
                <a :href="url+viewAllLink" class="see-more">مشاهده همه</a>
                <a @click="next" uk-slider-item="previous">
                    <i class="bx bx-chevron-right"></i>
                </a>
                <a @click="prev" uk-slider-item="next">
                    <i class="bx bx-chevron-left"></i>
                </a>
            </div>
        </div>
        <div class="flex w-full h-full">
            <swiper ref="mySwiper" :options="swiperOption" dir="rtl">
                <swiper-slide v-for="(slide, index) in slides" :key="index">
                    <div class="relative slider-main overflow-hidden">
                        <a :href="url+`/categories/`+slide.slug" class="slider-image z-10" tabindex="0">
                            <img :src="slide.image" class="uk-transition-scale-up uk-transition-opaque" alt="slide.title" />
                        </a>
                        <div class="slider-title">
                            <a :href="url+`/categories/`+slide.slug">{{ slide.title }}</a>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'

import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.css'
import './style.css'
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
      slides: { type: Array, default: () => [] }, title: { type: String, default: '' },
      viewAllLink: { type: String, default: '/search' },
      url: { type: String, default: 'http://localhost:3000' }
    },
    name: 'carrousel',
    data() {
        return {
            swiperOption: {
                slidesPerView: 5,
                spaceBetween: 30,
                loop: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 40
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    320: {
                        slidesPerView: 2,
                        freeMode: true,

                        spaceBetween: 10
                    }
                },
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
        next() {
            this.swiper.slideNext()
        },
        prev() {
            this.swiper.slidePrev()
        }
    }
}
</script>

<style>
.swiper-container {
    height: 100%;
    min-height: 0;
    min-width: 0;
    width: 100%;
    overflow: hidden;
}

.swiper-slide {
    width: auto;
    flex-shrink: 0;
    display: block;
    height: 100%;
    max-height: 100%;
}

.swiper-wrapper {
    max-height: 100%;
    height: 100%;
    display: flex;
}

.swiper-slide img {
    display: block;
    width: inherit;
    height: inherit;
    object-fit: contain !important;
}
.slider-title {
    @apply absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 text-white text-sm;
}
.slider-title a {
    color: #fff !important;
}
.slider-image img:hover {
    @apply transform scale-110;
}
.slider-main {
    border-radius: 15px;
    width: 100%;
}
</style>
