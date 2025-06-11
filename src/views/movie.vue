<template>
  <div id="carouselFull" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner position-relative top-0">
      <div class="carousel-item active" v-for="(item, index) in slicesMovie" :key="index">
          <img
          :src="`${pathImage}`+item.backdrop_path"
          class="d-block position-relative w-100 carousel-img"
          alt="Slide 1"
          />
         <div class=" bg-black overlays ">adasd</div>
         
        <div class="carousel-caption d-none d-md-block text-start mb-5">
          <h1 class="display-3  fw-bold">{{ item.title }}</h1 class="display-3">
            <button
            @click="trailler($event,item.id)"
            type="button"
            class="rounded trailler mt-3"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
          >
            <i class="bi bi-play-circle"></i>
            Trailler
          </button>
        </div>
      </div>
    </div>

    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselFull"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselFull"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>
  <section id="movies" class="container-fluid bg-black">
    <div class="container">
      <compMovie>
        <template #allMovies="{title,rating,id,pathImg}">
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
            @click="trailler($event,id)"
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
      </compMovie>
    </div>
  </section>
    <div class="scroll-top">
    <a href="#movies">
      <i class="bi z-3 position-relative bi-chevron-up text-secondary"></i>
    </a>
  </div>
</template>

<script setup>
import index from "@/assets/index.js";
import { useRouter } from "vue-router";
import { movie_id } from "@/assets/detailMovie.js";
const router = useRouter();
import { ref } from "vue";
const slicesMovie = ref([]);
const pathAPI = "https://api.themoviedb.org/3/movie/popular";
const pathImage= 'https://image.tmdb.org/t/p/w1280';
(async function () {
  try {
    const response = await index.callAPi(pathAPI);
    const result = await response.json();
  const slices=  result.results.slice(0,3);
  slicesMovie.value = slices;
  } catch (error) {
    console.log(error);
  }
})();

function trailler (event,id) { 
  movie_id.value.length = 0;
  movie_id.value.push(id);
  router.push("/movie-detail");
 }
</script>
<style scoped>
.carousel-inner,
.carousel-item {
  height: 90vh; 
}

.carousel-img {
  height: 100%;
  object-fit: cover;
}
.trailler {
  padding: 10px 30px;
  width: 200px;
  background-color: yellow;
  border:  none;
}
.trailler:hover {
  background-color: white;
}
.overlays{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
}
@media only screen and (max-width: 770px) {
  .carousel{
    display: none;
  }
}
</style>
