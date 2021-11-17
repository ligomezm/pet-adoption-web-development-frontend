<template>
  <Header/>
  <div class="container">
    <h2 class="text-center">Listado de PQRS</h2>
    <div class="pqrs-container">
      <div v-for="(pqrs, key) in pqrss" :key="key" class="pqrs-item">
        <h3 class="text-center">{{pqrs.title}}</h3>
        <span><em class="fas fa-user"></em> {{ getUserName(pqrs.user_id) }}</span>
        <span><em class="fas fa-calendar"></em> {{pqrs.date ?? "Desconocido"}}</span>
        <p>{{pqrs.comment}}</p>
        <div class="text-center"><em class="fas fa-trash btn btn-error" v-on:click="deletePqrs(pqrs.pqrs_id)"></em></div>
      </div>
    </div>
  </div>
  <Footer />
  
</template>

//-----------------------------------------------------------------------------

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: "Pqrsadmin",
  data: function () {
    return {
      pqrss: [],
      users: []
    };
  },

  methods: {
    listarPqrs: async function(){
        let url = "https://adoptlife-c3p19g2.herokuapp.com/api/pqrss/";
        let body = {};
        let config = {headers: {}};

        try {
          let response = await this.axios.get(url, body, config);
          if(response.status == 200){
            this.pqrss = response.data;
          }
        } catch (error) {
          this.$swal.fire({
            title: "Error",
            text: "No se pudo obtener la lista de PQRS",
            icon: "error"
          });
        }
    },

    deletePqrs: async function(id){
      this.$swal.fire({
        title: '¿Estás seguro de eliminar este PQRS?',
        text: "!Esta acción no tiene marcha atrás, ten cuidado¡",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then( async (result) => {
        if (result.isConfirmed) {
          let url = `https://adoptlife-c3p19g2.herokuapp.com/api/pqrs/${id}`;
          let config = {headers: {}};

          try {
            let response = await this.axios.delete(url, config);
            if(response.status == 204){
              this.$swal.fire({
                title: "PQRS eliminada",
                text: "La PQRS ha sido eliminada correctamente",
                icon: "success"
              });
              
              this.listarPqrs()
            }
          } catch(error){
            this.$swal.fire({
              icon: 'error',
              title: 'Ha ocurrido un error',
              text: 'Tu Pqrs no pudo ser eliminada, intenta más tarde',                
            });
          } 
        }
      })       
    },

    getUsers: async function(){
      let endpoint = "https://adoptlife-c3p19g2.herokuapp.com/api/user/list/";
      let body = {};
      let params = {headers: {}};
      
      try {
        let response = await this.axios.get(endpoint, body, params);
        this.users = response.data;
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'Se ha detectado un problema dentro de nuestra aplicación',
        });
      }
    },

    getUserName: function(id = null){
      if(!id) return "Desconocido";
      
      let user = this.users.find(usr => usr.user_id == id);
      return user.username;
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

  components: {
    Header,
    Footer
  },

  created: async function () {
    await this.validatePermissions();
    await this.getUsers();
    await this.listarPqrs();
  },
};

</script>

//------------------------------------------------------------------------------

<style>

.pqrs-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.pqrs-container h3 {
  margin-top: 0;
}

.pqrs-container span {
  display: block;
  margin-bottom: 10px;
}

.pqrs-container p {
  margin-bottom: 20px;
}

.pqrs-container .pqrs-item {
  border: 1px solid var(--gray);
  background-color: #eeeaea;
  border-radius: 5px;
  padding: 20px;
}

</style>