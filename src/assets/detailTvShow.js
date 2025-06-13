import index from "./index.js"
import { ref } from "vue";
const TvSeries_id = ref([]);
async function directorTV(id) {
    try {

        const res = await index.callAPi(`https://api.themoviedb.org/3/tv/${id}/credits`)
        const result = await res.json();
        const filter = result.crew.map((el) => el).filter(jobCrew => jobCrew.department == 'Directing');
        return filter;
    } catch (error) {
        throw error
    }
}
async function detailTvSeries(id) {
    try {
        const response = await index.callAPi(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        const result = await response.json();
        return result;

    } catch (error) {
        throw error;
    }
}
async function getTraillerTvSeries(id) {
    try {
        const response = await index.callAPi(`https://api.themoviedb.org/3/tv/${id}/videos`);
        const result = await response.json();
        const finds = result.results.find(el => el.type == "Trailer");
        return finds;

    } catch (error) {
        throw error;
    }
}
export {
    directorTV, detailTvSeries, TvSeries_id, getTraillerTvSeries,
}
