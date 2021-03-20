<template>
  <div>
    <div v-if="showLoading"><h3>Loading...</h3></div>
    <div v-else>
      <h1>Events Listing</h1>
      <EventCard v-for="event in latestEvents" :key="event.id" :event="event"/>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
// import EventService from '@/services/EventService.js'

export default {
  components: {
    EventCard
  },
  computed: {
    showLoading() {
      return this.$store.state.isLoading
    },
    latestEvents() {
      return this.$store.state.events
    }
  },
  beforeMount() {
    this.$store.dispatch('fetchEvents')
  }
}
</script>
