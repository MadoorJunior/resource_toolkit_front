import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: '首页'
        },
        component: ()=>import('../views/Home.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component:()=>import('../views/Login.vue')
    },
    {
        path:'/upload',
        name:'upload',
        meta:{
            title: '单文件上传'
        },
        component:()=>import('../views/Upload.vue')
    },
    {
        path:'/uploadMul',
        name:'uploadMul',
        meta:{
            title: '批量上传'
        },
        component:()=>import('../views/UploadMul.vue')
    }
]
const router = createRouter({
    history:createWebHistory(),
    routes,
})
router.beforeEach((to,from,next)=>{
    document.title=`${to.meta.title}-麦麦的资源工具箱`
    next()
})
export default router