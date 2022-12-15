import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const config = loadEnv(mode, './')
  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/toolkit': {
          target: config.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/toolkit/, '') // 不可以省略rewrite
        }
      },
      host:'0.0.0.0'
    }
  }

})
