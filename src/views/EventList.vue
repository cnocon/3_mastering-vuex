<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link>
    </template>
    <span v-show="page != 1 && hasNextPage"> | </span>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
    >Next Page</router-link>
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
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.page < Math.ceil(this.eventsTotal / 2)
    },
    ...mapState(['events', 'eventsTotal'])
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: 2,
      page: this.page
    })
  }
}
</script>
