<template>
  <Header :blockAccess=true />
  <h2 class="text-center">Detalles Adopción</h2>
  <Construccion view="Detalles Adopción" />
  <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Construccion from '../components/Construccion.vue';

export default {
  name: 'DetallesAdopcion',
  components: {
    Header,
    Footer,
    Construccion
  },
  methods: {
    validate: function() {
      if(localStorage.getItem('adopt') == 'false') {
        this.$router.push('/mascotas');
      }
    },
  },
  created: function () {
    this.validate();
    if(localStorage.getItem('adopt')){
      localStorage.setItem('adopt', false);
    }
  }
}
</script>

<style>
</style>