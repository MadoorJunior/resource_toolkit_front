<template>
  <div class="container flex justify-center">
    <div>
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
      m-0 " aria-label="Default select example">
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
      m-0 " aria-label="Default select example">
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
      m-0 " aria-label="Default select example">
            <option selected disabled>选择科目</option>
            <option v-for="s in subjects" :value="s">
              {{ s }}
            </option>
          </select>
        </div>
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
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" ref="fileForm" type="file" id="formFile">
          <div class="ml-4 mt-1 text-sm text-gray-300 font">支持类型:doc，docx，ppt，pptx，pdf，mp4</div>
        </div>
      </div>
      <div class="my-6 mt-10">
        <button @click="upload" class="w-20 mx-auto block text-white text-lg tracking-wider bg-opacity-90 bg-gray-700 rounded-md py-1 transition ease-in-out duration-200 hover:-translate-y-1 hover:scale-105">上传</button>
      </div>
    </div>
  </div>


</template>
<script setup>
import {reactive, ref} from "vue";
import {uploadResource} from "../api/index.js";
import {notify, useNotification} from "@kyvg/vue3-notification";
const notification = useNotification()
const types = ref([
  '媒体素材', '试题', '试卷', '课件', '文献资料', '教学案例', '常见问题解答', '课本素材', '网络课程'
]);
const sections = ref(['小学', '初中', '高中']);
const subjects = ref(['品德与生活（社会）', '政治', '语文', '数学', '科学', '物理', '化学', '生物', '历史与社会', '地理', '历史', '体育与健康', '艺术', '音乐', '美术', '信息技术', '通用技术', '外语', '英语', '日语', '俄语', '其他外国语', '综合实践活动', '信息技术', '劳动与技术']);

const params=reactive({
  type:'',subject:'',section:''
})
let file = null
const fileForm=ref(null)
const getFile=(e)=>{
  file = e.target.files[0];//拿到上传的file
}
const upload=()=>{
  let formParam = new FormData()
  if (file==null||params.type===''||params.subject===''||params.section===''){
    notification.notify({
      type:'warn',
      title:'资源信息缺漏',
      text:'正确选择后再上传'
    })
    return
  }
  formParam.append('file',file)
  formParam.append('type',params.type)
  formParam.append('subject',params.subject)
  formParam.append('section',params.section)
  //清空表单
  uploadResource(formParam).then(res=>{
    if (200 === res.code){
      notification.notify({
        type:'info',
        title:'文件上传成功,请勿重复上传',
        text:file.name
      })
    }
  })
}
</script>
