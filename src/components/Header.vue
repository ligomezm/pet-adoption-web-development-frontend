<template>
  <header class="header-app" v-bind:class="{'home': homeView, 'hidden': hideView}">
    <nav class="nav-bar container">
      <router-link to="/" class="brand">
        <img src="../assets/icono.svg" alt="AdoptLife">
        <h2>AdopLife</h2>
      </router-link>
      <em v-on:click="isNavExpand" class="fas fa-bars"></em>
      <nav class="nav" v-bind:class="{'expand': navExpand}">
        <div class="links">
          <router-link class="link" to="/mascotas">Mascotas</router-link>
          <router-link class="link" to="/publicar">Publicar</router-link>
          <router-link class="link" to="/pqrs">Pqrs</router-link>
          <router-link class="link" to="/Testimoniales">Testimoniales</router-link>
        </div>
      </nav>
    </nav>
    <main class="main-info">
      <h1>Ayudando a conectar las mascotas con un mundo nuevo, entre todos podremos hacer la diferencia.</h1>
      <router-link v-if="!auth" to="/login" class="btn btn-secondary">Iniciar Sesión</router-link>
      <router-link v-if="auth" to="/login" v-on:click.prevent="logout" class="btn btn-error">Cerrar Sesión</router-link>
    </main>
    <div class="user-data">
      <button class="btn-user btn-secondary" v-on:click="isDataUserExpand">
        <em class="fas fa-users-cog"></em>
      </button>
      <div v-bind:class="{'visible': dataUserExpand}"  class="user-session-container">
        <div v-if="!userAuth" class="text-center">
          <div class="icon">
            <em class="fas fa-user-secret"></em>
          </div>
          <div class="basic-info">
            <h3>No has iniciado sesión</h3>
            <router-link to="/login" class="btn btn-secondary">Iniciar Sesión</router-link>
          </div>
        </div>
        
        <div v-if="userAuth" class="text-center authenticated">
          <div class="image">
            <img v-if="userAuth.image" :src="userAuth.image" alt="Imagen usuario">
            <img v-if="!userAuth.image" src="../assets/user-default.webp" alt="Imagen usuario">
          </div>
          <div class="basic-info">
            <h3>{{userAuth.name}}</h3>
            <h4>{{userAuth.email}}</h4>
            <div class="buttons-account">
              <router-link to="/cuenta/detalles" class="btn btn-primary">Más Detalles</router-link>
              <router-link to="/login" v-on:click.prevent="logout" class="btn btn-error">Cerrar Sesión</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data: function() {
    return {
      navExpand: false,
      dataUserExpand: false,
      auth: false,
      userAuth: JSON.parse(localStorage.getItem('userAuth')) || null
    }
  },
  methods: {
    isNavExpand: function() {
      this.navExpand = this.navExpand ? false : true;
    },
    isDataUserExpand: function() {
      this.dataUserExpand = this.dataUserExpand ? false : true;
    },
    logout: function() {
      this.auth = false;
      localStorage.clear();
      this.$router.push('/login');
    },
    verifyAuth: function() {
      this.auth = localStorage.getItem('auth') || false;
      
      if(!this.auth && this.blockAccess) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: '¡Debes iniciar sesión para acceder a esta sección!',
        });
        this.$router.push('/login');
      }
    },
    createSesion: function(data) {
      this.auth = true;
    }
  },
  created: function() {
    this.verifyAuth();
  },
  props: {
    homeView: {
      type: Boolean,
      default: false
    },
    blockAccess: {
      type: Boolean,
      default: false
    },
    hideView: {
      type: Boolean,
      default: false
    }
  }
}
</script>
  
<style>
.header-app.hidden {
  display: none;
}

.header-app.home {
  height: 650px;
  background-image: url(../assets/home.webp);
  background-size: cover;
  background-position: center center;
}

.header-app.home .nav-bar,
.header-app .nav-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-bottom:  unset;
}

.header-app .nav-bar {
  border-bottom: 2px solid var(--gray);
}

.nav-bar .brand {
  flex-basis: 80%;
  display: flex;
  text-decoration: none;
}

.header-app.home .nav-bar .brand img,
.header-app .nav-bar .brand img {
  width: 50px;
  margin-right: 15px;
  filter: unset;
}

.header-app .nav-bar .brand img {
  filter: invert(1);
}

.header-app.home .nav-bar > em, 
.header-app .nav-bar > em {
  font-size: 30px;
  color: var(--white);
  flex-basis: 20%;
  text-align: right;
  cursor: pointer;
}

.header-app .nav-bar > em {
  color: var(--dark);
}

.nav-bar .nav {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: center;
}

.header-app.home .nav-bar .brand h2 {
  color: var(--white);
}

.header-app .nav-bar .brand h2 {
  color: var(--dark);
}

.nav .links {
  flex-basis: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  text-align: center;
}

.nav-bar .nav {
  display: flex;
  align-items: center;
  display: none;
}

.nav-bar .nav.expand {
  display: block;
}

.header-app.home .nav .links .link,
.header-app .nav .links .link {
  color: var(--white);
  font-weight: 600;
  text-decoration: none;
  transition: all .5s ease;
}

.header-app .nav .links .link {
  color: var(--dark);
}

.header-app.home .nav .links .link:hover,
.header-app .nav .links .link:hover {
  color: var(--primary-light);
}

.header-app.home .main-info {
  flex-direction: column;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 30px;
}

.header-app .main-info {
  display: none;
}

.main-info h1 {
  max-width: 600px;
  color: var(--white);
  font-weight: 600;
}

.btn-user {
  position: fixed;
  height: 55px;
  width: 55px;
  bottom: 30px;
  right: 30px;
  padding: 10px;
  border-radius: 50%;
  font-size: 25px;
  color: var(--white);
}

.user-data .user-session-container {
  position: fixed;
  bottom: 110px;
  right: -400px;
  background-color: var(--white);
  border: 1px solid var(--gray);
  box-shadow: 1px 1px 5px var(--gray);
  padding: 15px;
  border-radius: 10px;
  z-index: 99;
  transition: all .2s ease;
}

.user-data .visible.user-session-container {
  right: 30px;
}

.user-data .user-session-container .icon em {
  font-size: 80px;
}

.authenticated .image {
  height: 150px;
  border: 1px solid var(--gray);
  border-radius: 10px;
  overflow: hidden;
}

.authenticated .image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.authenticated .basic-info h3 {
  font-size: 28px;
  margin-bottom: 0;
}

.authenticated .basic-info h4 {
  font-weight: 400;
  font-size: 13px;
  margin-top: 0;
}

.authenticated .buttons-account {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (min-width: 350px) {
  .header-app.home {
    height: 590px;
  }
}

@media (min-width: 425px) {
  .header-app.home {
    height: 550px;
    background-size: cover;
    background-position: center center;
  } 

  .header-app.home .main-info {
    margin-top: 60px;
  }
}

@media (min-width: 768px) {
  .header-app.home {
    height: 500px;
    background-size: cover;
    background-position: center center;
  } 

  .main-info {
    margin: 70px;
  }

  .header-app.home .nav-bar,
  .header-app .nav-bar {
    padding: 20px;
    display: flex;   
    justify-content: space-between; 
    align-items: center;
    flex-wrap: nowrap;
  }

  .nav-bar > em {
    display: none;
    flex-basis: fill;
  }

  .nav-bar .brand {
    flex-basis: fill;
    text-decoration: none;
  }

  .nav-bar .nav {
    flex-basis: fill;
    align-items: center;
    justify-content: center;
    display: block;
  }

  .nav .links {
    flex-basis: fill;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>