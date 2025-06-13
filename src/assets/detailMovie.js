import index from "./index.js"
import { ref } from "vue";
const movie_id = ref([]);
async function director(id) {
    try {
        const res = await index.callAPi(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`)
        const hasil = await res.json();
        const finds = hasil.crew.find(element => element.job == 'Director');
        return finds;
    } catch (error) {
        throw error;
    }
}
async function detailMovies(id) {
    try {
        const response = await index.callAPi(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
async function getTrailler(id) {
    try {
        const response = await index.callAPi(`https://api.themoviedb.org/3/movie/${id}/videos`);
        const result = await response.json();
        const finds = result.results.find(el => el.type == "Trailer");
        return finds
    } catch (error) {
        throw error;
    }
}
export {
    director, detailMovies, movie_id, getTrailler,
}
