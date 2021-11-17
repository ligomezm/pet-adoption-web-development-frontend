<template>
  <section class="container about">
    <h2>Sobre Nosotros</h2>
    <div class="cards-container">
      <div class="card-about">
        <img src="../assets/nosotros-1.svg" alt="Un mundo de mascotas">
        <h3>Un mundo de mascotas</h3>
        <p>Podrás encontrar muchas mascotas  a la espera de tú ayuda, encuentra la que más te guste y contáctate con su dueño.</p>
      </div>
      <div class="card-about">
        <img src="../assets/nosotros-2.svg" alt="Ubicados en todo el pais">
        <h3>Ubicados en todo el país</h3>
        <p>Hay muchos refugios al rededor del país a la espera de tú ayuda, estamos seguros de que alguna publicación será de tú interés.</p>
      </div>
      <div class="card-about">
        <img src="../assets/nosotros-3.svg" alt="Crea tus publicaciones">
        <h3>Crea tus publicaciones</h3>
        <p>Si tienes una mascota que quieras dar en adopción no dudes en crear una publicación, alguien ahí afuera necesita de él.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Nosotros'
}
</script>

<style>
.about h2 {
  font-size: 30px;
  text-align: center;
}

.about .cards-container {
  margin-top: 50px;
  display: grid;
  gap: 30px;
}

.about .card-about {
  text-align: center;
}

.about .card-about img {
  width: 200px;
}

.about .card-about h3 {
  font-size: 25px;
}

.about .card-about p {
  font-size: 20px;
}

@media (min-width: 550px) {
  .about .cards-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .about .cards-container .card-about:nth-child(3) {
    grid-column: 1 / 3;
  }
}

@media (min-width: 800px) {
  .about .cards-container {
    grid-template-columns: repeat(3, 1fr);
  }

  .about .cards-container .card-about:nth-child(3) {
    grid-column: 3 / 4;
  }
}
</style>