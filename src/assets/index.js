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
const resultSearchMovie = ref([]);

const useSearchMovie = () => {
    return resultSearchMovie;
}
export default { callAPi, createSpinner, useSearchMovie, }
