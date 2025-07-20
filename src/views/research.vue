<template>
  <section class="research container-fluid bg-black p-1">
    <div class="container mt-4" v-show="resultMovie.length !== 0">
      <div class="horizontal-scroll">
        <div ref="filterOption" class="d-flex align-items-center">
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
            TvSeries
          </button>
          <button
            @click="handleActives"
            class="option-movie rounded-pill"
            data-option="Action"
          >
            Action
          </button>
          <button
            @click="handleActives"
            class="option-movie rounded-pill"
            data-option="Documentary"
          >
            Documentary
          </button>
          <button
            @click="handleActives"
            class="option-movie rounded-pill"
            data-option="Adventure"
          >
            Adventure
          </button>

          <button
            @click="handleActives"
            class="option-movie rounded-pill"
            data-option="Horor"
          >
            Horor
          </button>
          <button
            @click="handleActives"
            class="option-movie rounded-pill"
            data-option="Romance"
          >
            Romance
          </button>
          <button
            @click="handleActives"
            class="option-movie rounded-pill"
            data-option="Thriller"
          >
            Thriller
          </button>
          <button
            @click="handleActives"
            class="option-movie rounded-pill"
            data-option="Drama"
          >
            Drama
          </button>
          <button
            @click="handleActives"
            class="option-movie rounded-pill"
            data-option="Comedy"
          >
            Comedy
          </button>
          <button
            @click="handleActives"
            class="option-movie rounded-pill"
            data-option="Animation"
          >
            Animation
          </button>
        </div>
      </div>
      <component :is="isComponent" v-if="isComponent"></component>

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
    <div v-show="resultMovie.length == 0" class="text-center text-warning">
      <p>Not Found!</p>
      <h5 class="text-warning text-center">Please Searching..</h5>
    </div>
  </section>
</template>
<script setup>
import { inject, ref, watch, computed, provide } from "vue";
import index from "@/assets/index.js";

const movieResearch = inject("searchMovie");
const pagesIndex = inject("pages");
const optionss = ref("semua");
const currentPage = ref(1);
let resultMovie = ref("");
const filterOption = ref(null);
provide("providePage", currentPage);
let totalPages = 0;

let isComponent = computed(() => {
  return optionss.value == "movie"
    ? "movieFilter"
    : optionss.value == "tv"
    ? "TvSeriesFilter"
    : optionss.value == "semua"
    ? "allMovie"
    : optionss.value == "Action"
    ? "actionFilter"
    : optionss.value == "Documentary"
    ? "documentaryFilter"
    : optionss.value == "Adventure"
    ? "adventureFilter"
    : optionss.value == "Horor"
    ? "hororFilter"
    : optionss.value == "Romance"
    ? "romanceFilter"
    : optionss.value == "Thriller"
    ? "thrillerFilter"
    : optionss.value == "Drama"
    ? "dramaFilter"
    : optionss.value == "Comedy"
    ? "comedyFilter"
    : optionss.value == "Animation"
    ? "animationFilter"
    : "";
});
watch(
  movieResearch,
  (newVal) => {
    resultMovie.value = newVal;
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
const handleActives = async (event) => {
  document
    .querySelectorAll(".option-movie")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");
  const option = event.target.dataset.option;
  optionss.value = option;
};
const goToPage = async (page) => {
  try {
    filterOption.value.insertAdjacentHTML("afterend", index.createSpinner());
    const spinner = document.querySelector(".create-spinner");
    if (page < 1 || page > totalPages) return;
    currentPage.value = page;
    const findsPage = movieResearch.value.find((el) => el.page == page);
    if (findsPage) {
      setTimeout(() => spinner.remove(), 500);
      return;
    } else {
      const res = await index.nextPage(currentPage.value);
      const oldData = [...movieResearch.value];
      movieResearch.value = [...oldData, res];
      setTimeout(() => spinner.remove(), 500);
      return;
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
.horizontal-scroll {
  width: 100%;
  overflow-x: scroll;
  scrollbar-color: transparent transparent;
}
.horizontal-scroll::-webkit-scrollbar {
  display: none;
}
.option-movie {
  background-color: transparent;
  color: white;
  padding: 4px 11px;
  width: 400px;
  border: 1px solid grey;
  margin: 0 7px 0 0;
}
.option-movie:focus {
  background-color: yellow;
  color: black;
}
.option-movie.active {
  background-color: yellow;
  color: black;
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
