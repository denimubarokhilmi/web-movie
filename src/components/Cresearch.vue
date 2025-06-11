<template>
  <section class="research container-fluid bg-black p-1">
    <div class="container-md mt-4" v-if="resultMovie.length !== 0">
      <div class="d-flex align-items-center">
        <button
          @click="handleActives"
          class="option-movie active rounded-pill"
          data-option="semua"
        >
          semua
        </button>
        <!-- <button
          @click="handleActives"
          class="option-movie rounded-pill"
          data-option="movie"
        >
          movie
        </button>
        <button
          @click="handleActives"
          class="option-movie rounded-pill"
          data-option="series"
        >
          series
        </button> -->
      </div>
      <div class="researchM row border-top border-secondary mt-3">
        <slot
          name="research"
          v-for="(item, index) in resultMovie"
          :key="item.id - index"
          :title="item.title"
          :rating="item.vote_average.toFixed(1)"
          :genre="item.genre_ids"
          :id="item.id"
          :pathImg="`${
            pathImage +
            `w300/${
              item.poster_path == null ? item.backdrop_path : item.poster_path
            }`
          }`"
        ></slot>
      </div>
    </div>
    <h4 v-else class="text-warning text-center">Please Searching..</h4>
  </section>
</template>
<script setup>
import { inject, onMounted, ref, watch } from "vue";
const movieResearch = inject("searchMovie");
const pathImage = "https://image.tmdb.org/t/p/";
const resultMovie = ref([]);
watch(
  movieResearch,
  (newVal) => {
    resultMovie.value = newVal;
  },
  { immediate: true }
);
const handleActives = (event) => {
  document
    .querySelectorAll(".option-movie")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");
  const option = event.target.dataset.option;
};
</script>
