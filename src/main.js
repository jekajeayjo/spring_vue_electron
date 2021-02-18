import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import FlashMessage from '@smartweb/vue-flash-message';
import 'v-markdown-editor/dist/v-markdown-editor.css';
import Editor from 'v-markdown-editor'

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

Vue.use(Editor);
import VueSwal from 'vue-swal'
Vue.use(VueAxios, axios)
Vue.use(FlashMessage);
Vue.use(VueSwal)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    // let vm=this
    //   this.$store.dispatch('STATE_CHANGED', vm.$store.getters.isUserAuthenticated)
    // console.log(vm.$store.getters.isUserAuthenticated)
  }
}).$mount('#app')
