<template>
  <div>
    <h1>Events Listing</h1>
    <div v-if="events">
      <EventCard v-for="event in events" :key="event.id" :event="event"/>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    isNotLoading() {
      return !this.$store.state.isLoading
    },
    ...mapState(['events'])
  },
  beforeMount() {
    this.$store.dispatch('fetchEvents')
  }
}
</script>
