<template>
  <Header />

  <section class="container register">
    <h2>Formulario de registro</h2>
    <p>Únete a esta comunidad donde podrás poner tu granito de arena para ayudar a las mascotas de otros usuarios, o si necesitas ayuda cuenta con todos.</p>

    <form v-on:submit.prevent="validateData" class="form-cmp register-form" action="#">
      <div class="fields-container">
        <div class="field">
          <label for="name"><em class="fas fa-id-card"></em> Nombre: </label>
          <input v-model="dataRegister.name" id="name" name="name" type="text" placeholder="Ejm. Carlos">
        </div>
        <div class="field">
          <label for="identity_document"><em class="fas fa-sort-numeric-up-alt"></em> Número Identificación: </label>
          <input v-model="dataRegister.identity_document" id="identity_document" name="identity_document" type="number" placeholder="Ejm. 2877372323">
        </div>
        <div class="field">
          <label for="email"><em class="fas fa-envelope-open-text"></em> Email: </label>
          <input v-model="dataRegister.email" id="email" name="email" type="email" placeholder="Ejm. correo@correo.com">
        </div>
        <div class="field">
          <label for="city"><em class="fas fa-city"></em> Ciudad: </label>
          <input v-model="dataRegister.city" id="city" name="city" type="text" placeholder="Ejm. Barranquilla">
        </div>
        <div class="field">
          <label for="address"><em class="fas fa-house-user"></em> Dirección: </label>
          <input v-model="dataRegister.address" id="address" name="address" type="text" placeholder="Ejm. Crr 4 #3-12">
        </div>
        <div class="field">
          <label for="phone_number"><em class="fas fa-phone-alt"></em> Teléfono: </label>
          <input v-model="dataRegister.phone_number" id="phone_number" name="phone_number" type="text" placeholder="Ejm. 3206753425">
        </div>
        <div class="field">
          <label for="image"><em class="fas fa-image"></em> Imagen: </label>
          <input id="image" name="image" type="file" accept="image/png,image/jpeg">
        </div>
        <div class="field">
          <label for="username"><em class="fas fa-key"></em> Nombre Usuario: </label>
          <input v-model="dataRegister.username" id="username" name="username" type="text" placeholder="Ejm. hello2000">
        </div>
        <div class="field">
          <label for="password"><em class="fas fa-lock"></em> Contraseña: </label>
          <input v-model="dataRegister.password" id="password" name="password" type="password" placeholder="****************">
        </div>
        <div class="field">
          <label for="c-password"><em class="fas fa-lock"></em> Confirmar Contraseña: </label>
          <input v-model="dataRegister.c_password" id="c-password" name="c-password" type="password" placeholder="****************">
        </div>
      </div>
      <div class="action-links">
        <input type="submit" class="btn btn-secondary" value="Enviar Registro">
        <router-link class="link" to="/login">Ya tengo una cuenta</router-link>
      </div>
    </form>
  </section>

  <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Registro',
  data: function() {
    return {
      dataRegister: {
        name: '',
        identity_document: '',
        email: '',
        city: '',
        address: '',
        phone_number: '',
        image: '',
        username: '',
        password: '',
        c_password: ''
      }
    }
  },
  methods: {
    validateData: function() {
      this.addImage();
      const require = {};
      Object.keys(this.dataRegister).forEach(key => {
        if(
          key == 'name' || key == 'identity_document' || 
          key == 'email' || key == 'city' || 
          key == 'username' || key == 'password' ||
          key == 'c_password'
        ) require[key] = this.dataRegister[key];
      });
      let validRequire = Object.values(require).every(value => value);
      
      if(!validRequire) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: "Recuerda que el 'Nombre', 'Número Identificación', 'Email', 'Ciudad', 'Nombre Usuario', 'Contraseña' y 'Confirmar Contraseña' son obligatorios" 
        });
        return;
      }

      const {password, c_password } = require;
      if(password != c_password) {
        this.$swal.fire({
          icon: 'error',
          title: 'Contraseña no coincide',
          text: "Las contraseñas ingresadas no coinciden, verifica y vuelve a intentar" 
        });
        return;
      }

      this.sendRequest(this.dataRegister);
    },
    sendRequest: async function(data) {
      const endpoint = 'https://adoptlife-c3p19g2.herokuapp.com/api/user/create/';
      const body = new FormData();
      Object.keys(data).forEach(key => {
        if(key != 'c_password' && data[key]) {
          body.append(key, data[key]);
        }
      });
      const params = {headers: {}};

      try {
        const request = await this.axios.post(endpoint, body, params);
        if(request.status == 202) {
          this.$swal.fire(
            'Usuario creado con éxito',
            'Ya puedes iniciar sesión con el usuario y contraseña que registraste',
            'success'
          )
        }
        this.$router.push('/login');
      } catch (error) {
        if(error.request.status == 400) {
          this.$swal.fire({
            title: 'Fallo en registro',
            text: "El usuario ya se encuentra registrado en el sistema.",
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
        }
      }
    },
    addImage: function() {
      this.dataRegister.image = document.getElementById('image').files[0];
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style>
.register-form {
  margin: 30px 0;
}

.register-form .action-links {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-form .action-links .link {
  margin-top: 10px;
  color: var(--primary);
  font-weight: 600;
}

@media (min-width: 600px) {
  .register-form .fields-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 25px;
    row-gap: 10px;
  }
}
</style>