<!-- A single notification component. Gets two props. One is the notification object, and the second one is boolean indicating if its a NEW notification -->
<!-- If its a new notification, "discard/delete" button will be rendered. Also, a click event will be present on the notification to open the organizations modal window. -->

<template>
  <div v-if="notification" class="single-notification">
    <div v-if="newNotifications" class="close-button-container">
      <button class="close-button" @click="discard">❌</button>
    </div>

    <div
      :class="newNotifications ? 'new-notifications' : ''"
      class="notification-sections"
      @click="notificationClicked"
    >
      <div class="notification-top-section">
        <div class="notification-left-part">
          <img
            :src="notification.image"
            alt="image"
            height="50px"
            width="50px"
          />
        </div>
        <div class="notification-middle-part">
          <h1>{{ notification.title }}</h1>
          <p>{{ notification.description }}</p>
        </div>

        <!-- A mixin is used to get the time passed from the moment when the notification was generated. -->
        <div class="notification-right-part">
          <p>{{ getRemaining(notification.time) }}</p>
          <p class="urgency" :class="urgencyStatus">
            {{ notification.urgency }}
          </p>
        </div>
      </div>
      <!-- The organizations will be rendered as circles with the first letter of their name using a mixin -->
      <div class="notification-bottom-section">
        <template
          v-if="
            notification.organizations && notification.organizations.length > 0
          "
        >
          <span
            v-for="organization in notification.organizations"
            :key="organization.id"
            class="organization-icon"
            ><p>{{ firstLetter(organization.name) }}</p></span
          >
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import remainingTime from "@/mixins/remainingTime";
import firstLetter from "@/mixins/firstLetter";
import { mapActions } from "vuex";

export default {
  name: "SingleNotificationComponent",
  props: {
    notification: {
      type: Object,
      required: true,
    },
    newNotifications: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // Based on the urgency status, a different class will be applied to changed the background color of the urgency element.
    urgencyStatus() {
      if (this.notification.urgency === "High") {
        return "urgency-status-high";
      } else if (this.notification.urgency === "Medium") {
        return "urgency-status-medium";
      } else {
        return "urgency-status-low";
      }
    },
  },
  methods: {
    ...mapActions(["setLoading"]),

    // Allow a click if its a new notification.
    notificationClicked() {
      if (this.newNotifications)
        this.$emit("notification-clicked", this.notification);
    },

    // Set the loading animation to true and emit the notification to be deleted back to "NotificationsComponent"
    // Done this way to reduce extra code of importing vuex, and services and duplicating the same code which is already present in the parent.
    discard() {
      this.setLoading(true);
      this.$emit("discard-clicked", this.notification);
    },
  },
  mixins: [remainingTime, firstLetter],
};
</script>

<style lang="scss" scoped>
.new-notifications.notification-sections {
  cursor: pointer;
}

.new-notifications.notification-sections:hover {
  background-color: #bac8ff;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  transition: background-color 0.25s ease-in-out;
}
.single-notification {
  display: flex;
  flex-direction: column;
  background-color: #9db0ff;
  border-radius: 18px;
  border: 1px solid #7faae8;
}

.notification-top-section {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #aabaff;
  padding: 1rem;
}

.notification-bottom-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  column-gap: 0.5rem;
}

.notification-middle-part {
  flex: 1;
}

.organization-icon {
  background-color: #859cff;
  border-radius: 50%;

  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  border-radius: 50%;
}

.urgency {
  border-radius: 18px;
  padding: 0.5rem;
  width: 4rem;
  margin: 0.5rem 0;
}

.urgency-status-high {
  background-color: #ff722e;
}

.urgency-status-medium {
  background-color: #ffc000;
}

.urgency-status-low {
  background-color: #00acb9;
}

.close-button-container {
  border-bottom: 1px solid #aabaff;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  background-color: #859cff;
}
</style>
