<template>
  <navbar/>
  <div class="shadow-md py-0 my-10 w-5/6 mx-auto h-screen flex flex-col justify-center">
    <div class="h-3/4"><router-view/></div>
  </div>
  <notifications position="bottom right"/>
</template>


<script setup>

import Login from "./views/Login.vue";
import Navbar from "./components/Navbar.vue";
</script>