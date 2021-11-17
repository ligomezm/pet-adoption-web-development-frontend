<template>
  <Header :blockAccess=true />

  <section class="container">
    <h2 class="text-center">Publica una mascota</h2>
    <form v-on:submit.prevent="validateData" class="form-cmp register-form" action="#">
      <section>
        <div class="text-center">
          <div class="image-preview" id="image-preview">
            <img id="photo" alt= "Incluye una imagen de tu mascota" src="">
          </div>
          <input type="file" onchange="document.getElementById('photo').src = window.URL.createObjectURL(this.files[0])" name="photo-select" id="photo-select" class="btn btn-primary">
        </div>
        <!-- Revisar como enlazar mapa con ciudad -->
        <div>
          <iframe v-bind:src="'https://www.google.com/maps/embed/v1/place?key=AIzaSyC8ezUmJ-bFNVMwm-LeKFp8pp1bX5vUNjI&q='+getCity()" width="370" height="280" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div> 
      </section>

      <section>
        <div class="field">
          <label for="pet_name"><em class="fas fa-file-signature"></em> Nombre:</label>
          <input v-model="post.pet_name" id="pet_name" name="pet_name" type="text" placeholder="Nombre mascota">
        </div>
        <div class="field">
          <label for="pet_type"><em class="fas fa-leaf"></em> Tipo:</label>
          <input list="pet_type" v-model="post.pet_type" placeholder="Ejm. Perro">
          <datalist id="pet_type">
            <option value="Perro"></option>
            <option value="Gato"></option>
            <option value="Conejo"></option>
            <option value="Hamster"></option>  
            <option value="Ave"></option> 
          </datalist>  
        </div>
        <div class="field">
          <label for="pet_gender"> <em class="fas fa-venus-mars"></em> Género:</label>
          <input list="pet_gender" v-model="post.pet_gender" placeholder="Masculino o Femenino">
          <datalist id="pet_gender">
            <option value="M">Masculino</option>
            <option value="H">Femenino</option>
          </datalist>  
        </div>
        <div class="field">
          <label for="pet_breed"> <em class="fas fa-atom"></em> Raza: </label>
          <input v-model="post.pet_breed" id="pet_breed" name="pet_breed" type="text" placeholder="Ejm. Labrador">
        </div>
        <div class="field">
          <label for="pet_age"><em class="fas fa-calendar-alt"></em> Edad (meses): </label>
          <input v-model="post.pet_age" id="pet_age" name="pet_age" type="text" placeholder="Ejm. 24">
        </div>
        <div class="field">
          <label for="city"><em class="fas fa-map-pin"></em> Ubicación (ciudad): </label>
          <input v-model="post.pet_city" id="city" name="city" type="text" placeholder="Ejm. Bogotá">
        </div>        
      </section>  
      <div class="publicar-submit">
        <input class="btn btn-secondary" type="submit" value="Publicar">
      </div>
    </form>
  </section>
  <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Publicar',
  components: {
    Header,
    Footer,
  },
  data: function() {
    return {
      post: {
        user_id: localStorage.getItem("userAuth") ? JSON.parse(localStorage.getItem("userAuth")).user_id : null,
        pet_name: '',
        pet_type: '',
        pet_gender: '',
        pet_breed: '',
        pet_age: '',
        pet_city: '',
        photo: '',
        date: this.getDate(),
        active: true
      },
    }
  },
  methods: {
    getCity: function() {
      if(!this.post.pet_city) return 'Bogotá';
      return this.post.pet_city;
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
      if(!this.addImage()) return;
      if(!this.validateSession()) {
        this.$swal.fire({
          title: 'Error de autenticación',
          text: "Para publicar una mascota debes iniciar sesión primero.",
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

      if(!this.post.pet_name || !this.post.pet_type || !this.post.pet_gender || !this.post.pet_age || !this.post.pet_breed || !this.post.pet_city) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error al realizar tu publicación',
          text: 'Verifica que diligenciaste todos los campos para poder continuar.'
        });
        return;
      }
      this.sendRequest();
    },
    sendRequest: async function() {
      let endpoint = 'https://adoptlife-c3p19g2.herokuapp.com/api/posts/';
      let data = new FormData();
      let params = {headers: {}};

      Object.keys(this.post).forEach(key => {
        data.append(key, this.post[key]);
      });

      try {
        const request = await this.axios.post(endpoint, data, params);
        if(request.status == 201) {
          this.$swal('Publicación exitosa', 'Tu publicación será mostrada en la lista.', 'success');
          this.$router.push('/mascotas');
        }
      } catch(error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'No se ha podido agregar la publicación.'
        });
      }
    },
    addImage: function() {
      let image = document.getElementById('photo-select').files[0];
      if(!image) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error al subir la imagen',
          text: 'Debes seleccionar una imagen para poder continuar.'
        });
        return false;
      }
      this.post.photo = image;
      return true;
    }
  },
  created: function() {
    this.getDate();
  }
}
</script>

<style scoped>
.register-form {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  align-items: flex-start;
}

.register-form section:nth-child(1) {
  grid-row: 2 / 3;
}

.register-form section:nth-child(2) {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.register-form .publicar-submit {
  text-align: center;
  grid-column: 1/2;
}

.register-form .field input:not([type="submit"]),
.register-form .field textarea {
  border: 2px solid var(--primary-light);
  width: 100%;
  border-radius: 5px;
}

.image-preview {
  width: 100%;
  min-height: 250px;
  border: 2px solid #0195c7;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #979696;
}

.register-form iframe {
  width: 100%;
}

.btn {
  padding: 10px 30px;
  font-weight: bold;
  border-radius: 8px;
  display: inline-block;
  width: 290px;
  margin-bottom: 30px;
}

@media (min-width: 600px) {
  .register-form {
    grid-template-columns: repeat(2, 1fr);
  }

  .register-form section:nth-child(1) {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }

  .register-form section:nth-child(2) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  .register-form .publicar-submit {
    grid-column: 1 / 3;
  }
}
</style>