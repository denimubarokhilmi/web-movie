import { createRouter, createWebHistory } from "vue-router";
import home from "@/views/home.vue";
import research from "@/views/research.vue";
import movieDetail from "@/components/movie-detail.vue";
import movie from "@/views/movie.vue";
import tvShow from "@/views/tvShow.vue";
import TvShowDetail from "@/components/TvShow-detail.vue";
import compExample from "@/components/compExample.vue";
const routes = [
    {
        path: '/', component: home, meta: {
            title: 'MOVIEFlx - Online Movies & TV'
        }
    },
    {
        path: '/research', component: research, meta: {
            title: 'MOVIEFlx - Research Movies'
        }
    },
    {
        path: '/movie-detail', component: movieDetail, meta: {
            title: 'MOVIEFlx - Movie-detail'
        }
    },
    {
        path: '/movie', component: movie, meta: {
            title: 'MovieFlx - Movie'
        }
    },
    {
        path: '/Tv-Show', component: tvShow, meta: {
            title: 'MovieFlx - Tv Show'
        }
    },
    {
        path: '/TvShow-detail', component: TvShowDetail, meta: {
            title: "MovieFLx - TvShow - detail"
        }
    },
    {
        path: '/compExample', component: compExample, meta: {
            title: 'MovieFlx - Example'
        }
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
router.afterEach((to) => {
    const defaultTitle = 'Movflx';
    document.title = to.meta.title || defaultTitle;
});
export default router;
