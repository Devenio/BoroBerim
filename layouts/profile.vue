<template>
  <div>
    <HeaderProfile />
    <nuxt />
    <Footer />
    <vue-snotify />
  </div>
</template>

<script>
  import HeaderProfile from '~/components/HeaderProfile';
  import Footer from '~/components/Footer';

  export default {
    name: "profile",
    components: {
      HeaderProfile,
      Footer
    }
  }
</script>
