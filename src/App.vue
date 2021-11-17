<template>
  <router-view/>
</template>

<script>
export default {
  
}
</script>

<style>
:root {
  --dark: #010e14;
  --primary: #00455b;
  --primary-light: #0195c7;
  --secondary: #12623d;
  --secondary-light: #21b872;
  --gray: #979696;
  --white: #ffffff;
  --crimson: #dc143c;
  --crimson-light: #d36e82;
}

* {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  font-family: "Montserrat", "Helvetica", sans-serif;
}

img {
  max-width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}

.text-center {
  text-align: center;
}

.btn {
  padding: 10px 30px;
  border: none;
  color: var(--white);
  font-weight: bold;
  border-radius: 8px;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background-color: var(--primary);
  border: 2px solid var(--primary);
  transition: all .5s ease;
}

.btn-primary:hover {
  cursor: pointer;
  color: var(--primary-light);
  background-color: var(--white);
}

.btn-secondary {
  background-color: var(--secondary);
  border: 2px solid var(--secondary);
  transition: all .5s ease;
}

.btn-secondary:hover {
  cursor: pointer;
  color: var(--secondary-light);
  background-color: var(--white);
}

.btn-error {
  border: 2px solid var(--crimson);
  background-color: var(--crimson);
  transition: all .5s ease;
}

.btn-error:hover {
  cursor: pointer;
  color: var(--crimson);
  background-color: var(--white);
}

.form-cmp .field {
  margin-bottom: 35px;
  width: 100%;
}

.form-cmp .field label {
  font-size: 20px;
  font-weight: bold;
}

.form-cmp .field label em {
  margin-right: 5px;
}

.form-cmp .field input:not([type="submit"]),
.form-cmp .field textarea {
  display: block; 
  margin-top: 15px;
  border: none;
  border-bottom: 2px solid var(--dark);
  font-size: 18px;
  width: 100%;
  padding: 10px;
  outline: none;
}

.posts-container {
  display: grid;
  gap: 30px;
}

.testimonials-container {
  display: grid;
  gap: 30px;
}

@media (min-width: 600px) {
  .posts-container,
  .testimonials-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 950px) {
  .posts-container,
  .testimonials-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
