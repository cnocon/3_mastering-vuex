import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user.js' // This pulls in all the constants in user.js
import event from '@/store/modules/event.js'
import * as notification from '@/store/modules/notification.js'


Vue.use(Vuex)

export default new Vuex.Store({
  // we're re-adding user here
  modules: {
    // from our components, when we want to reference any user variable, we do `this.$store.state.user.user`
    user,
    event,
    notification
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
})
