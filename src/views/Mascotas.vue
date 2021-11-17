<template>
  <Header />
  <div class="container all-posts">
    <h2 class="text-center">Encuentra  Mascotas</h2>
    <form action="#" v-on:submit.prevent="filterPosts" class="search-form form-cmp">
      <div class="fields-container">
        <div class="field">
          <label for="pet_name"><em class="fas fa-paw"></em> Nombre Mascota:</label>
          <input v-model="search.name" v-on:input="filterPosts" type="search" name="pet_name" id="pet_name" placeholder="ejm. Sasha">
        </div>
        <div class="field">
          <label for="pet_age"><em class="fas fa-calendar"></em> Edad Mascota:</label>
          <input v-model="search.age" v-on:input="filterPosts" type="number" name="pet_age" id="pet_age" placeholder="ejm. 13 meses ">
        </div>
        <div class="field">
          <label for="pet_gender"><em class="fas fa-venus-mars"></em> Género Mascota:</label>
          <select v-model="search.gender" v-on:change="filterPosts" name="pet_gender" id="pet_gender">
            <option value="">Todos</option>
            <option value="F">Hembra</option>
            <option value="M">Macho</option>
          </select>
        </div>
      </div>
      <div class="text-center">
        <input type="submit" name="search-btn" class="btn btn-primary" id="search-btn" value="Buscar">
      </div>
    </form>
    <div v-if="!search.active">
      <div class="posts-container">
          <div v-for="(post, key) in posts" :key="key">
            <Post v-bind:infoPost=post />
          </div>
      </div>
    </div>
    <div v-if="search.active">
      <div class="posts-container">
          <div v-for="(post, key) in resultSearch" :key="key">
            <Post v-bind:infoPost=post />
          </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Post from '../components/Post.vue';

export default {
  name: 'Mascotas',
  data: function() {
    return {
      posts: [],
      resultSearch: [],
      search: {
        name: '',
        age: '',
        gender: '',
        active: false
      }
    }
  },
  methods: {
    getPosts: async function() {
      const endpoint = 'https://adoptlife-c3p19g2.herokuapp.com/api/posts/';
      const body = {};
      const params = {headers: {}};

      try {
        const request = await this.axios.get(endpoint, body, params);
        this.posts = request.data.reverse();
      } catch(error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'Lo sentimos pero no pudimos obtener el listado de publicaciones.'
        });
      }
    },
    filterPosts: function() {
      let {name, age, gender} = this.search;

      let filter = [...this.posts]
        .filter(post => post.pet_name.includes(name))
        .filter(post => post.pet_age >= age)
        .filter(post => post.pet_gender.includes(gender))
      
      this.resultSearch = filter;

      if(!name && !age && !gender) {
        this.search.active = false;
        return;
      }

      this.search.active = true;
    }
  },
  components: {
    Header,
    Footer,
    Post
  },
  created: function() {
    this.getPosts();
  }
}
</script>

<style scoped>
.all-posts .posts-container {
  margin: 20px 0;
}

.search-form {
  margin: 30px 0;
  padding: 20px;
  border: 2px solid var(--primary);
  border-radius: 10px;
}

.search-form .field select {
  margin-top: 15px;
  display: block;
  padding: 10px;
  border: none;
  border-bottom: 2px solid var(--dark);
  width: 100%;
  outline: none;
}

.search-form .fields-container {
  display: grid;
  gap: 20px;
}

@media (min-width: 768px) {
  .search-form .fields-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>