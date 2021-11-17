<template>
  <footer class="footer-app container">
    <div class=" footer-container">
      <div class="logo">
        <img src="../assets/icono.svg" alt="Logotipo AdoptLife">
      </div>
      <div class="first-section">
        <router-link class="link" to="/mascotas">Mascotas</router-link>
        <router-link class="link" to="/nosotros">Nosotros</router-link>
        <router-link class="link" to="/publicar">Publicar</router-link>
      </div>
      <div class="second-section">
        <router-link class="link" to="/testimoniales">Testimoniales</router-link>
        <router-link class="link" to="/impacto-social">Impacto Social</router-link>
        <router-link class="link" to="/politicas">Políticas, términos y condiciones</router-link>
        <router-link class="link" to="/pqrs">Pqrs</router-link>
      </div>
      <div class="contact-section">
        <span>Siguenos:</span>
        <div class="icons">
          <em class="fab fa-facebook"></em>
          <em class="fab fa-instagram"></em>
          <em class="fab fa-telegram-plane"></em>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
.footer-app {
  padding: 20px 10px;
  border-top: 2px solid var(--gray);
  text-align: center;
}

.footer-app .logo img {
  width: 100px;
  margin-bottom: 20px;
  filter: invert(1);
}

.first-section,
.second-section,
.contact-section {
  display: flex;
  flex-direction: column;
}

.first-section *,
.second-section *,
.contact-section * {
  margin-bottom: 10px;
  text-decoration: none;
  color: var(--dark);
  font-weight: 600;
  font-size: 16px;
  transition: all .5s ease;
}

.first-section .link:hover,
.second-section .link:hover {
  color: var(--primary-light);
}

.contact-section .icons {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  justify-content: center;
  gap: 15px;
}

.contact-section .icons em {
  font-size: 30px;
  color: var(--primary);
}

@media (min-width: 500px) {
  .footer-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    gap: 10px;
  }
}

@media (min-width: 700px) {
  .footer-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
  }
}
</style>