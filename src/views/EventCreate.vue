<template>
  <div>
    <h4>Create an Event for User ID of&nbsp;<code :style="codeStyles">{{ user.id }}</code></h4>
    <p>There are currently <b>{{ catLength }}</b> categories. We are displaying the category count with Vuex getters and our component's computed properties.</p>
    <p>We used a computed property to display {{ user.name }}'s name.</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      codeStyles: {
        backgroundColor: '#ddd',
        color: 'red',
        fontWeight: 400,
        borderRadius: '4px',
        lineHeight: '1.1em',
        padding: '0 2px'
      }
    }
  },
  // ROUND 4: How to have additional local computed properties
  computed: {
    catLength() {
      return this.$store.getters.catLength
    },
    ...mapState(['user', 'categories'])
  }
}

// ROUND 1
// computed: {
//    userName() {
//     return this.$store.state.user.name
//   },
//   userId() {
//     return this.$store.state.user.id
//   },
// }
// ROUND 2
// computed: mapState({
//   userName: state => state.user.name,
//   // categories: state => state.categories
//   categories: 'categories' // If we’re wanting to access the top-level State (not using dot notation), we can do this
// })
// ROUND 3
// computed: mapState(['categories', 'user']) // If you only need top level state you can even do this
</script>
