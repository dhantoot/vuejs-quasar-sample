import Vue from 'vue'
import Axios from 'axios'

const [hostname, port] = ['localhost', 3000]
const baseURL = `http://${hostname}:${port}/api`
const $axios = Axios.create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

/**
 * Vue.prototype.$axios means gi expose nimo ang $axios globally.
 * example sa imung component: this.$axios.get('/google.com')
 */
Vue.prototype.$axios = $axios

// we expose axiosInstance para magamit sa store ug sa mga external files nga mag need ani.
export { $axios }
