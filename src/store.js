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
    todos: [
      { id: 1, text: 'first todo', done: true },
      { id: 2, text: '2nd todo', done: false },
      { id: 3, text: 'third todo', done: true },
      { id: 4, text: '4th todo', done: false }
    ],
    events: []
  },
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
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
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    }
  },
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    },
    eventsCount: state => {
      return state.events.length
    }
  }
})
