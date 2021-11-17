<template>
  <Header />

  <section class="form-add container">
    <h2 class="text-center">Agrega un Testimonial</h2>
    <form v-on:submit.prevent="validateData" class="form-cmp register-form" action="#">
      <div class="field">
        <label for="title"><em class="fas fa-book"></em> Titulo: </label>
        <input v-model="testimonial.title" id="title" name="title" type="text" placeholder="Ejm. Buena experiencia">
      </div>
      <div class="field">
        <label for="comment"><em class="fas fa-comments"></em> Comentario: </label>
        <textarea v-model="testimonial.comment" id="comment" name="comment" placeholder="Ejm. Agradable la página"></textarea>
      </div>
      <div class="action-container">
        <input class="btn btn-secondary" type="submit" value="Enviar">
      </div>
    </form>
  </section>
  
  <section class="testimonials all-testimonials">
      <h2 class="text-center">Todos los Testimoniales</h2>
      <div class="testimonials-container container">
        <div v-for="(testimonial, key) in testimonials" :key="key">
          <Testimonial v-bind:dataTestimonial=testimonial />
        </div>
      </div>
    </section>

  <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Testimonial from '../components/Testimonial.vue';

export default {
  name: 'Testimoniales',
  components: {
    Header,
    Footer,
    Testimonial
  },
  data: function() {
    return {
      testimonials: [],
      testimonial: {
        title: '',
        comment: '',
        date: this.getDate()
      }
    }
  },
  methods: {
    getTestimonials: async function() {
      const endpoint = 'https://adoptlife-c3p19g2.herokuapp.com/api/testimonials/';
      const body = {};
      const params = {headers: {}};

      try {
        const request = await this.axios.get(endpoint, body, params);
        this.testimonials = request.data;
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'Lo sentimos pero no pudimos obtener el listado de testimoniales.'
        });
      }
    }, 
    validateNumber: function(number) {
      return number < 10 ? `0${number}` : number;
    },
    getDate: function() {
      const objDate = new Date();
      let year = objDate.getFullYear();
      let month = this.validateNumber(objDate.getMonth() + 1);
      let day = this.validateNumber(objDate.getDate());
      let hour = this.validateNumber(objDate.getHours());
      let minute = this.validateNumber(objDate.getMinutes()); 
      let second = this.validateNumber(objDate.getSeconds());
      
      return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
    },
    validateSession: function() {
      let auth = localStorage.getItem('auth');
      let token = localStorage.getItem('token');

      if(!auth || !token) {
        return false;
      }

      return true;
    },
    validateData: function() {
      if(!this.validateSession()) {
        this.$swal.fire({
          title: 'Error de autenticación',
          text: "Para poder enviar un testimonial debes iniciar sesión primero.",
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Iniciar Sesión',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push('/login');
          }
        });
        return;
      }

      if(!this.testimonial.title || !this.testimonial.comment) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error al enviar testimonial',
          text: 'Ingresa un titulo y un comentario para poder continuar.'
        });
        return;
      }

      this.sendRequest();
    },
    sendRequest: async function() {
      let endpoint = 'https://adoptlife-c3p19g2.herokuapp.com/api/testimonials/';
      let data = this.testimonial;
      let params = {headers: {}};

      try {
        const request = await this.axios.post(endpoint, data, params);
        if(request.status == 201) {
          this.$swal('Creado Correctamente', 'El testimonial se ha enviado y será mostrado en la lista.', 'success');
          this.getTestimonials();
        }
      } catch(error) {
        this.$swal.fire({
          icon: 'error',
          title: 'ha ocurrido un error',
          text: 'No se ha podido agregar el testimonial.'
        });
      }
    }
  },
  created: function() {
    this.getTestimonials();
    this.getDate();
  }
}
</script>

<style scoped>
.register-form {
  max-width: 650px;
  margin: 15px auto;
}

.all-testimonials {
  margin-bottom: 30px;
}

.register-form .field input:not([type="submit"]),
.register-form .field textarea {
  border: 2px solid var(--primary-light);
  border-radius: 5px;
}

.register-form .field textarea {
  height: 200px;
}

.register-form .action-container {
  text-align: center;
}
</style>