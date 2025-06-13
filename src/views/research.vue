<template>
  <section class="research container-fluid bg-black p-1">
    <div class="container-lg mt-4" v-if="resultMovie.length !== 0">
      <div class="d-flex align-items-center">
        <button
          @click="handleActives"
          class="option-movie active rounded-pill"
          data-option="semua"
        >
          semua
        </button>
        <button
          @click="handleActives"
          class="option-movie rounded-pill"
          data-option="movie"
        >
          Movie
        </button>
        <button
          @click="handleActives"
          class="option-movie rounded-pill"
          data-option="tv"
        >
          Tv Series
        </button>
      </div>
      <div class="researchM row border-top border-secondary mt-3">
        <component :is="isComponent" v-if="isComponent"></component>
        <div
          v-if="resultMovie[0]?.results"
          class="col-md-12 mt-4"
          v-for="(item, index) in resultMovie[0]?.results"
          :key="index - 1"
        >
          <div class="items-research d-flex">
            <img
              :src="`https://image.tmdb.org/t/p/w300/${
                item.poster_path ? item.poster_path : item.backdrop_path
              }`"
              class="rounded"
              alt="gambar"
            />
            <div class="movie-info ms-3">
              <h5 class="text-white">
                {{ item.title ? item.title : item.name }}
              </h5>
              <div class="info-movies">
                <b>Genre : </b>
                <span v-for="(id, index) in item.genre_ids" :key="index - 1">{{
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
                  Math.floor(item.vote_average * 10) / 10
                }}</span>
              </div>
              <div class="info-movies mb-3"></div>
              <a
                @click="movieDetail($event, item.id, item.media_type)"
                class="text-decoration-none fw-bold fs-5 text-danger"
                >Watch Now
                <i class="bi bi-caret-right-fill"></i>
              </a>
            </div>
          </div>
        </div>
        <ul class="pagination justify-content-center mt-5 flex-wrap">
          <li class="page-item">
            <a
              class="page-link bg-transparent text-white"
              href="#"
              @click.prevent="goToPage(currentPage - 1)"
              :class="{ disabled: currentPage === 1 }"
            >
              <i class="bi bi-chevron-double-left"></i>
            </a>
          </li>

          <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
          >
            <a
              class="page-link"
              href="#"
              :class="{
                active: currentPage === page,
                'text-white': currentPage !== page,
                'bg-transparent': currentPage !== page,
              }"
              @click.prevent="goToPage(page)"
            >
              {{ page }}
            </a>
          </li>

          <li class="page-item">
            <a
              class="page-link bg-transparent text-white"
              href="#"
              @click.prevent="goToPage(currentPage + 1)"
              :class="{ disabled: currentPage === totalPages }"
            >
              <i class="bi bi-chevron-double-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="text-center text-warning">
      <p>movie not found!</p>
      <h4 class="text-warning text-center">Please Searching..</h4>
    </div>
  </section>
</template>
<script setup>
import { inject, onMounted, ref, watch, computed, provide } from "vue";
import index from "@/assets/index.js";
import { useRouter } from "vue-router";
import { movie_id } from "@/assets/detailMovie.js";
import { TvSeries_id } from "@/assets/detailTvShow.js";
const movieResearch = inject("searchMovie");
const pagesIndex = inject("pages");
const optionss = ref("");
const currentPage = ref(1);
let resultMovie = ref("");
provide("providePage", currentPage);
let totalPages = 0;
let isComponent = computed(() => {
  return optionss.value == "movie"
    ? "movieFilter"
    : optionss.value == "tv"
    ? "TvSeriesFilter"
    : "";
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

watch(
  movieResearch,
  (newVal) => {
    const filters = newVal
      .map((el) => el)
      .filter((mov) => mov.page == currentPage.value);
    resultMovie.value = filters;
  },
  { immediate: true }
);
watch(
  pagesIndex,
  (newPages) => {
    currentPage.value = 1;
    totalPages = newPages;
  },
  { immediate: true }
);
const handleActives = (event) => {
  document
    .querySelectorAll(".option-movie")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");
  const option = event.target.dataset.option;
  optionss.value = option;
  const result = index.filterMovies(movieResearch.value, option, currentPage);
  if (result.length == 0) {
    const find = movieResearch.value.find((el) => el.page == currentPage.value);
    resultMovie.value = [find];
    return;
  }
  resultMovie.value = result;
  return;
};
const goToPage = async (page) => {
  try {
    if (page < 1 || page > totalPages) return;
    currentPage.value = page;
    const findsPage = movieResearch.value.find((el) => el.page == page);
    if (findsPage) {
      resultMovie.value = [findsPage];
      return;
    } else {
      const res = await index.nextPage(currentPage.value);
      const oldData = [...movieResearch.value];
      const isPages = oldData.some((el) => el.page == res.page);
      if (isPages) {
        movieResearch.value = [...oldData];
        const filterPages = movieResearch.value.filter((el) => el.page == page);
        resultMovie.value = filterPages;
        return;
      } else {
        movieResearch.value = [...oldData, res];
        const filterPages = movieResearch.value.filter((el) => el.page == page);
        resultMovie.value = filterPages;
        return;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<style scoped>
.page-link:focus {
  background-color: yellow;
  color: black;
  outline: none;
  box-shadow: none;
}

.page-link.active {
  background-color: yellow;
  color: black;
}
a:hover {
  cursor: pointer;
}
</style>
