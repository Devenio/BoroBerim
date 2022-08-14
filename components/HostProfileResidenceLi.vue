<template>
  <li class="uk-width-1-2 item" style="box-sizing: border-box !important;">
     <Place :slide="residence" />
  </li>
</template>

<script>
import Place from '../components/place.vue';

export default {
  props: {
    residence: Object
  },
  components: {
    Place: Place
  }
}
</script>
