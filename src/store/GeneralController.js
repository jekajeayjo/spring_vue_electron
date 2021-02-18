import Vue from 'vue'
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios)

// тест

const resource_file_url = 'http://25.133.210.152:8888/ods/upload'
const resource_file_download = 'http://25.133.210.152:8888/ods/download'
//бой
// const resource_url = 'http://192.168.254.14:8080/ods/query'
// const resource_file_url = 'http://192.168.254.14:8080/ods/upload'
// const resource_file_download = 'http://192.168.254.14:8080/ods/download'
// const resource_file_delete = 'http://192.168.254.14:8080/ods/delete'


export default {
    state: {


    },
    mutations: {

    }
    , actions: {


        SEND_REQUEST_GET({commit}, payload) {
            // console.log('main payload',payload)
            return new Promise((resolve, reject) => {
                Vue.axios.get(payload.url)
                    .then(resp => {
                        commit('CLEAN_ERROR')
                        console.log('get Response ', resp.data)
                        // commit('SET_DATA', resp.data)
                        resolve(resp.data)

                    }).catch(err => {
                    commit('SET_ERROR', 'Ошибка подключения')
                    console.log('error connect')
                    reject(err)
                })
            });
        },
        SEND_REQUEST_POST({commit}, payload) {
            console.log("POST",payload)
            // console.log('main payload',payload)
            return new Promise((resolve, reject) => {
                Vue.axios.post(payload.url, payload.data)
                    .then(resp => {
                        commit('CLEAN_ERROR')
                        console.log('get Response ', resp)
                        resolve(resp.data)
                    }).catch(err => {
                    reject(err)
                })
            });
        },
        SEND_REQUEST_DELETE({commit}, payload) {
            // console.log('main payload',payload)
            return new Promise((resolve, reject) => {
                Vue.axios.delete(payload.url)
                    .then(resp => {
                        commit('CLEAN_ERROR')
                        console.log('get Response ', resp.data)
                        // commit('SET_DATA', resp.data)
                        resolve(resp.data)

                    }).catch(err => {
                    commit('SET_ERROR', 'Ошибка подключения')
                    console.log('error connect')
                    reject(err)
                })
            });
        },



        //ЗАГРУЗКА ФАЙЛА НА СЕРВЕР
        UPLOAD_FILE({commit}, payload) {
            // console.log('main payload',payload)
            return new Promise((resolve, reject) => {
                Vue.axios.post(resource_file_url, payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data;charset=UTF-8'

                    }
                })
                    .then(resp => {
                        commit('CLEAN_ERROR')
                        console.log('get Response ', resp.data)
                        if (resp.data.header.status == 'OK') {
                            console.log('status OK ', resp.data.response)
                            // commit('SET_DATA', resp.data)
                            resolve(resp.data)
                        } else {

                            commit('SET_ERROR', resp.data.header.message)
                            resolve(resp.data.header.message)
                        }
                    }).catch(err => {
                    reject(err)
                })
            });
        },
        //ЗАГРУЗКА ФАЙЛА С СЕРВЕРА
        DOWNLOAD_FILE({commit}, payload) {
            commit('CLEAN_ERROR')
            console.log('main payload', payload.data)
            var urlDownload = resource_file_download + '?id=' + payload.data
            console.log('urlDownload', urlDownload)
            window.location.replace(urlDownload);
        },

        //получение меню
        GET_MENU({commit, dispatch}, payload) {
            dispatch('SEND_REQUEST', payload.data)
                .then(resolve => {
                        commit('SET_MENU', resolve.response.children)
                    }
                )
        },

GET_GENERAL_LIST({dispatch},payload)
{
    dispatch('SEND_REQUEST', payload.data)
        .then(resolve => {

            payload.setList(resolve)
            }
        )
}


    },
    getters: {



    }

}