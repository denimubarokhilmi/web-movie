<template>
  <!-- hero  -->
  <section class="hero" id="hero">
    <div class="hero-overlay"></div>
    <div class="container position-relative z-1">
      <div class="row align-items-center">
        <!-- Left Side -->
        <div class="col-md-6">
          <h4 class="text-warning fw-bold fs-1">Movflx</h4>
          <h1 class="fw-bold display-4">
            Unlimited
            <span class="text-decoration-underline text-warning">Movie</span>,
            TV Shows, & More.
          </h1>
          <div class="movie-info mt-3">
            <span class="badge-custom me-1">PG 18</span>
            <span class="badge-custom m-1">HD</span>
            <span class="m-1">Romance, Drama</span>
            <span><i class="bi bi-calendar3"></i> 2021</span>
            <span><i class="bi bi-clock"></i> 120 min</span>
          </div>
          <a @click="movieDetail($event, 961268)" class="watch-btn mb-3">
            <i class="bi bi-play-circle"></i> WATCH NOW
          </a>
        </div>

        <div class="col-md-6 text-center">
          <img
            src="https://www.tintahijau.com/wp-content/uploads/2023/10/Balerina-di-Netflix.jpg"
            class="hero-image"
            alt="Movie Image"
          />
        </div>
      </div>
    </div>
  </section>
  <!-- end hero  -->

  <new-relase>
    <template #new-relases="{ title, rating, pathImg, id }">
      <div class="card card-relase bg-transparent border border-0 mt-3">
        <i class="bi bi-star-fill star"
          ><span class="text-white">{{ rating }}</span></i
        >
        <img
          class="card-img-top d-flex justify-content-center align-items-center image rounded-4"
          :src="pathImg"
          alt="Card image"
        />
        <div class="middle w-100">
          <div class="text-middle">
            <!-- <button class="watch-movie btn btn-danger mb-3">
              Watch Movieee
            </button> -->
            <button
              class="watch-trailler-newRelase btn btn-danger"
              :data-idMovie="id"
            >
              Watch Trailler
            </button>
          </div>
        </div>
        <div class="card-body text-center">
          <a href="#" class="btn">
            <p class="card-title fs-6">{{ title }}</p>
          </a>
        </div>
      </div>
    </template>
  </new-relase>

  <top-rateds>
    <template #top-rated="{ title, rating, pathImg, id }">
      <div class="card card-relase bg-transparent border border-0 mt-3">
        <i class="bi bi-star-fill star"
          ><span class="text-white">{{ rating }}</span></i
        >
        <img
          class="card-img-top d-flex justify-content-center align-items-center image rounded-4"
          :src="pathImg"
          alt="Card image"
        />
        <div class="middle w-100">
          <div class="text-middle">
            <!-- <button class="watch-movie btn btn-danger mb-3">Watch Movie</button> -->
            <button
              class="watch-trailler-topRated btn btn-danger"
              :data-idMovie="id"
            >
              Watch Trailler
            </button>
          </div>
        </div>
        <div class="card-body text-center">
          <a href="#" class="btn">
            <p class="card-title fs-6">{{ title }}</p>
          </a>
        </div>
      </div>
    </template>
  </top-rateds>
  <!-- Scroll to Top -->
  <div class="scroll-top">
    <a href="#hero">
      <i class="bi z-3 position-relative bi-chevron-up text-secondary"></i>
    </a>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
import { movie_id } from "@/assets/detailMovie.js";
function movieDetail(event, id) {
  movie_id.value.length = 0;
  movie_id.value.push(id);
  router.push("/compExample");
}
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("watch-trailler-newRelase")) {
    const id = e.target.dataset.idmovie;
    movie_id.value.length = 0;
    movie_id.value.push(id);
    router.push("/movie-detail");
    return;
  }
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("watch-trailler-topRated")) {
    const id = e.target.dataset.idmovie;
    movie_id.value.length = 0;
    movie_id.value.push(id);
    router.push("/movie-detail");
    return;
  }
});
</script>
