<template>
  <Header v-bind:blockAccess=true />
  <h2 class="text-center">Detalles Cuenta Usuario</h2>
  <div class="container">
    <div class="detalles-cuenta">
      <div class="image">
        <img v-if="dataAuth.image" :src="dataAuth.image" alt="Imagen del usuario">
        <img v-if="!dataAuth.image" src="../assets/user-default.webp" alt="Imagen del usuario">
      </div>
      <div class="info">
        <h2>{{dataAuth.name}}</h2>
        <p>Último Acceso: <span>{{dataAuth.last_login}}</span></p>
        <p>Correo Eléctronico: <span>{{dataAuth.email}}</span></p>
        <p>Número de Identificación: <span>{{dataAuth.identity_document}}</span></p>
        <p>Número Teléfono: <span>+57 {{dataAuth.phone_number}}</span></p>
        <p>Ciudad:  <span>{{dataAuth.city}}</span></p>
        <p>Dirección:  <span>{{dataAuth.address}}</span></p>
      </div>
    </div>
    <div class="text-center">
      <button v-on:click="deleteAccount" class="btn btn-error delete-accont">Eliminar Cuenta</button>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'DetallesCuenta',
  data: function () {
    return {
      dataAuth: JSON.parse(localStorage.getItem('userAuth')) || null
    }
  },
  components: {
    Header,
    Footer
  },
  methods: {
    validateDataUser: async function () {
      if(!this.dataAuth) {
        localStorage.clear();
        this.$router.push('/login');
      }
    }, 
    deleteAccount: function() {
        this.$swal.fire({
          title: '¿Estás seguro de eliminar tú cuenta?',
          text: "!Esta acción no tiene marcha atrás, si aceptas todos tú datos y publicaciones serán eliminados¡",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        }).then( async (result) => {
          if (result.isConfirmed) {
            let endpoint = `https://adoptlife-c3p19g2.herokuapp.com/api/user/delete/${this.dataAuth.user_id}/`;
            let body = {};
            let params = {headers: {}}
            
            try {
              let request = await this.axios.delete(endpoint, body, params);
              if(request.status == 200) {
                this.$swal.fire(
                  'Su cuenta ha sido eliminada',
                  'Si deseas regresar a nuestra página debes crear una cuenta nuevamente',
                  'success'
                );
                localStorage.clear();
                this.$router.push('/login');
              }
            } catch (error) {
              this.$swal.fire({
                icon: 'error',
                title: 'No se pudo eliminar la cuenta',
                text: '¡Ocurrió un error al intentar eliminar la cuenta, envianos una petición en la sección de PQRS para revisar el caso!',
              });
            }
          }
        })
    }
  },
  created: function () {
    this.validateDataUser();
  }
}
</script>

<style>
.detalles-cuenta {
  display: grid;
  gap: 20px;
  margin-bottom: 20px;
  border: 1px solid var(--gray);
  padding: 20px;
  border-radius: 10px;
}

@media (min-width: 768px) {
  .detalles-cuenta {
    grid-template-columns: repeat(2, 1fr);
  }
}

.detalles-cuenta .image {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--gray);
}

.detalles-cuenta .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detalles-cuenta .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.detalles-cuenta .info h2 {
  font-size: 30px;
  margin-top: 0;
}

.detalles-cuenta .info p {
  font-weight: 800;
  font-size: 18px;
  margin-top: 0;
}

.detalles-cuenta .info p span {
  font-weight: 400;
}

.delete-accont {
  margin-bottom: 20px;
}
</style>