import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    user: { id: 4819676, name: 'Obie Buckets' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    // destructuring context object to { commit }
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(page, perPage)
        .then(response => {
          commit('SET_EVENTS', response.data)
        })
        .catch(e => {
          console.error(
            'Request to fetch events failed in fetchEvents action in store.js',
            e
          )
        })
    },
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id)

      if (event) {
        console.log('event', event)
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(response => {
            console.log(response);
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
      }
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(e => {
          console.log(
            'Request to fetch single event failed in getEvent action in store.js',
            e
          )
        })
    }
  },
  getters: {
    catLength: state => {
      return state.categories.length
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    },
    eventsCount: state => {
      return state.events.length
    }
  }
})
