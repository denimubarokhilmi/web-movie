<template>
  <section class="container-fluid bg-black p-1">
    <div style="margin-bottom: 100px"></div>
    <div class="page-new-relase container-md mt-2">
      <h6 class="text-uppercase streaming text-secondary">Online Streaming</h6>
      <h2 class="section-title">
        <span class="highlight">New Release Movies</span>
      </h2>
      <div
        ref="newRelase"
        class="new-relase d-flex flex-wrap align-items-center justify-content-center mt-5"
      >
        <!-- content in js  -->
        <slot
          name="new-relases"
          v-for="(item, index) in MoreDataMovies"
          :key="item.id"
          :id="item.id"
          :title="item.title"
          :rating="item.vote_average.toFixed(1)"
          :pathImg="`${
            pathImage +
            `w300/${
              item.poster_path == null ? item.backdrop_path : item.poster_path
            }`
          }`"
        ></slot>
      </div>
      <div class="d-flex justify-content-center mt-4 mb-4">
        <button
          @click="BtnMoreMovie"
          type="button"
          class="btn text-center se-more btn-warning"
          data-api="now_playing"
          data-page="2"
        >
          Tampilkan lainnya..
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
import index from "@/assets/index.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const pathImage = "https://image.tmdb.org/t/p/";
const newRelase = ref(null);
const MoreDataMovies = ref([]);
const getMovie = (async () => {
  try {
    const response = await index.callAPi(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${1}`
    );
    const result = await response.json();
    getUI(newRelase, result.results);
  } catch (error) {
    console.log(error);
  }
})();

const getUI = (document, data) => {
  data.forEach((element) => {
    document.value.insertAdjacentHTML("afterbegin", colContent(element));
  });
};

const MoreMovie = async (url, page) => {
  try {
    const response = await index.callAPi(
      `https://api.themoviedb.org/3/movie/${url}?language=en-US&page=${page}`
    );
    const result = await response.json();
    MoreDataMovies.value.push(...result.results);
  } catch (error) {
    console.log(error);
  }
};
const BtnMoreMovie = async (event) => {
  const urlAPI = event.target.dataset.api;
  let pages = Number(event.target.dataset.page);
  event.target.disabled = true;
  event.target.parentElement.previousElementSibling.insertAdjacentHTML(
    "afterend",
    index.createSpinner()
  );

  MoreMovie(urlAPI, pages);

  setTimeout(() => {
    const spiner = document.querySelector(".create-spinner");
    spiner.remove();
    event.target.disabled = false;
  }, 1000);
  event.target.dataset.page = pages + 1;
};
function colContent(element) {
  return `<div class="card card-relase  bg-transparent border border-0  mt-3 ">
        <i class="bi bi-star-fill star"><span class="text-white">${element.vote_average.toFixed(
          1
        )}</span></i>
        <img class="card-img-top d-flex justify-content-center align-items-center image rounded-4"
        src="${
          pathImage +
          `w300/${
            element.poster_path == null
              ? element.backdrop_path
              : element.poster_path
          }`
        }"
        alt="Card image">
                <div class="middle w-100">
                <div class="text-middle">
                <button class="watch-trailler-newRelase btn btn-danger" data-idMovie="${
                  element.id
                }">Watch Trailler</button>
                </div>
                </div>
                <div class="card-body text-center">
                 <a href="#" class="btn">
                 <p class="card-title fs-6">${element.title}</p>
                 </a>
                </div>
    </div>`;
}
import { movie_id } from "@/assets/detailMovie.js";

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("watch-trailler-newRelase")) {
    const id = e.target.dataset.idmovie;
    movie_id.value.length = 0;
    movie_id.value.push(id);
    router.push("/movie-detail");
  }
});
</script>
