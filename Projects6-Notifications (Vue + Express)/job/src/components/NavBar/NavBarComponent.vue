<template>
  <div id="nav-bar">
    <div class="nav-bar-left">
      <router-link to="/">
        <img
          src="@/assets/images/logo-transparent.png"
          alt="logo"
          height="50px"
          width="50px"
        />
      </router-link>
    </div>
    <div class="nav-bar-right">
      <div @click="openNotifications" class="notifications-container">
        <!-- Display an icon with the number of new notifications -->
        <NotificationIcon :count="newNotificationsCount" />
      </div>
      <div
        class="nav-bar-notifications"
        :class="notificationsWidgetOpen ? 'opened' : 'closed'"
      >
        <NotificationsComponent />
      </div>
    </div>
  </div>
</template>

<script>
import NotificationIcon from "@/assets/icons/NotificationIcon.vue";
import { mapGetters } from "vuex";
import NotificationsComponent from "@/components/Notifications/NotificationsComponent.vue";
export default {
  name: "NavBarComponent",
  data() {
    return {
      notificationsWidgetOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      newNotificationsCount: "newNotificationsCount",
    }),
  },

  methods: {
    openNotifications() {
      this.notificationsWidgetOpen = !this.notificationsWidgetOpen;
      this.$emit("overlay");
    },
  },
  components: {
    NotificationIcon,
    NotificationsComponent,
  },
};
</script>

<style lang="scss" scoped>
#nav-bar {
  display: flex;
  height: 4rem;
  align-items: center;
  padding: 0.5rem 1.5rem;
  background-color: #ffffff;
  position: relative;
  z-index: 11;
}
.nav-bar-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.nav-bar-notifications {
  position: absolute;
  top: 6rem;
  width: 100%;
  max-width: 40rem;
  right: 0;
  z-index: 10;
  margin-right: 1rem;
  transition: all 0.25s ease-in-out;
}

.nav-bar-notifications.closed {
  opacity: 0;
  visibility: hidden;
}

.nav-bar-notifications.opened {
  opacity: 1 !important;
  visibility: visible !important;
}
</style>
