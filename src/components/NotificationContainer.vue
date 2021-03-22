<template>
  <!-- As you can see, we’re importing NotificationBar along with mapState. Then we’re using v-for to create a NotificationBar for each of the notifications that are in our notification module’s State, which we’re mapped to within our computed property.

  Note how we’re feeding in each notification as a prop when a NotificationBar is created, and using the notification.id as the unique key for each of the components that are created.

  Now we just need to import NotificationContainer somewhere that can display it. -->
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from './NotificationBar'
import { mapState } from 'vuex'

export default {
  components: { NotificationBar },
  computed: mapState('notification', ['notifications'])
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.65);
  margin: 1em 0 0;
  /* padding: 15px; */
  width: 100%;
  left: 0;
  text-align: center;
}
</style>
