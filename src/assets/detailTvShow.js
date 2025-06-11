import index from "./index.js"
import { ref } from "vue";
const movie_id = ref([]);
async function director(id) {
    const res = await index.callAPi(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`)
    const hasil = await res.json();
    const finds = hasil.crew.find(element => element.job == 'Director');
    return finds;
}
async function detailMovies(id) {
    const response = await index.callAPi(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
    const result = await response.json();
    return result;
}
async function getTrailler(id) {
    const response = await index.callAPi(`https://api.themoviedb.org/3/tv/${id}/videos`);
    const result = await response.json();
    const finds = result.results.find(el => el.site == "YouTube");
    return finds;
}
export {
    director, detailMovies, movie_id, getTrailler,
}