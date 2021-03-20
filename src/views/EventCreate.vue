<template>
  <div>
    <h4>Create an Event for User ID of&nbsp;<code :style="codeStyles">{{ user.id }}</code></h4>
    <p v-html="localComputed.paragraph"></p>
    <p>We used a computed property to display {{ user.name }}'s name.</p>
    <p><b>Example Event</b></p>
    {{ getSingleEvent(1) }}
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

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
  computed: {
    localComputed() {
      return {
        paragraph: `There are currently <b>${
          this.catCount
        }</b> categories. We are displaying the category count with Vuex getters and our component's computed properties.`
      }
    },
    ...mapGetters({
      catCount: 'catLength',
      getSingleEvent: 'getEventById'
    }),
    ...mapState(['user', 'categories'])
  }
}
</script>
