<template>
  <div class="item">
     <Place :slide="residence" />
  </div>
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
