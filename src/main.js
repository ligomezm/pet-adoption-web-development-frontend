import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importaciones para usar SweetAlert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Importaciones para usar Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
    .use(VueSweetalert2)
    .use(VueAxios, axios)
    .use(router).mount('#app');