<template>
  <div
    v-if="isMovie.length !== 0"
    class="tv-filter row border-top border-secondary mt-3"
  >
    <div
      class="col-md-12 mt-4"
      v-for="(item, index) in isMovie"
      :key="index - 1"
    >
      <div class="items-research d-flex">
        <img
          :src="`https://image.tmdb.org/t/p/w300/${
            item?.poster_path ? item?.poster_path : item?.backdrop_path
          }`"
          class="rounded"
          alt="gambar"
        />
        <div class="movie-info ms-3">
          <h5 class="text-white title-research">
            {{ item?.title ? item?.title : item?.name }}
          </h5>
          <div class="info-movies">
            <b>Genre : </b>
            <span v-for="(id, index) in item?.genre_ids" :key="index - 1">{{
              id == 28
                ? "Action "
                : id == 12
                ? "Adventur "
                : id == 16
                ? "Animation "
                : id == 35
                ? "Comedy "
                : id == 80
                ? "Crime "
                : id == 99
                ? "Documentary "
                : id == 18
                ? "Drama "
                : id == 10751
                ? "Family "
                : id == 14
                ? "Fantasy "
                : id == 36
                ? "History "
                : id == 27
                ? "Horor "
                : id == 10402
                ? "Music "
                : id == 9648
                ? "Mystery "
                : id == 10749
                ? "Romance "
                : id == 878
                ? "Science Fiction "
                : id == 10770
                ? "TV Movie "
                : id == 53
                ? "Thriller "
                : id == 10752
                ? "War "
                : id == 37
                ? "Western "
                : ""
            }}</span>
          </div>
          <div class="info-movies">
            <b>Rating : </b>
            <span class="text-white">{{
              Math.floor(item?.vote_average * 10) / 10
            }}</span>
          </div>
          <div class="info-movies mb-3"></div>
          <a
            @click="movieDetail($event, item?.id, item?.media_type)"
            class="text-decoration-none fw-bold fs-6 text-danger"
            >Watch Now
            <i class="bi bi-caret-right-fill"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-warning mt-2 fs-5 text-center">
    Genre Drama not found
  </div>
</template>
<script setup>
import { ref, computed, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import { movie_id } from "@/assets/detailMovie.js";
import { TvSeries_id } from "@/assets/detailTvShow.js";
const movieResearch = inject("searchMovie");
const providePage = inject("providePage");
const page = ref(0);
page.value = providePage;

onMounted(() => {
  const page_movie_detail = document.querySelector(".tv-filter");
  if (page_movie_detail) {
    page_movie_detail.insertAdjacentHTML(
      "afterbegin",
      `<div class="create-spinner text-center mt-2  mb-2">
      <div class="spinner-border text-warning"></div>
      <p class="text-white">Please wait..</p>
    </div>`
    );
    setTimeout(() => {
      const spiner = document.querySelector(".create-spinner");
      spiner.remove();
    }, 500);
    return;
  }
});

const isMovie = computed(() => {
  return movieResearch.value
    .find((el) => el.page == page.value.value)
    .results.filter((mov) => mov.genre_ids.some((ids) => ids == 18));
});
const router = useRouter();
function movieDetail(event, id, type) {
  TvSeries_id.value.length = 0;
  movie_id.value.length = 0;
  if (type == "movie") {
    movie_id.value.push(id);
    router.push("/movie-detail");
  } else {
    TvSeries_id.value.push(id);
    router.push("/TvShow-detail");
  }
}
</script>
<style scoped>
a:hover {
  cursor: pointer;
}
@media only screen and (max-width: 768px) {
  .title-research {
    font-size: 0.9em;
  }
  .info-movies {
    font-size: 0.8em;
  }
}
</style>
