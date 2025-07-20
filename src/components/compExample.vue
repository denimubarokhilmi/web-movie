<template>
  <section class="container-fluid page-movie-detail bg-black p-2">
    <div class="container movie-details" v-if="moviesDetail.length !== 0">
      <div class="distance"></div>
      <div class="row">
        <div class="col-lg-4 mb-3 text-center">
          <img
            class="img-detail-movie rounded"
            :src="`${
              pathImage +
              `w300/${
                moviesDetail.poster_path == null
                  ? moviesDetail.backdrop_path
                  : moviesDetail.poster_path
              }`
            }`"
            alt="detail"
          />
          <h4 class="text-white mt-3">{{ moviesDetail?.title }}</h4>
        </div>
        <div class="col-lg-8">
          <p class="text-white synopsis">
            <span class="text-white fw-bold">Synopsis: </span
            >{{ moviesDetail?.overview }}
          </p>
          <div class="detail-movie mt-3 text-white">
            <p>
              Negara :
              <span
                v-for="(item, index) in moviesDetail?.origin_country"
                :key="index - 1"
                >{{ item }},</span
              >
            </p>
            <p>Sutradara : {{ directors?.name }}</p>
            <p>
              Genre :
              <span v-for="(item, index) in moviesDetail?.genres" :key="index"
                >{{ item?.name }},</span
              >
            </p>
            <p>Rating : {{ moviesDetail?.vote_average.toFixed(1) }}</p>
            <p>Status : {{ moviesDetail?.status }}</p>
            <p>Tanggal rilis : {{ moviesDetail?.release_date }}</p>
          </div>
          <!-- Button to Open the Modal -->
          <button
            @click="trailler"
            type="button"
            class="rounded btn-trailler mt-3 me-2"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
          >
            <i class="bi bi-play-circle"></i>

            Trailler
          </button>
          <button
            type="button"
            class="rounded bg-danger btn-trailler text-white mt-2"
            data-bs-toggle="modal"
            data-bs-target="#example"
          >
            <i class="bi bi-play-circle"></i>

            Watch Videos
          </button>
          <!-- The Modal -->
          <div class="modal" id="myModal">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content bg-black">
                <!-- Modal Header -->
                <div class="modal-header border-0 d-block">
                  <button
                    @click="closed"
                    class="bi bi-x-lg text-white fs-3 bg-transparent border-0 z-2 shadow"
                    data-bs-dismiss="modal"
                  ></button>
                  <iframe
                    class="shadow rounded trailler-movie"
                    width="900"
                    height="515"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <!--  modal dua  -->
          <div class="modal" id="example">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content bg-black">
                <!-- Modal Header -->
                <div class="modal-header border-0 d-block">
                  <button
                    class="bi bi-x-lg text-white fs-3 bg-transparent border-0 z-2 shadow"
                    data-bs-dismiss="modal"
                  ></button>
                  <iframe
                    class="shadow rounded trailler-movie"
                    width="900"
                    src="https://drive.google.com/file/d/1BM6CDFEoGuo6dTBETT-AU5QdMRHlX4Ki/preview"
                    height="515"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {
  movie_id,
  director,
  detailMovies,
  getTrailler,
} from "@/assets/detailMovie.js";
import { ref, onMounted } from "vue";
const directors = ref("");
const moviesDetail = ref("");
const pathImage = "https://image.tmdb.org/t/p/";
const id = ref("");
id.value = movie_id;
onMounted(() => {
  const page_movie_detail = document.querySelector(".page-movie-detail");
  page_movie_detail.insertAdjacentHTML(
    "afterbegin",
    `<div class="create-spinner text-center mt-2">
      <div class="spinner-border text-warning"></div>
      <p class="text-white">Please wait..</p>
    </div>`
  );
});

setTimeout(() => {
  (async function () {
    try {
      const spiner = document.querySelector(".create-spinner");
      const responseDetailMovies = await detailMovies(id.value.value[0]);
      const responseDirector = await director(id.value.value[0]);
      spiner.remove();
      directors.value = responseDirector;
      moviesDetail.value = responseDetailMovies;
    } catch (error) {
      if (!error.ok) {
        const spiner = document.querySelector(".create-spinner");
        const page_movie_detail = document.querySelector(".page-movie-detail");
        page_movie_detail.insertAdjacentHTML(
          "beforeend",
          `<h4 class="text-warning text-center">Please Serching</h4>`
        );
        spiner.remove();
      }
      return;
    }
  })();
}, 500);

const pathYouTube = `https://www.youtube.com/embed/`;
async function trailler() {
  try {
    const iframe = document.querySelector(".trailler-movie");
    const response = await getTrailler(id.value.value[0]);
    iframe.setAttribute("src", `${pathYouTube + response?.key}`);
    return;
  } catch (error) {
    console.log(error);
  }
}
function closed(event) {
  event.target.nextElementSibling.setAttribute("src", "");
  return;
}
</script>
<style scoped>
video {
  width: 900px;
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}
.img-detail-movie {
  width: 280px;
}
.synopsis {
  font-size: 1.3em;
}
.detail-movie {
  font-size: 1.1em;
}
.btn-trailler {
  border: none !important;
  padding: 10px 30px;
  background-color: yellow;
}
.btn-trailler:hover {
  background-color: white;
}
.modal-dialog {
  max-width: 928px !important;
}
.distance {
  margin-top: 110px;
}
@media only screen and (max-width: 768px) {
  .btn-trailler {
    padding: 6px 20px;
  }
  .distance {
    margin-top: 20px;
  }
  .hero-movie-detail {
    display: none;
  }
  .img-detail-movie {
    width: 200px;
  }
  .synopsis {
    font-size: 1.1em;
  }
  .modal-dialog {
    max-width: 100%;
  }
  iframe,
  video {
    max-width: 100%;
    height: 260px;
  }
}
@media only screen and (max-width: 991px) {
  .distance {
    margin-top: 20px;
  }
}
</style>
