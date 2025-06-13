<template>
  <section class="container-fluid page-tv-show bg-black p-2">
    <div class="container" v-if="tvSeriesDetail.length != 0">
      <div class="distance"></div>
      <div class="row">
        <div class="col-lg-4 mb-3 text-center">
          <img
            class="img-detail-movie rounded"
            :src="`${
              pathImage +
              `w300/${
                tvSeriesDetail.poster_path == null
                  ? tvSeriesDetail.backdrop_path
                  : tvSeriesDetail.poster_path
              }`
            }`"
            alt="detail"
          />
          <h4 class="text-white mt-3">{{ tvSeriesDetail?.name }}</h4>
        </div>
        <div class="col-lg-8">
          <p class="text-white synopsis">
            <span class="text-white fw-bold">Synopsis : </span
            >{{ tvSeriesDetail?.overview }}
          </p>
          <div class="detail-movie mt-3 text-white">
            <p>
              Negara :
              <span
                v-for="(item, index) in tvSeriesDetail?.origin_country"
                :key="index - 1"
                >{{ item }},</span
              >
            </p>
            <p>
              Sutradara :
              <span
                v-if="directors.length != 0"
                v-for="(item, index) in directors"
                :key="index - 1"
              >
                {{ item?.name }},
              </span>
              <span v-else>Not Found</span>
            </p>
            <p>
              Genre :
              <span v-for="(item, index) in tvSeriesDetail?.genres" :key="index"
                >{{ item?.name }},</span
              >
            </p>
            <p>Rating : {{ tvSeriesDetail?.vote_average.toFixed(1) }}</p>
            <p>Status : {{ tvSeriesDetail?.status }}</p>
            <p>Tanggal rilis : {{ tvSeriesDetail?.first_air_date }}</p>
          </div>
          <!-- Button to Open the Modal -->
          <button
            @click="traillerTv"
            type="button"
            class="rounded trailler mt-3"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
          >
            <i class="bi bi-play-circle"></i>

            Trailler
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
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {
  TvSeries_id,
  directorTV,
  detailTvSeries,
  getTraillerTvSeries,
} from "@/assets/detailTvShow.js";
import { ref, onMounted } from "vue";
const directors = ref("");
const tvSeriesDetail = ref("");
const pathImage = "https://image.tmdb.org/t/p/";
const id = ref("");
id.value = TvSeries_id;
onMounted(() => {
  const page_tv_show = document.querySelector(".page-tv-show");
  page_tv_show.insertAdjacentHTML(
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
      const responseDetailMovies = await detailTvSeries(id.value.value[0]);
      const responseDirector = await directorTV(id.value.value[0]);
      spiner.remove();
      directors.value = responseDirector;
      tvSeriesDetail.value = responseDetailMovies;
      return;
    } catch (error) {
      if (!error.ok) {
        const spiner = document.querySelector(".create-spinner");
        const page_movie_detail = document.querySelector(".page-tv-show");
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
async function traillerTv() {
  const iframe = document.querySelector(".trailler-movie");
  const response = await getTraillerTvSeries(id.value.value[0]);
  iframe.setAttribute("src", `${pathYouTube + response?.key}`);
  return;
}
function closed(event) {
  event.target.nextElementSibling.setAttribute("src", "");
  return;
}
</script>
<style scoped>
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
.trailler {
  padding: 10px 30px;
  background-color: yellow;
}
.trailler:hover {
  background-color: white;
}
.modal-dialog {
  max-width: 928px !important;
}
.distance {
  margin-top: 110px;
}
@media only screen and (max-width: 768px) {
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
  iframe {
    max-width: 100%;
    height: 290px;
  }
}
@media only screen and (max-width: 991px) {
  .distance {
    margin-top: 20px;
  }
}
</style>
