<template>
  <div class="page-new-relase container-md p-1">
    <h6 class="text-uppercase streaming text-secondary mt-4">Tv Show</h6>
    <h2 class="section-title">
      <span class="highlight">Tv Series</span>
    </h2>
    <div
      ref="newRelase"
      class="new-relase d-flex flex-wrap align-items-center justify-content-center mt-5"
    >
      <!-- content in js  -->
      <slot
        name="TvShow"
        v-for="(item, index) in MoreDataTvSeries?.results"
        :key="item?.id"
        :id="item?.id"
        :title="item?.title ? item?.title : item?.name"
        :rating="item?.vote_average?.toFixed(1)"
        :pathImg="`${
          pathImage +
          `${item.poster_path == null ? item.backdrop_path : item.poster_path}`
        }`"
      ></slot>
    </div>
    <div class="d-flex justify-content-center mt-4 mb-4">
      <button
        @click="BtnMoreTv"
        type="button"
        class="btn text-center se-more btn-warning"
      >
        Tampilkan lainnya..
      </button>
    </div>
  </div>
</template>
<script setup>
import index from "@/assets/index.js";
import { ref } from "vue";
const pathImage = "https://image.tmdb.org/t/p/w300";
let count = ref(2);
const MoreDataTvSeries = ref([]);
const pathAPI = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`;
(async function () {
  try {
    const response = await index.callAPi(pathAPI);
    const result = await response.json();
    MoreDataTvSeries.value = result;
  } catch (error) {
    console.log(error);
  }
})();
async function BtnMoreTv(ev) {
  ev.target.parentElement.previousElementSibling.insertAdjacentHTML(
    "afterend",
    index.createSpinner()
  );
  ev.target.disabled = true;
  const res = await index.callAPi(
    `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${count.value}`
  );
  const result = await res.json();
  count.value++;
  setTimeout(() => {
    const spiner = document.querySelector(".create-spinner");
    result.results.forEach((element) => {
      MoreDataTvSeries.value.results.push(element);
    });
    spiner.remove();
    ev.target.disabled = false;
  }, 1000);
}
</script>
<style scoped></style>
