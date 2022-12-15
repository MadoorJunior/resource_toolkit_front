<template>
  <div class="inline-block flex justify-around mb-5">
    <div class="bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base mb-3 shadow-md" role="alert">
      本次累计上传成功:{{success}}
    </div>
  </div>
  <div class=" float-left absolute left-60 ">
    <div class="flex space-x-2 justify-center mb-5">
      <button type="button" class="inline-block px-6 py-2.5 text-base leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded">
        上传失败:
        <span class="inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded ml-2">{{ failed }}</span>
      </button>
    </div>
    <ul class="w-56 overflow-hidden rounded-b-lg shadow-md">
      <li v-for="i in failedFiles" class="border-b-2 px-3 py-2 truncate text-sm">
        {{i}}
      </li>
    </ul>
  </div>
  <div class="container flex justify-center w-3/4 mx-auto ">
    <div class="w-3/4">
      <div class="flex justify-center ">
        <div class="my-2 xl:w-96">
          <select v-model="params.type"
                  class="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0 " :disabled="isDisabled"
                  aria-label="Default select example">
            <option selected disabled>选择资源类型</option>
            <option v-for="type in types" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex justify-center ">
        <div class="my-2 xl:w-96">
          <select v-model="params.section"
                  class="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0 " :disabled="isDisabled" aria-label="Default select example">
            <option selected disabled>选择学段</option>
            <option v-for="s in sections" :value="s">
              {{ s }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex justify-center ">
        <div class="my-2 xl:w-96">
          <select v-model="params.subject"
                  class="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0 " :disabled="isDisabled" aria-label="Default select example">
            <option selected disabled>选择科目</option>
            <option v-for="s in subjects" :value="s">
              {{ s }}
            </option>
          </select>
        </div>
      </div>
      <div class="relative pt-1 w-3/4 mx-auto">
        <div class="flex space-x-2 justify-center">
          <h2 class="text-xl font-medium leading-tight text-gray-800">
            允许并发量
            <span class="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-400 text-white rounded">{{batchSize}}</span>
          </h2>
        </div>
        <input
            type="range"
            class="
      form-range
      appearance-none
      w-full
      h-6
      p-0
      bg-transparent
      focus:outline-none focus:ring-0 focus:shadow-none
    "
            :disabled="isDisabled"
            v-model="batchSize"
            min="1"
            max="10"
            step="1"
            id="customRange3"
        />
      </div>
      <div class="flex justify-center mt-10">
        <div class="mb-3 w-96">
          <input @change="getFile" class="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" :disabled="isDisabled" ref="fileForm" type="file" id="formFile" multiple>
          <div class="ml-4 mt-1 text-sm text-gray-300 font">支持类型:doc，docx，ppt，pptx，pdf，mp4</div>
        </div>
      </div>
      <div class="w-full bg-gray-200 rounded-full mt-12">
        <div class="bg-blue-100 text-xs font-medium text-center p-0.5 leading-none rounded-l-full shadow-sm" :style="{width:percent+'%'}">
          {{ percent }}%</div>
      </div>
      <div class="my-6 mt-10">
        <button @click="run" :disabled="isDisabled" class="mx-auto p-7 block text-white text-md tracking-wider bg-opacity-90 bg-gray-700 rounded-md py-1 transition ease-in-out duration-200 hover:-translate-y-1 hover:scale-105">
          {{isDisabled?'上传中，请勿重复操作':'上传'}}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed, reactive, ref} from "vue";
import {uploadResource} from "../api/index.js";
import {notify, useNotification} from "@kyvg/vue3-notification";
const notification = useNotification()
const types = ref([
  '媒体素材', '试题', '试卷', '课件', '文献资料', '教学案例', '常见问题解答', '课本素材', '网络课程'
]);
const sections = ref(['小学', '初中', '高中']);
const subjects = ref(['品德与生活（社会）', '政治', '语文', '数学', '科学', '物理', '化学', '生物', '历史与社会', '地理', '历史', '体育与健康', '艺术', '音乐', '美术', '信息技术', '通用技术', '外语', '英语', '日语', '俄语', '其他外国语', '综合实践活动', '信息技术', '劳动与技术']);
let alreadyUpload=ref(0)
let percent=ref(0)
let success=ref(0)
let failed=ref(0)
let isDisabled=ref(false)
let batchSize =ref(2)
let failedFiles=reactive([])
const params=reactive({
  type:'',subject:'',section:''
})
let files = null
const fileForm=ref(null)
const getFile=(e)=>{
  files = Array.from(e.target.files)//拿到上传的file
  alreadyUpload.value=0
  percent.value=0
}
const upload=()=>{
  files=Array.from(document.getElementById('formFile').files)
  if (files==null||params.type===''||params.subject===''||params.section===''){
    notification.notify({
      type:'warn',
      title:'资源信息缺漏',
      text:'正确选择后再上传'
    })
    return
  }
  isDisabled.value=true
  alreadyUpload.value=0
  percent.value=0
  const len=files.length
  console.log(len)
  while (files.length){
    for (let i=0;i<batchSize.value;i++){
      let fileItem=files.pop()
      if (fileItem===undefined)
        break
      let formParam = new FormData()
      formParam.append('type',params.type)
      formParam.append('subject',params.subject)
      formParam.append('section', params.section)
      formParam.set('file',fileItem)
      uploadResource(formParam).then(res=>{
        success.value++
        if (200 === res.code){
          notification.notify({
            type:'info',
            title:'文件上传成功,请勿重复上传',
            text:fileItem.name
          })
        }
      }).catch(()=>{
        failed.value++
      }).finally(()=>{
        alreadyUpload.value++
        percent.value=(alreadyUpload.value/len).toFixed(2)*100
        if (alreadyUpload.value===len)
          isDisabled.value=false
      })
    }
  }
}
const run=async ()=>{
  //参数校验
  files=Array.from(document.getElementById('formFile').files)
  if (files==null||params.type===''||params.subject===''||params.section===''){
    notification.notify({
      type:'warn',
      title:'资源信息缺漏',
      text:'正确选择后再上传'
    })
    return
  }
  isDisabled.value=true
  alreadyUpload.value=0
  percent.value=0
  //任务池
  let pool = []
  for (let i=0;i<files.length;i++){
    //构造请求参数
    let formParam = new FormData()
    formParam.append('type',params.type)
    formParam.append('subject',params.subject)
    formParam.append('section', params.section)
    formParam.set('file',files[i])
    let promise = uploadResource(formParam)
    promise.then((res)=>{
      console.log(`${files[i].name}的请求已经处理完毕,当前并发为${pool.length}`);
      //从任务池中一移除
      pool.splice(pool.indexOf(promise),1);
      if (200 === res.code){
        success.value++
        notification.notify({
          type:'info',
          title:'文件上传成功,请勿重复上传',
          text:files[i].name
        })
      }else {
        failed.value++
        failedFiles.push(files[i].name)
      }
    }).finally(()=>{
      alreadyUpload.value++
      percent.value=(alreadyUpload.value/files.length).toFixed(2)*100
      if (alreadyUpload.value===files.length)
        isDisabled.value=false
    })
    pool.push(promise);
    //这里是重点，当满了就阻塞
    if (pool.length>=batchSize.value){
      await Promise.race(pool);
    }
  }
}
</script>
