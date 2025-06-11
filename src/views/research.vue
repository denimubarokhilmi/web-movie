<template>
  <Cresearch>
    <template #research="{ title, rating, pathImg, genre, id }">
      <div class="col-md-12 mt-4">
        <div class="items-research d-flex">
          <img
            :src="`https://image.tmdb.org/t/p/w300/${pathImg}`"
            class="rounded"
            alt="gambar"
          />
          <div class="movie-info ms-3">
            <h4 class="text-white">{{ title }}</h4>
            <div class="info-movies">
              <b>Genre : </b>
              <span v-for="(id, index) in genre" :key="index">{{
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
              <span class="text-white">{{ rating }}</span>
            </div>
            <div class="info-movies mb-3"></div>
            <a
              @click="movieDetail($event, id)"
              class="text-decoration-none fw-bold fs-5 text-danger"
              >Watch Now
              <i class="bi bi-caret-right-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </template>
  </Cresearch>
</template>
<script setup>
import { useRouter } from "vue-router";
import { movie_id } from "@/assets/detailMovie.js";
const router = useRouter();
function movieDetail(event, id) {
  movie_id.value.length = 0;
  movie_id.value.push(id);
  router.push("/movie-detail");
}
</script>

<style scoped>
a:hover {
  cursor: pointer;
}
</style>
