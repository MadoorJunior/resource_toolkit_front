<template>
  <div class="w-full mx-auto max-w-md bg-white rounded-lg shadow-md p-6 overflow-hidden mt-24">
    <div class="px-6 py-4">
      <h2 class="text-3xl text-gray-600 text-center">身份验证</h2>
    </div>
    <form class="mt-3">
      <div>
        <lable class="block text-xl text-gray-600">用户名</lable>
        <input type="text" class="w-full block px-4 py-2 mt-2 rounded-md border focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
      </div>
      <div class="mt-3">
        <lable class="block text-xl text-gray-600">密码</lable>
        <input type="password" class="w-full block px-4 py-2 mt-2 rounded-md border focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
      </div>
      <div class="my-6 mt-10">
        <button class="w-2/3 mx-auto block text-white text-lg tracking-wider bg-opacity-90 bg-gray-700 rounded-md py-1 transition ease-in-out duration-200 hover:-translate-y-1 hover:scale-105">登 录</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import {notify, useNotification} from "@kyvg/vue3-notification";
const notification = useNotification()

const onSubmit=()=>{
  notification.notify({
    type:'success',
    title:'Authorization',
    text:'jiurrrrr'
  })
}
</script>
