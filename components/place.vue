<template>
  <div class="place-wrapper">
    <div class="mx-auto flex flex-col flex-item" dir="rtl">
      <div class="relative slider-main overflow-hidden">
        <a :href="url+`/`+slide.typeSlug+'/'+slide.provinceSlug+'/'+slide.citySlug+'/'+slide.id" class="slider-image z-10" tabindex="0">
          <img :src="slide.image" alt class="uk-transition-scale-up uk-transition-opaque" />
        </a>
        <div class="slider-type">
          <a :href="url+`/`+slide.typeSlug">{{ slide.type }}</a>
        </div>
        <a @click="addToFavorite(slide)" class="like" href="javascript:void(0)" v-show="$auth.loggedIn">
          <i class="bx bxs-heart" v-if="slide.favorite === 1"></i>
          <i class="bx bx-heart" v-else></i>
        </a>
      </div>
      <div class="flex flex-col p-3 flex-col-rev">
        <div class="delivery">
          <div>
            <i class="bx bx-flag" v-show="slide.fast === 1"></i>
            <span v-show="slide.fast === 1">تحویل فوری و قطعی</span>
          </div>
        </div>
        <div class="py-3 slider2-title">
          <a :href="url+`/`+slide.typeSlug+'/'+slide.provinceSlug+'/'+slide.citySlug+'/'+slide.id">{{ slide.title }}</a>
        </div>
        <div class="star-loc-wrapper">
          <div class="flex slider2-location" dir="rtl">
            <i class="icon-location icon-pin"></i>
            <a :href="url+`/`+slide.typeSlug+`/`+slide.provinceSlug+`/`+slide.citySlug"> {{ slide.city }} </a>
            <div style="margin: 0 5px;">,</div>
            <a :href="url+`/`+slide.typeSlug+`/`+slide.provinceSlug"> {{ slide.province }} </a>
          </div>
          <div class="star-wrapper">
            <i class="icon-star-full icon-pin"></i>
            <strong>{{ slide.score }}</strong>
            <span>({{ slide.commentsCount }})</span>
          </div>
        </div>
      </div>
      <div class="price-wrapper">
        <div>
          <i class="icon-bed-land icon-pin"></i>
          <strong>2 خوابه</strong>
        </div>
        <div v-show="slide.off !== 0">
          <i class="icon-discount icon-pin"></i>
          <strong>%{{ slide.off }}</strong>
        </div>
        <div>
          <strong v-if="slide.off !== 0">{{ number_3_3(slide.price - slide.offAmount)}}</strong>
          <strong v-else>{{ number_3_3(slide.price)}}</strong>
          <i class="icon-toman icon-pin"></i>
          <span v-show="slide.off !== 0">{{ number_3_3(slide.price) }} تومان</span>
        </div>
      </div>
      <div class="separator"></div>
      <div class="seemore">
        <a :href="url+`/`+slide.typeSlug+'/'+slide.provinceSlug+'/'+slide.citySlug+'/'+slide.id">
          <span>مشاهده اطلاعات اقامتگاه</span>
          <i class="icon-eye icon-pin"></i>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      slide: null,
      url: {type: String, default: 'http://localhost:3000'}
    },
    methods: {
      async addToFavorite(slide) {
        let res = await this.$axios.post('api/v1/user/addToFavorite', {id: slide.id});
        if(res.data.status === 1) {
          if(slide.favorite === 0)
            slide.favorite = 1;
          else
            slide.favorite = 0;
          this.$snotify.success(res.data.msg, {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          });
        } else if(res.data.status === 422) {
          this.$snotify.warning(res.data.msg, {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          });
        } else {
          this.$snotify.error(res.data.msg, {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          });
        }
      },
      number_3_3(num, sep) {
        const number = typeof num === 'number' ? num.toString() : num;
        const separator = typeof sep === 'undefined' ? ',' : sep;
        return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator);
      }
    }
  };
</script>

<style scoped>
  .place-wrapper {
    margin-top: 40px;
  }

  .seemore {
    display: flex; align-items: center; justify-content: center;
  }

  .seemore > a {
    text-decoration: none;
    color: #287fff;
    font-size: 15px;
    font-weight: bold; display: flex;
    align-items: center;
  }

  .seemore > a img {
    width: 21px; height: 22px; margin-right: 5px;
  }

  .separator {
    width: calc(100% + 20px);
    height: 1px;
    background: #eaeaea;
    transform: translateX(10px); margin-bottom: 14px;
  }

  .price-wrapper {
    display: flex; padding-bottom: 22px;
  }

  .price-wrapper > div:first-child {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #657492;
    background: #eff6ff;
    height: 25px;
    width: 70px;
    border-radius: 7px; justify-content: center;
  }

  .price-wrapper > div:first-child img {
    width: 14px; height: 14px; margin-left: 3px;
  }

  .price-wrapper > div:nth-child(2) {
    background: #ffe1e1;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 23px;
    padding: 0 7px;
    border-radius: 7px;
    margin-right: 9px; color: #ff6969; border: 1px solid #fdcccc;
  }

  .price-wrapper > div:nth-child(2) img {
    width: 14px; height: 12px; margin-left: 3px;
  }

  .price-wrapper > div:last-child {
    flex: 1; position: relative;
    display: flex; align-items: center; justify-content: flex-end;
  }

  .price-wrapper > div:last-child > strong {
    font-size: 23px; margin-left: 7px;
  }

  .price-wrapper > div:last-child > span {
    position: absolute;
    top: -25px;
    left: 0;
    color: #c5c5c5;
    font-size: 14px;
  }

  .price-wrapper > div:last-child > span::after {
    content: ""; width: 100%; height: 1px; background: #c5c5c5; transform: rotate(-380deg);
    position: absolute; top: 5px; left: 0;
  }

  .flex-item {
    border: 1px solid #eaeaea; padding: 10px; border-radius: 20px;
  }

  .delivery {
    display: flex; align-items: center; margin-top: 7px; margin-bottom: 10px; height: 15px;
  }

  .delivery > div {
    display: flex; align-items: center;
  }

  .delivery > div span {
    font-size: 15px;
    color: #888;
    margin-right: 5px;
  }

  .star-wrapper {
    display: flex;
    align-items: center;
  }

  .star-wrapper > span {
    font-size: 12px;
    color: #999;
    margin-right: 4px;
  }

  .star-wrapper > strong {
    margin-right: 4px;
  }

  .star-loc-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between; margin-bottom: 5px;
  }

  .icon-pin {
    margin-left: 10px;
  }

  .flex-col-rev {
    flex-direction: column-reverse !important;
  }

  .swiper-container {
    height: 100%;
    min-height: 0;
    min-width: 0;
    max-width: 100vw;
    width: 100%;
    overflow: hidden; padding-top: 45px;
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

  .slider-type {
    @apply absolute transform z-20 text-white text-sm;
    position: absolute;
    bottom: 5%;
    right: 5%;
  }

  .slider-type a {
    background-color: white;
    color: #1749ff;
    font-size: 0.8rem;
    border-radius: 5px;
    padding: 0.25rem;
  }

  .slider-image img:hover {
    @apply transform scale-110;
  }

  .slider-main {
    border-radius: 15px; position: relative; margin-top: -45px;
    width: 100%;
  }

  .slider2-title a {
    @apply text-sm text-gray-900;
    font-weight: bold;
    font-size: 20px;
  }

  .slider2-location {
    @apply text-sm;
  }

  .slider2-price > :nth-child(1) span {
    @apply font-bold text-black;
  }

  .slider2-price > :nth-child(1) p {
    @apply text-sm text-black text-left;
  }

  .slider2-price > :nth-child(2) span {
    color: black;
    opacity: 0.8;
    font-size: 1rem;
    text-decoration: line-through;
    margin-bottom: 0.5rem;
  }

  .slider2-price > :nth-child(2) p {
    background-color: rgba(255, 0, 0, 0.1);
    color: #ff0000;
    font-size: 0.9rem;
    border-radius: 5px;
    padding: 0.25rem;
  }

  .see-more-slider2 {
    @apply text-black flex items-center;
  }

  a.like {
    text-decoration: none;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: white;
    transition: all 0.3s;
    width: 39px;
    height: 39px;
    border-radius: 50%;
    bottom: 10px;
    top: auto;
    left: 10px;
    color: #ffbbbb;
  }
</style>
