<template>
  <Header />

  <div class="container">
    <h1 class="text-center">Detalles Mascota</h1>
    <div class="card-container">
      <div class="image">
        <img v-if="post_details.photo" :src="post_details.photo" alt="Foto mascota">
        <img v-if="!post_details.photo" src="../assets/image-default.png" alt="Imagen defecto">
      </div>
      <div class="content">
        <h2><em class="fas fa-paw"></em> Nombre: <span>{{ post_details.pet_name }}</span></h2>
        <p><em class="fas fa-calendar"></em> Edad: <span>{{ post_details.pet_age }} meses</span></p>
        <p><em class="fas fa-venus-mars"></em> Género: <span>{{post_details.pet_gender == "M" ? "Macho" : "Hembra"}}</span></p>
        <p><em class="fas fa-user"></em> Publicado por: <span>{{user_post_name}}</span></p>
        <p><em class="fas fa-search-location"></em> Ubicado en: <span>{{post_details.pet_city}}</span></p>
        <div class="map">
          <div>
            <iframe v-bind:src="'https://www.google.com/maps/embed/v1/place?key=AIzaSyC8ezUmJ-bFNVMwm-LeKFp8pp1bX5vUNjI&q='+post_details.pet_city" width="370" height="280" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
          </div> 
        </div>
        <div class="text-center btn-container">
          <button v-on:click="adopt(user_id)" v-if="post_details.user_id != user_id" class="btn btn-primary" type="button">Adoptar Mascota</button>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'DetallesMascota',
  components: {
    Header,
    Footer
  },
  data: function() {
    return {
      post_id: this.$router.currentRoute._value.params.post_id,
      post_details: {},
      user_post_name: "",
      user_id: localStorage.getItem("userAuth") ? JSON.parse(localStorage.getItem("userAuth")).user_id : null 
    }
  },
  methods: {
    getUserPost: async function(id) {
        let endpoint = `https://adoptlife-c3p19g2.herokuapp.com/api/user/details/${id}/`;
        this.axios.get(endpoint)
          .then(response => {
            this.user_post_name = response.data.name;
          })
          .catch(error => {
            this.$swal.fire({
              title: 'Error',
              text: 'No se pudo obtener la información del usuario',
              type: 'error',
              confirmButtonText: 'Ok'
            })
          });
    },
    getDetailsPet: async function() {
      let endpoint = `https://adoptlife-c3p19g2.herokuapp.com/api/post/${this.post_id}`;
      let body = {};
      let params = {headers: {}};

      try {
        let request = await this.axios.get(endpoint, body, params);
        this.post_details = request.data;
      } catch(error) {
        this.$swal.fire({
          icon: 'error',
          title: `No existe una publicación con el id '${this.post_id}'`,
          text: '¡Recuerda acceder desde los enlaces de las tarjetas de las publicaciones!',
        });
        this.$router.push('/');
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
    adopt: function(id) {
      if(!localStorage.getItem("userAuth") || !localStorage.getItem("auth")) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Debes iniciar sesión para adoptar una mascota.',
          type: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }

      let endpoint = `https://adoptlife-c3p19g2.herokuapp.com/api/adoptions/`;
      let body = {
        date: this.getDate(),
        user_id: id,
        post_id: this.post_id
      };
      let params = {headers: {}};

      this.$swal.fire({
          title: '¿Estás seguro de adoptar esta mascota?',
          text: "!Debes estar seguro de querer adoptar la mascota antes de continuar¡",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, adoptar',
          cancelButtonText: 'Cancelar'
        }).then( async (result) => {
          if (result.isConfirmed) {
            try {
              let request = await this.axios.post(endpoint, body, params);
              if(request.status == 201) {
                this.$swal.fire({
                  icon: 'success',
                  title: '¡Felicidades!',
                  text: '¡Has adoptado una mascota!',
                  type: 'success',
                  confirmButtonText: 'Ok'
                });
                localStorage.setItem('adopt', true);
                this.$router.push('/adopcion/detalles');
              }
            } catch(error) {
              this.$swal.fire({
                icon: 'error',
                title: 'La mascota ya fué adoptada',
                text: 'Lo sentimos, la mascota ya fué adoptada por otro usuario. Puedes buscar otra en la sección de publicaciones.',
                type: 'error',
                confirmButtonText: 'Ok'
              });
            }
          }
        })
    }
  },
  created: async function() {
    await this.getDetailsPet();
    await this.getUserPost(this.post_details.user_id);
  }
}
</script>

<style scoped>
.card-container {
  max-width: 600px;
  margin: 0 auto 20px auto;
  border: 2px solid var(--primary);
  border-radius: 10px;
  overflow: hidden;
}

.card-container .image {
  height: 300px;
  width: 100%;
}

.card-container .image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: top;
}

.card-container .content {
  padding: 20px;
}

.card-container .content .map iframe {
  width: 100%;
  height: 250px;
  border-radius: 10px;
}

.card-container .content h2 {
  font-size: 1.5em;
  margin-top: 0;
  margin-bottom: 10px;
}

.card-container .content p {
  font-weight: 600;
  font-size: 18px;
}

.card-container .content p span {
  font-weight: 400;
}

.btn-container {
  margin-top: 20px;
}
</style>