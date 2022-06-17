<!-- Main Home Page -->
<!-- Contains the title and a reset button that will reset the notifications -->

<template>
  <div class="home-view">
    <div class="main-container">
      <h1 class="greeting">Hello everyone!</h1>
      <div class="reset-btn-container">
        <button
          v-show="
            (oldNotifications && oldNotifications.length !== 0) || !success
          "
          :class="success ? '' : 'success'"
          class="reset-btn"
          @click="resetAllNotifications"
        >
          {{ success ? "Reset Notifications!" : "Success!" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  resetAll,
  getNewNotifications,
  getOldNotifications,
} from "@/services/notifications";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HomeView",

  data() {
    return {
      success: true,
    };
  },

  computed: {
    ...mapGetters({
      oldNotifications: "oldNotifications",
    }),
  },

  methods: {
    ...mapActions([
      "setNewNotificationsCount",
      "setNewNotifications",
      "setOldNotifications",
    ]),

    successStatus(status) {
      this.success = status;
      setTimeout(() => {
        this.success = true;
      }, 1000);
    },

    resetAllNotifications() {
      resetAll();
      this.getNewNotifications();
      this.getOldNotifications();

      this.successStatus(false);
    },

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
  },
};
</script>

<style lang="scss" scoped>
.home-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-inline: 1.5rem;
  justify-content: center;
}

.greeting {
  font-size: 4rem;
  font-weight: bold;
  color: #5072ff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.reset-btn-container {
  z-index: 1;
  height: 6rem;
}
.reset-btn {
  background-color: #859cff;
  border-radius: 18px;
  border: 0px;
  padding: 1rem;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
}

.success.reset-btn {
  background-color: #00acb9;
  cursor: initial;
}
.reset-btn-container:hover .success.reset-btn::after {
  padding: 0rem;
  background-color: #00acb9;
}

.reset-btn::after {
  content: "";
  color: #ffffff;
  position: absolute;
  width: 100%;
  height: 100%;

  z-index: -1;
  border-radius: 18px;
  transition: padding 0.25s ease-in-out;
}

.reset-btn-container:hover .reset-btn::after {
  padding: 0.5rem;
  background-color: #9db0ff;
}
</style>
