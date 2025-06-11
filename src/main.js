import './assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import navbar from './components/navbar.vue';
import footer from './components/footer.vue';
import router from './router/router.js';
import newRelase from './components/newRelase.vue';
import topRated from './components/topRated.vue';
import Cresearch from './components/Cresearch.vue';
import compMovie from './components/compMovie.vue';
import compTvShow from './components/compTvShow.vue';
const app = createApp(App);
app.component('Navbar', navbar);
app.component('Footer', footer);
app.component('new-relase', newRelase);
app.component('top-rateds', topRated);
app.component('Cresearch', Cresearch);
app.component('compMovie', compMovie);
app.component("compTvShow", compTvShow);
app.use(router);
app.mount('#app');
