<template>
  <Header />

  <div class="container text-center about-image">
    <img src="../assets/about.svg" alt="Sobre nosotros">
  </div>

  <SobreNosotros />
  <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import SobreNosotros from '../components/SobreNosotros.vue';

export default {
  name: 'Nosotros',
  components: {
    Header,
    Footer,
    SobreNosotros
  }
}
</script>

<style>
.about-image {
  max-width: 600px;
  width: 100%;
  margin-top: 30px;
}
</style>