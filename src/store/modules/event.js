import EventService from '@/services/EventService'
export default {
  state: {
    events: [],
    eventsTotal: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    // destructuring context object to { commit }
    fetchEvents({ commit, dispatch }, { perPage, page }) {
      EventService.getEvents(page, perPage)
        .then(response => {
          commit(
            'SET_EVENTS_TOTAL',
            parseInt(response.headers['x-total-count'])
          )
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          // As you can see, if we catch an error, we’re just logging it to the console. Instead, we want to...
          // console.log('There was an error:', error.response)
          // ...dispatch the add Action that lives in our notification module, so we can add this error to our notifications State.
          const notification = {
            type: 'error',
            message: 'There was a problem fetching events: ' + error.message
          }
          // Notice above, we’re creating a notification object, which has a type of '``error``' and a message that describes that error.
          // Then we’re passing that notification in as the payload where we are dispatching the Action. Since our notification module is namespaced, we can dispatch the add Action with 'notification/add'.
          // The third argument here, { root: true }, is important. This tells dispatch to look for a notification/add action at the root of our store, instead of just looking for it inside the module we’re currently in.
          dispatch('notification/add', notification, { root: true })
        })
    },
    createEvent({ commit, dispatch }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
          const notification = {
            type: 'success',
            message: 'Your event has been created!'
          }
          dispatch('notification/add', notification, { root: true })
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem creating your event: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
          throw error
        })
    },
    fetchEvent({ commit, getters, dispatch }, id) {
      // lets use a caching strategy and try to find the event in
      // our existing events store first
      const event = getters.getEventById(id)

      // if we don't find it in our store, THEN we will hit the API again
      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            const notification = {
              type: 'error',
              message: 'There was a problem fetching an event: ' + error.message
            }
            dispatch('notification/add', notification, {
              root: true
            })
          })
      }
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
}
