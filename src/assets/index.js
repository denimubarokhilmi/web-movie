import { ref } from "vue";
const callAPi = async (url) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGIxOGM4ZmM5MGI2ZTU3ZGNiMGE4MGZkZTY5OTAzNyIsIm5iZiI6MTc0MTM4OTMyMC45NjUsInN1YiI6IjY3Y2I3ZTA4ZTk0NjFhZGY0MTRmNjc5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VAo_I8JdV5zFde1DAHLZg9yDioXQ5tTPM0ZwFqq6kNE',
                Accept: "application/json",
            },
        });
        if (!response.ok) {
            throw response
        };
        return response;

    } catch (error) {
        throw error;
    }
};
const createSpinner = () => {
    return `<div class="create-spinner text-center mt-2">
    <div class="spinner-border text-warning"></div>
    <p class="text-white">Please wait..</p>
    </div>`
};
let writingInputOld = ref('');
const nextPage = async (page) => {
    try {
        const res = await callAPi(`https://api.themoviedb.org/3/search/multi?query=${writingInputOld.value}&include_adult=false&language=en-US&page=${page}`);
        const result = await res.json();
        return result;
    } catch (error) {
        throw error
    }
};
const resultSearchMovie = ref([]);
const filterMovies = (mediaType, type, page) => {
    const find = mediaType.find(el => el.page == page.value).results.filter(mov => mov.media_type == type);
    return find;
}
let totalPages = ref(0);
const useSearchMovie = () => {
    return resultSearchMovie;
}
export default { callAPi, createSpinner, useSearchMovie, totalPages, writingInputOld, nextPage, filterMovies }
