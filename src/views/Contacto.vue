<template>
  <Header />
  <h2 class="text-center">Contactános</h2>
  <Construccion view="Contacto" />
  <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Construccion from '../components/Construccion.vue';

export default {
  name: 'Contacto',
  components: {
    Header,
    Footer,
    Construccion
  }
}
</script>

<style>

</style>