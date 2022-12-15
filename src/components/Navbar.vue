<template>
  <nav class="w-4/5 mx-auto shadow-md rounded-md mt-2 flex items-center justify-between">
    <div class="text-3xl ml-5 italic uppercase ">
      resource-toolkit
    </div>
    <div class="flex items-center justify-center text-gray-600 p-3">
      <router-link class="text-lg mx-6 border-b-2 border-transparent transition-colors hover:border-blue-500 hover:text-black"
          v-for="label in labels" :key="label.name" :to="label.path">
        {{ label.name }}
      </router-link>
    </div>
  </nav>
</template>
<script setup>
  import router from "../router/index.js";
  import {reactive} from "vue";

  const labels=reactive([
    {name:'单文件上传',path:'/upload'},
    {name:'批量上传',path:'/uploadMul'},
    {name:'资源管理',path:'/resourceManagement'},
    {name:'系统架构',path:'/'},
    {name:'登录',path:'/login'}
  ])

</script>