import './assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import navbar from './components/navbar.vue';
import footer from './components/footer.vue';
import router from './router/router.js';
import newRelase from './components/newRelase.vue';
import topRated from './components/topRated.vue';
import movieFilter from './components/movieFilter.vue';
import compMovie from './components/compMovie.vue';
import compTvShow from './components/compTvShow.vue';
import TvSeriesFilter from './components/TvSeriesFilter.vue';
import allMovie from './components/allMovie.vue';
const app = createApp(App);
app.component('Navbar', navbar);
app.component('Footer', footer);
app.component('new-relase', newRelase);
app.component('top-rateds', topRated);
app.component('movieFilter', movieFilter);
app.component("TvSeriesFilter", TvSeriesFilter);
app.component('compMovie', compMovie);
app.component("compTvShow", compTvShow);
app.component("allMovie", allMovie);
app.use(router);
app.mount('#app');
