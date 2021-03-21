<template>
  <div>
    <h1>Events Listing</h1>

    <!-- Page Events Count: {{ events.length }}
    Page: {{ page }} -->
    <div v-if="events">
      <EventCard v-for="event in events" :key="event.id" :event="event"/>
    </div>

    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link> |
    </template>
    <router-link :to="{ name: 'event-list', query: { page: page + 1 } }">Next Page</router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    EventCard
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapGetters({ totalEvents: 'eventsCount' }),
    ...mapState(['events'])
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: 2,
      page: this.page
    })
  }
}
</script>
