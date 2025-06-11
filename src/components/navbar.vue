<template>
  <!-- start header  -->
  <header class="container-fluid-sm head bg-black sticky-top z-2">
    <nav class="navbar navbar-expand-md">
      <div
        class="container-md d-flex justify-content-between align-items-center w-100"
      >
        <!-- Logo -->
        <div>
          <span class="navbar-text text-white fs-3 logo-text order-1">
            <img src="/img/logo.png" alt="logo" />
          </span>
        </div>
        <div class="search-hidden">
          <button
            class="navbar-toggler order-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#show-input"
            aria-controls="show-input"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div>
              <i class="bi bi-search search-icon icon-show"></i>
            </div>
          </button>
        </div>

        <div
          class="collapse mt-2 navbar-collapse bg-black order-4"
          id="show-input"
        >
          <div class="input-group">
            <span class="input-group-text bg-transparent border-0">
              <i
                @click.prevent="HandleinputByKeyCode"
                class="bi bi-search text-white icon-hidden fs-4"
              ></i>
            </span>
            <input
              v-model="writingInput"
              @keyup.enter.prevent="HandleinputByKeyCode"
              type="text"
              class="form-control bg-black text-white border-0 input-hidden rounded"
              placeholder="Find Favorite Movies"
            />
          </div>
        </div>

        <!-- Search Bar -->
        <div class="search-container ms-3 order-2">
          <input
            @keyup.enter.prevent="HandleinputByKeyCode"
            v-model="writingInput"
            type="text"
            class="search-input"
            placeholder="Find Favorite Moviesss"
          />
          <i
            @click.prevent="HandleinputByKeyCode"
            class="bi bi-search search-icon"
          ></i>
        </div>

        <!-- Navbar Toggle -->
        <button
          class="navbar-toggler order-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div @click="handleIcon" class="change">
            <i class="bi bi-list list text-white fs-1"></i>
          </div>
        </button>

        <!-- Navbar Links -->
        <div class="collapse navbar-collapse bg-black order-4" id="navbarNav">
          <ul class="navbar-nav fs-6 ms-3">
            <li @click="handleNavigation" class="nav-item me-4">
              <router-link class="nav-link text-nav" to="/">Home</router-link>
            </li>
            <li @click="handleNavigation" class="nav-item me-4">
              <router-link class="nav-link text-nav" to="/movie"
                >Movie</router-link
              >
            </li>

            <li @click="handleNavigation" class="nav-item me-4">
              <router-link class="nav-link text-nav" to="Tv-Show"
                >Tv Show</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <!-- end header  -->
</template>
<script setup>
import { ref, provide, computed } from "vue";
import index from "@/assets/index.js";
import { useRouter } from "vue-router";
const router = useRouter();
let writingInput = ref("");

const searchMovies = index.useSearchMovie();

const handleIcon = function (e) {
  if (e.target.classList.contains("list")) {
    e.target.className = "bi bi-x-lg text-white fs-1";
    return;
  }
  if (e.target.classList.contains("bi-x-lg")) {
    e.target.className = "bi bi-list list text-white fs-1";
    return;
  }
};

const HandleinputByKeyCode = async function (event) {
  try {
    const key = event?.code || "submit";
    if (event.code === "Enter" || event.type === "click" || key === "submit") {
      const inputGroup = document.querySelector(".input-group-text");
      inputGroup.insertAdjacentHTML(
        "beforeend",
        `   <span class=" ms-2 create-spinner text-center fs-6">
                <span
                  class="spinner-border spinner-border-sm text-white fs-6"
                ></span>
              </span>`
      );
      const response = await index.callAPi(
        `https://api.themoviedb.org/3/search/movie?query=${writingInput.value.trim()}&include_adult=false&language=en-US&page=1`
      );
      const result = await response.json();
      setTimeout(() => {
        const spiner = document.querySelector(".create-spinner");
        spiner.remove();

        if (searchMovies.value.length !== 0) {
          searchMovies.value.length = 0;
          searchMovies.value.push(...result.results);
          writingInput.value = "";
        }
        searchMovies.value.push(...result.results);
        router.push("/research");
        writingInput.value = "";
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleNavigation = () => {
  const navbarCollapseElement = document.getElementById("navbarNav");
  if (navbarCollapseElement.classList.contains("show")) {
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseElement);
    bsCollapse.hide();
    const navTogglerIcon = document.querySelector(
      ".navbar-toggler .list, .navbar-toggler .bi-x-lg"
    );
    if (navTogglerIcon && navTogglerIcon.classList.contains("bi-x-lg")) {
      navTogglerIcon.className = "bi bi-list list text-white fs-1";
    }
  }
};
</script>
