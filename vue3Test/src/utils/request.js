import Notify from '@/components/notify'
import axios from 'axios'
import JSONbig from 'json-bigint'
import { getToken } from './token'

const JSONbigToString = JSONbig({ storeAsString: true })

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: '/',
  timeout: 15000,

  // 处理大数字精度丢失问题
  transformResponse: [
    function (data) {
      try {
        // console.log(" 大数字转换为String")
        // console.log(data)
        // 大数字转换为String
        return JSONbigToString.parse(data)
      } catch (e) {
        // 转换失败的情况下
        return data
      }
    },
  ],
})

service.interceptors.request.use(
  config => {
    const token = getToken()

    // if (token) {
    //   config.headers.token = token
    // }

    config.headers.Authorization = 'Bearer 8ff2747c-cdde-40ef-839b-3160e3bfae5e'

    return config
  },
  err => Promise.resolve(err),
)

service.interceptors.response.use(
  resp => {
    if (resp.status === 200) {
      // console.log("response.use")
      // console.log(resp)
      return Promise.resolve(resp.data)
    }
    console.log('=======error resp=======', resp)

    return Promise.reject(resp)
  },
  err => {
    console.log('=======error=======', err)
    const resp = err.response
    if (resp) {
      if (resp.status === 401) {
        if (err.request.responseURL.indexOf('/login') > 0) {
          Notify.info('error', '用户名或密码错误，请重新输入！')
        }

        // if (router.currentRoute.path !== '/login') {
        //   router.push({
        //     path: '/login',
        //     query: { redirect: router.currentRoute.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
        //   })
        // }
      } else if (resp.status === 403) {
        Notify.info('error', '没有权限访问！')
      } else {
        // console.log('=======非403/402=======')
        if (resp.data && (resp.data.message || resp.data.error)) {
          const message = resp.data.message ? resp.data.message : resp.data.error
          Notify.info('error', `${resp.status} - ${message}`)
        } else {
          Notify.info('error', err.message)
        }
      }

      return Promise.reject(err)
    }
    Notify.info('error', err.message)

    return Promise.reject(err)
  },
)

export const request = config => service(config)

export const postRequest = (url, params) => service({
  method: 'post',
  url: `${url}`,
  data: params,
})

export const postForm = (url, params) => service({
  method: 'post',
  url: `${url}`,
  data: params,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [
    data => {
      let ret = ''
      for (const it in data) {
        ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
      }

      return ret
    },
  ],
})

export const postMultipart = (url, params) => service({
  method: 'post',
  url: `${url}`,
  data: params,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export const putRequest = (url, params) => service({
  method: 'put',
  url: `${url}`,
  data: params,
})

export const deleteRequest = (url, params) => service({
  method: 'delete',
  url: `${url}`,
  params,
})

export const getRequest = (url, params) => service({
  method: 'get',
  url: `${url}`,
  params,
})

// 添加多代理路径
export const vsocPath = '/vsoc/system'
export const cmdbPath = '/vsoc/cmdb'
