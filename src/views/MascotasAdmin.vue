<template>
  <Header/>
  <div class="container">
    <h2 class="text-center">Listado de Publicaciones</h2>
    <div class="mascotas-container">
      <div v-for="(mascota, key) in mascotas" :key="key" class="mascota-item">
        <div class="image">
          <img v-if="mascota.photo" :src="mascota.photo" alt="Foto mascota">
          <img v-if="!mascota.photo" src="../assets/image-default.png" alt="Imagen defecto">
        </div>
        <div class="content-data">
          <h2 class="text-center mt-0"><em class="fas fa-paw"></em> {{mascota.pet_name}}</h2>

          <div class="text-center">
            <router-link :to="`/mascota/${mascota.post_id}`" class="btn btn-primary mr-20">Ver</router-link>
            <button class="btn btn-error" v-on:click="deletePet(mascota.post_id)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'MascotasAdmin',
  components: {
    Header,
    Footer
  },
  data: function() {
    return {
      mascotas: []
    }
  },
  methods: {
    getMascotas: async function() {
      let endpoint = `https://adoptlife-c3p19g2.herokuapp.com/api/posts/`;
      
      try {
        let response = await this.axios.get(endpoint);
        if (response.status == 200) {
          this.mascotas = response.data;
        }
      } catch (error) {
        this.$swal('Error', 'No se pudo obtener la lista de publicaciones', 'error');
      }
    },
    deletePet: function(id) {
      this.$swal({
        icon: 'warning',
        title: '¿Estás seguro de eliminar esta publicación?',
        text: '¡No podrás revertir esto!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.value) {
          let endpoint = `https://adoptlife-c3p19g2.herokuapp.com/api/post/${id}`;

          try {
            let response = await this.axios.delete(endpoint);
            if (response.status == 204) {
              this.$swal('Eliminado', 'La publicación ha sido eliminada', 'success');
              this.getMascotas();
            }
          } catch (error) {
            console.log(error.request);
            this.$swal('Error', 'No se pudo eliminar la publicación', 'error');
          }
        }
      })
    },
    validatePermissions: function(){
      let role = localStorage.getItem("userAuth") ? JSON.parse(localStorage.getItem("userAuth")).admin : null;
      if(!role) {
        this.$swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'No tienes permisos para acceder a esta página',
        });
        this.$router.push("/");
      }
    }
  },
  created: async function() {
    await this.validatePermissions();
    await this.getMascotas();
  },
}
</script>

<style>
.mt-0 {
  margin-top: 0;
}

.mr-20 {
  margin-right: 20px;
}

.mascotas-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.mascota-item {
  border: 1px solid var(--gray);
  border-radius: 10px;
  overflow: hidden;
}

.mascota-item .image {
  width: 100%;
  height: 200px;
}

.mascota-item .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.mascota-item .content-data {
  padding: 20px;
}
</style>