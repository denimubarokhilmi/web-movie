const key = import.meta.env.VITE_ApiKeyFromTMDB;
import { ref } from "vue";
const callAPi = (url) => {
    return fetch(url, {
        method: "GET",
        headers: {
            Authorization: key,
            Accept: "application/json",
        },
    });
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