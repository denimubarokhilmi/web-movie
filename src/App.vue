<template>
  <Navbar></Navbar>
  <router-view></router-view>
  <Footer></Footer>
</template>
<script setup>
import { ref, computed, onBeforeMount, provide } from "vue";
import index from "@/assets/index.js";
provide("searchMovie", index.useSearchMovie());
provide("pages", index.totalPages);
</script>
<style></style>
