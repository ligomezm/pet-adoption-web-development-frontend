<template>
  <div class="features-container container">
    <img src="../assets/features.svg" alt="Sección en construcción" loading="lazy">
    <h3>La sección <span>{{this.view}}</span> está en construcción</h3>
    <router-link class="btn btn-primary" to="/">Ir a página principal</router-link>
  </div>
</template>

<script>
export default {
  name: 'Construccion',
  props: {
    view: {
      type: String,
      default: 'Unknown'
    }
  }
}
</script>

<style>
.features-container {
  text-align: center;
  margin-bottom: 20px;
}

.features-container img {
  max-width: 600px;
  width: 100%;
}

.features-container h3 {
  font-weight: 400;
}

.features-container h3 span {
  font-weight: 700;
}
</style>