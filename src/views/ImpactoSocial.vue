<template>
  <Header />
  <h2 class="text-center">Generando Impacto</h2>
  <Construccion view="Impacto Social" />
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