<template>
  <div class="notifications">
    <!-- Iterate trough the new notifications -->
    <div
      class="notifications-section"
      v-if="newNotifications && newNotifications.length > 0"
    >
      <h1 class="notifications-title">New</h1>
      <div class="notifications-container" v-if="!loading">
        <SingleNotificationComponent
          v-for="notification in newNotifications"
          :key="notification.id"
          :notification="notification"
          @notification-clicked="notificationClicked($event)"
          @discard-clicked="discardClicked($event)"
          newNotifications
        />
      </div>
      <!-- If delete button was clicked from inside the 'SingleNotificationComponent', show loading animation till all the actions are completed to avoid double and more clicks. '.once' will not help in this scenario -->
      <div v-else>
        <div class="loading-container">
          <LoadingAnimation />
        </div>
      </div>
    </div>

    <!-- Iterate trough the old notifications -->
    <div
      class="notifications-section"
      v-if="oldNotifications && oldNotifications.length > 0"
    >
      <h1 class="notifications-title">Previous</h1>
      <div class="notifications-container">
        <SingleNotificationComponent
          v-for="notification in oldNotifications"
          :key="notification.id"
          :notification="notification"
        />
      </div>
    </div>

    <!-- A modal Window to show the organizations that the notification came from. 
    The user will be able to choose to which organization's dashboard to navigate to and check the campaign details in there.
    Click event not implemented -->
    <modal scrollable height="auto" name="organizations-modal">
      <div class="organizations-modal-content" v-if="currentNotification">
        <div class="close-button-container" slot="top-right">
          <button class="close-button" @click="hide">❌</button>
        </div>
        <h1 class="organizations-modal-title">Choose the organization</h1>
        <div class="organizations-modal-content-container">
          <div
            class="organizations-modal-content-container-item"
            v-for="organization in currentNotification.organizations"
            :key="organization.id"
          >
            <p>{{ organization.name }}</p>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import SingleNotificationComponent from "@/components/Notifications/SingleNotification/SingleNotificationComponent.vue";
import {
  getNewNotifications,
  getOldNotifications,
  discardNotification,
} from "@/services/notifications";

import { mapActions, mapGetters } from "vuex";
import LoadingAnimation from "@/assets/animations/LoadingAnimation.vue";
export default {
  name: "NotificationsComponent",
  data() {
    return {
      currentNotification: null,
    };
  },

  created() {
    this.getNewNotifications();
    this.getOldNotifications();
  },
  computed: {
    ...mapGetters({
      newNotifications: "newNotifications",
      oldNotifications: "oldNotifications",
      loading: "loading",
    }),
  },

  methods: {
    ...mapActions([
      "setNewNotificationsCount",
      "setNewNotifications",
      "setOldNotifications",
      "deleteNotification",
      "setLoading",
    ]),
    getNewNotifications() {
      getNewNotifications().then((notifications) => {
        this.setNewNotificationsCount(notifications.length);
        this.setNewNotifications(notifications);
      });
    },

    getOldNotifications() {
      getOldNotifications().then((notifications) => {
        this.setOldNotifications(notifications);
      });
    },

    notificationClicked(e) {
      this.currentNotification = e;
      this.$modal.show("organizations-modal");
    },

    discardClicked(notification) {
      this.deleteNotification(notification);
      discardNotification(notification).then(() => {
        this.getNewNotifications();
        this.getOldNotifications();
        setTimeout(() => {
          this.setLoading(false);
        }, 300);
      });
    },

    hide() {
      this.$modal.hide("organizations-modal");
    },
  },

  components: {
    SingleNotificationComponent,
    LoadingAnimation,
  },
};
</script>

<style lang="scss" scoped>
.notifications {
  width: 100%;
}

.notifications-section {
  background: #859cff;
  border-radius: 18px;
  margin-bottom: 0.1rem;
  padding: 1rem;
}

.notifications-title {
  font-size: 1.5rem;
  height: 2rem;
  display: flex;
  align-items: center;
  color: #ffffff;
  padding-inline: 1rem;
  border-top-right-radius: 18px;
  border-top-left-radius: 18px;
  margin-bottom: 0.5rem;
}

.notifications-container {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  max-height: 18rem;
  overflow: auto;
}

.notifications-container::-webkit-scrollbar {
  width: 8px;
}

.notifications-container::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.notifications-container::-webkit-scrollbar-thumb {
  background-color: #b0c0ff;
  border-radius: 100px;
  border-right: 13px white solid;
  background-clip: padding-box;
}

.organizations-modal-content-container {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem;
}

.organizations-modal-content-container-item {
  width: 100%;
  background-color: #bac8ff;
  border-radius: 18px;
  padding: 1rem 0;
  cursor: pointer;
}

.organizations-modal-title {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
