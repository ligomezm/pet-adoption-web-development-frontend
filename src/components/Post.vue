<template>
  <div class="post-card">
    <div class="image-card">
        <img v-if="infoPost.photo" :src="infoPost.photo" alt="Imagen publicación">
        <img v-if="!infoPost.photo" src="../assets/image-default.png" alt="Imagen defecto">
    </div>
    <div class="content-card">
        <h3>{{infoPost.pet_name}}</h3>
        
        <p v-if="infoPost.pet_gender == 'F'">Hembra - {{infoPost.pet_age}} Meses</p>
        <p v-if="infoPost.pet_gender == 'M'">Macho - {{infoPost.pet_age}} Meses</p>

        <p>{{infoPost.pet_city}}</p>

        <router-link class="btn btn-primary" v-bind:to="'/mascota/'+infoPost.post_id">Ver Publicación</router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Post',
    props: {
        infoPost: {
            type: Object,
            default: {
                post_id: 0,
                pet_gender: 'U',
                pet_name: 'Unknown',
                pet_age: 0,
                pet_city: 'Unknown',
                photo: null
            }
        }
    }
}
</script>

<style>
.post-card {
    border: 1px solid var(--gray);
    box-shadow: 2px 1px 5px var(--gray);
    border-radius: 5px;
    overflow: hidden;
}

.post-card .image-card img {
    height: 250px;
    width: 100%;
    object-fit: cover;
    
}

.post-card .image-card {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.post-card .content-card {
    text-align: center;
    padding: 20px 10px;
}

.post-card .content-card h3 {
    margin: 0;
    font-size: 30px;
}

.post-card .content-card .btn {
    margin-top: 25px;
}
</style>