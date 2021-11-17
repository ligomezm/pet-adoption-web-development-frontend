<template>
  <Header v-bind:hideView=true />
  <div class="login-page">
    <div class="hero-login">
      <div class="info-page">
        <img src="../assets/icono.svg" alt="Icono AdoptLife">
        <h1>Sabemos que no puedes cambiar todo el mundo pero si puedes cambiar la vida de uno de ellos</h1>
      </div>
    </div>
    
    <section class="form-access">
      <h2>Iniciar Sesión</h2>
      <p>Al acceder podrás crear peticiones de adopción, hacer publicaciones y administrarlas.</p>

      <form class="form-cmp" v-on:submit.prevent="validateUser" action="">
        <div class="field">
          <label for="user"><em class="fas fa-user"></em> Usuario: </label>
          <input id="user" name="user" type="text" v-model="dataUser.username" placeholder="Ejm. user2001">
        </div>
        <div class="field">
          <label for="password"><em class="fas fa-lock"></em> Contraseña: </label>
          <input id="password" name="password" type="password" v-model="dataUser.password" placeholder="*************">
        </div>
        <div class="field action">
          <router-link to="/registro">No tengo una cuenta</router-link>
          <input class="btn btn-secondary" type="submit" value="Iniciar Sesión">
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  data: function() {
    return {
      dataUser: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    validateUser: function() {
      if(this.validateFields()) {
        const endpoint = 'https://adoptlife-c3p19g2.herokuapp.com/rest-auth/login/';
        const body = this.dataUser;
        const params = {headers: {}};
        this.axios.post(endpoint, body, params)
          .then(response => {
            let data = response.data;
            localStorage.setItem('auth', true);
            localStorage.setItem('token', data.key);

            this.axios.get('https://adoptlife-c3p19g2.herokuapp.com/api/user/list/')
              .then(resp => {
                const users = resp.data;
                const auth = users.filter(user => user.username == this.dataUser.username)[0];
                delete auth.password;
                localStorage.setItem('userAuth', JSON.stringify(auth));
                this.$router.push('/');
              });
          })
          .catch(error => {
            if(error.response.status === 400) {
              this.$swal.fire({
                icon: 'error',
                title: 'Ha ocurrido un error',
                text: '¡El nombre de usuario o la contraseña son incorrectos!',
              });
            } else {
              this.$swal.fire({
                icon: 'error',
                title: 'Error en servidor',
                text: '¡No se ha podido crear la conexión con el servidor!',
              });
            }
          });
      }
    },
    validateFields: function() {
      if(!this.dataUser.username.trim() || !this.dataUser.password.trim()) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: '¡Ingresa el nombre de usuario y la contraseña para continuar!'
        });
        return false;
      }
      return true;
    },
    validateSession: function() {
      let auth = localStorage.getItem("auth");
      if(auth) {
        this.$swal.fire('Ya has iniciado sesión', '¡Debes cerrar sesión para acceder con otra cuenta de usuario!', 'success')
        this.$router.push('/');
      }
    }
  },
  components: {
    Header
  }, 
  created: function() {
    this.validateSession();
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
}

.hero-login {
  padding: 30px;
  text-align: center;
  color: var(--white);
  background-image: url(../assets/login.webp);
  background-position: center center;
  background-size: cover;
}

.info-page img {
  width: 150px;
}

.info-page h1 {
  font-weight: 400;
}

.form-access {
  padding: 10px 20px;
}

.form-access h2 {
  font-size: 30px;
  margin-bottom: 5px;
}

.form-access > p {
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 30px;;
}

.field.action {
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  text-align: center;
}

@media (min-width: 425px) {
  .field.action {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

@media (min-width: 500px) {
  .form-access {
    padding: 50px 50px;
  }
}

@media (min-width: 768px) {
  .login-page {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-login  {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .info-page img {
    width: 230px;
  }

  .form-access {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-access > p {
    margin-bottom: 70px;;
  }
}

.field.action a {
  color: var(--primary);
  font-weight: bold;

}
</style>