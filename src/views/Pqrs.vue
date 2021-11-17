<template>
  <Header :blockAccess=true />
  <div class="container">
    <div class="pqrs-page">
      <section class=" text-center encabezado">
        <h1>Peticiones, Quejas, Reclamos y Sugerencias</h1>
        <h2>¿Tienes dudas o sugerencias? Envíanos un mensaje...</h2>
      </section>
      <form class="form-cmp formulario" v-on:submit.prevent = "processPqrsSubmit">
        <div class="field" >
          <label for="asunto"><em class="fas fa-quote-right"> Asunto</em></label>
          <input type="text" v-model="pqrs.title" id="asunto" placeholder="Escribe aqui el asunto de tu pqrs">
        </div>
        <div class="field">
          <label for="mensaje_pqrs"><em class="fas fa-comment-dots"> Mensaje</em></label>
          <textarea id="mensaje_pqrs" v-model = "pqrs.comment" cols="30" rows="10" placeholder="Escribe aqui tu mensaje"></textarea>
        </div>
        <div class="field action">
          <button type="submit" class="btn btn-secondary" id = "enviar-pqrs">Enviar</button>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>

//--------------------------------------------------------------------------

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: "Pqrs",
  data: function () {
    return {
      pqrs: {
        title: "",
        comment: "",  
        date: this.getDate(),
        user_id: localStorage.getItem("userAuth") ? JSON.parse(localStorage.getItem("userAuth")).user_id : null       
      }
    };
  },
  methods: {
    processPqrsSubmit: async function() {
      if(!this.pqrs.title || !this.pqrs.comment) {
        this.$swal({
          title: "Error",
          text: "Debes llenar todos los campos",
          icon: "error"
        });
        return;
      }

      let endpoint = 'https://adoptlife-c3p19g2.herokuapp.com/api/pqrss/';
      let body = this.pqrs;
      let params = {headers: {}};

      try {
        let response = await this.axios.post(endpoint, body, params);
        if(response.status == 201) {
          this.$swal({
            title: "PQRS Creado",
            text: "El PQRS se ha creado correctamente, pronto nos contáctaremos contigo.",
            icon: "success"
          });

          this.$router.push("/");
        }
      } catch (error) {
        this.$swal({
          title: "Se ha producido un error",
          text: "No se pudo crear el PQRS",
          icon: "error"
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
    }

  },
  components: {
    Header,
    Footer
  },
  created: function () {
    this.getDate();
  },
};
</script>

//--------------------------------------------------------------------------

<style>

.pqrs-page {
  max-width: 700px;
  margin: 0 auto 30px auto;
}

.encabezado h1 {
  font-size: 30px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.encabezado h2 {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 600;
}

.formulario {
  margin-top: 30px;
}

.formulario p {
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 5px;    
}



/* text area para el mensaje */
#mensaje_pqrs {
  margin-top: 10px;
  border: 2px solid var(--dark);
  border-radius: 4px;
}

.field.action {
  margin-top: 35px;
  text-align: center;
}

</style>