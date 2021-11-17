<template>
  <div class="home">
    <Header v-bind:homeView=true />
    <SobreNosotros />

    <div class="posts container text-center">
      <h2 class="text-center">Últimas Publicaciones</h2>
      <div class="posts-container">
        <div v-for="(post, key) in posts" :key="key">
          <Post v-bind:infoPost=post />
        </div>
      </div>
      <router-link class="btn btn-secondary" to="/mascotas">Ver Todo</router-link>
    </div>

    <div class="hero-contacto">
      <div class="content-hero container">
        <p>Puedes crear tú <span>perfil</span> y administrarlo como tú quieras, luego podrás <span>contactar</span> con otros usuarios o puedes crear tus <span>publicaciones</span> para que se contacten contigo. Si algo no funciona bien, contáctate con nosotros.</p>
        <router-link class="btn btn-secondary" to="/contacto">Contáctanos</router-link>
      </div>
    </div>

    <section class="testimonials text-center">
      <h2 class="text-center">Testimoniales</h2>
      <div class="testimonials-container container">
        <div v-for="(testimonial, key) in testimonials" :key="key">
          <Testimonial v-bind:dataTestimonial=testimonial />
        </div>
      </div>
      <router-link class="btn btn-secondary" to="/testimoniales">Ver Todo</router-link>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header';
import SobreNosotros from '../components/SobreNosotros';
import Post from '../components/Post';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer.vue';

export default {
  name: 'Inicio',
  components: {
    Header,
    SobreNosotros,
    Post,
    Testimonial,
    Footer
  },
  data: function() {
    return {
      posts: [],
      testimonials: []
    }
  },
  methods: {
    getPosts: async function() {
      const endpoint = 'https://adoptlife-c3p19g2.herokuapp.com/api/posts/';
      const body = {};
      const params = {headers: {}};

      try {
        const request = await this.axios.get(endpoint, body, params);
        this.posts = request.data.length > 3 ? request.data.reverse().slice(0, 3) : request.data.reverse();
      } catch(error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'Lo sentimos pero no pudimos obtener el listado de publicaciones.'
        });
      }
    }, 
    getTestimonials: async function() {
      const endpoint = 'https://adoptlife-c3p19g2.herokuapp.com/api/testimonials/';
      const body = {};
      const params = {headers: {}};

      try {
        const request = await this.axios.get(endpoint, body, params);
        this.testimonials = request.data.length > 3 ? request.data.slice(0, 3) : request.data;
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'Lo sentimos pero no pudimos obtener el listado de testimoniales.'
        });
      }
    }
  },
  created: function() {
    this.getPosts();
    this.getTestimonials();
  }
}
</script>

<style>
.posts .btn,
.testimonials .btn {
  margin-top: 20px;
}

.hero-contacto {
  margin: 40px 0;
  height: 400px;
  background-image: url(../assets/contact.webp);
  background-position: center center;
  background-size: cover;
  display: grid;
  place-items: center;
}

.hero-contacto .content-hero {
  text-align: center;
  max-width: 780px;
}

.hero-contacto .content-hero p {
  color: var(--white);
  font-size: 23px;
}

.hero-contacto .content-hero p span {
  font-weight: 700;
}

.testimonials {
  margin-bottom: 30px;
}

@media (min-width: 550px) {
  .hero-contacto .content-hero p {
    color: var(--white);
    font-size: 28px;
  }
}
</style>