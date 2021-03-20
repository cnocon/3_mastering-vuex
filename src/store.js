import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    events: [
      {
        id: 1,
        title: 'Beach Cleanup',
        date: 'Aug 28 2018',
        time: '1:00',
        location: 'Daytona Beach',
        description: "Let's clean up this beach.",
        organizer: 'Adam Jahr',
        category: 'sustainability',
        attendees: [
          {
            id: 'abc123',
            name: 'Adam Jahr'
          },
          {
            id: 'def456',
            name: 'Gregg Pollack'
          },
          {
            id: 'ghi789',
            name: 'Beth Swanson'
          },
          {
            id: 'jkl101',
            name: 'Mary Gordon'
          }
        ]
      }
    ]
  },
  mutations: {},
  actions: {},
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
