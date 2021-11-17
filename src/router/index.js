import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Inicio',
    // route level code-splitting
    // this generates a separate chunk (inicio.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "inicio" */ '../views/Inicio.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/publicar',
    name: 'Publicar',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "publicar" */ '../views/Publicar.vue')
  },  
  {
    path: '/registro',
    name: 'Registro',
    // route level code-splitting
    // this generates a separate chunk (registro.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "registro" */ '../views/Registro.vue')
  },
  {
    path: '/testimoniales',
    name: 'Testimoniales',
    // route level code-splitting
    // this generates a separate chunk (testimoniales.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "testimoniales" */ '../views/Testimoniales.vue')
  },
  {
    path: '/contacto',
    name: 'Contacto',
    // route level code-splitting
    // this generates a separate chunk (contacto.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "contacto" */ '../views/Contacto.vue')
  },
  {
    path: '/nosotros',
    name: 'Nosotros',
    // route level code-splitting
    // this generates a separate chunk (nosotros.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "nosotros" */ '../views/Nosotros.vue')
  },
  {
    path: '/impacto-social',
    name: 'ImpactoSocial',
    // route level code-splitting
    // this generates a separate chunk (impacto.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "impacto" */ '../views/ImpactoSocial.vue')
  },
  {
    path: '/politicas',
    name: 'Politicas',
    // route level code-splitting
    // this generates a separate chunk (politicas.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "politicas" */ '../views/Politicas.vue')
  },
  {
    path: '/pqrs',
    name: 'Pqrs',
    // route level code-splitting
    // this generates a separate chunk (pqrs.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "pqrs" */ '../views/Pqrs.vue')
  },
  {
    path: '/pqrs/admin',
    name: 'Pqrsadmin',
    // route level code-splitting
    // this generates a separate chunk (pqrsadmin.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "pqrsadmin" */ '../views/PqrsAdmin.vue')
  },
  {
    path: '/mascotas',
    name: 'Macotas',
    // route level code-splitting
    // this generates a separate chunk (mascotas.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "mascotas" */ '../views/Mascotas.vue')
  },
  {
    path: '/mascota/:post_id',
    name: 'DetalleMascota',
    // route level code-splitting
    // this generates a separate chunk (detalles-mascota.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "detalles-mascota" */ '../views/DetallesMascota.vue')
  },
  {
    path: '/cuenta/detalles',
    name: 'DetallesCuenta',
    // route level code-splitting
    // this generates a separate chunk (detalles-cuenta.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "detalles-cuenta" */ '../views/DetallesCuenta.vue')
  },
  {
    path: '/adopcion/detalles',
    name: 'DetallesAdopcion',
    // route level code-splitting
    // this generates a separate chunk (detalles-adopcion.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "detalles-adopcion" */ '../views/DetallesAdopcion.vue')
  },
  {
    path: '/mascotas/admin',
    name: 'MascotasAdmin',
    // route level code-splitting
    // this generates a separate chunk (mascotasadmin.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(  /* webpackChunkName: "mascotasadmin" */ '../views/MascotasAdmin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
