import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_CLIENT = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default new Vuex.Store({
  state: {
    isLoading: false,
    user: { id: 'abc123', name: 'Obie Buckets' },
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
    SET_LOADING(state) {
      state.isLoading = !state.isLoading
    }
  },
  actions: {
    fetchEvents({ commit, state }) {
      commit('SET_LOADING')
      console.log(state.isLoading)
      API_CLIENT.get('/events').then(response => {
        commit('SET_EVENTS', response.data)
        setTimeout(() => {
          commit('SET_LOADING')
        }, 3000)
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
      return state.events.find(event => {
        return event.id === id
      })
    }
  }
})
