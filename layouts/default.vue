<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
    <vue-snotify />
  </div>
</template>

<script>
  import Header from '~/components/Header';
  import Footer from '~/components/Footer';

  export default {
    name: "default",
    components: {
      Header,
      Footer
    }
  }
</script>
