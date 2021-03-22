<template>
  <div class="notification-bar"
    :class="notificationTypeClass"> <!-- binding computed property here -->
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 9000)
  },
  methods: mapActions('notification', ['remove']),
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },
  // Notice how we’ve added timeout data and we’re setting it to be equal to a setTimeout function, which dispatches the remove Action 5 seconds (5000ms) after the component is mounted. In other words, the component mounts, the notification is displayed, and 5 seconds later, the notification is deleted.
  // But why are we putting the setTimeout in our data? Couldn’t we just call it directly from the mounted hook? We’re doing it this way because we want to make sure to clear the setTimeout just before this component is destroyed, like so:
  beforeDestroy() {
    // this beforeDestroy lifecycle hook will make sure we AVOID A MEMORY LEAK by not leaving the setTimeout running if this component isn’t being actively displayed. It’s considered a JavaScript anti-pattern to not clear out your setTimeouts for this reason.
    clearTimeout(this.timeout)
  }
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 1em 0;
}
p {
  font-weight: bold;
  font-size: 20px;
}
</style>
