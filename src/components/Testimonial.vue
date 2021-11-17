<template>
  <div class="testimonial-card" v-bind:data-id="dataTestimonial.testimonial_id">
    <h3>{{dataTestimonial.title}}</h3>
    <span>{{dataTestimonial.date}}</span>
    <p>{{dataTestimonial.comment}}</p>
  </div>
</template>

<script>
export default {
  name: 'Testimonial',
  props: {
    dataTestimonial: {
      type: Object,
      default: {
        testimonial_id: 0,
        title: null,
        content: null,
        date: null
      }
    }
  }
}
</script>

<style>
.testimonial-card {
  border: 1px solid var(--gray);
  padding: 15px;
  border-radius: 5px;
  text-align: left;
}

.testimonial-card h3 {
  margin: 10px 0;
  font-size: 25px;
}
</style>