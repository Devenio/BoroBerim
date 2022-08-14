<template>
  <div>
    <main ref="main" class="main" :class="[vuexMenuState ? 'blur' : '']" @click="closeMenu">
      <section class="filters-places">
        <div class="title">
          <h1>404</h1>
          <hr>
          صفحه مورد نظر یافت نشد
        </div>
      </section>
    </main>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: "error",
    methods: {
      closeMenu() {
        const main = this.$refs.main;
        if (main.classList.contains('blur'))
          this.$store.dispatch('setVuexMenuState',false);
      }
    },
    computed: {
      vuexMenuState() {
        return this.$store.getters.vuexMenuState;
      },
      ...mapGetters(['settings'])
    },
    created() {
      this.$store.dispatch('setVuexMenuState',false);
    }
  }
</script>
