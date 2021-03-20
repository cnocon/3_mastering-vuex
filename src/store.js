import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Obie Buckets' },
    // eslint-disable-next-line prettier/prettier
    categories: ['sustainability','nature','animal welfare','housing','education','food','community'],
    todos: [
      { id: 1, text: 'first todo', done: true },
      { id: 2, text: '2nd todo', done: false },
      { id: 3, text: 'third todo', done: true },
      { id: 4, text: '4th todo', done: false }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    catLength: state => {
      return state.categories.length.toString()
    },
    // We could have a Getter that gets an array of the todos that are labeled done.
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    // And we can use this Getter inside another Getter if we want to find out how many remaining todos there are to complete.
    activeTodosCount: (state, getters) => {
      // Now we are able to return the difference between the number of todos that are done from the total number of todos.
      return state.todos.length - getters.doneTodos.length
      // You may be wondering why we wouldn’t just write activeTodos like this instead.
      // activeTodosCount: (state) => {
      //   return state.todos.filter(todo => !todo.done).length
      // }
      // And we could. This example was just to demonstrate the power of passing in getters to a Getter.
    }
  }
})
