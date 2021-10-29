import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import * as firebase from 'firebase'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

Vue.component('vue-phone-number-input',VuePhoneNumberInput)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created(){
    firebase.initializeApp({
    apiKey: process.env.FIREBASE_API,
    authDomain: "schoolreg-59028.firebaseapp.com",
    databaseURL: "https://schoolreg-59028.firebaseio.com",
    projectId: "schoolreg-59028",
    })
  },
}).$mount('#app')
