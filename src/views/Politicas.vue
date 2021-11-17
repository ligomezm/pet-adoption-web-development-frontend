<template>
  <Header />
  <h2 class="text-center">Nuestras Políticas</h2>
  <Construccion view="Políticas Página" />
  <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Construccion from '../components/Construccion.vue';

export default {
  name: 'Politicas',
  components: {
    Header,
    Footer,
    Construccion
  }
}
</script>

<style>

</style>