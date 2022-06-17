// A service for getting the new and previous/old notifications.
// Also, for deleting a notification and resetting the notifications.

const axios = require("axios");

export async function getNewNotifications() {
  // Will get all the new notifications.
  // Used hashMap to get the unique notifications and to merge notifications with the same id into one. I think if there are two identical notifications - the only difference can be the time and the organizations array.
  return await axios
    .get("/api/newNotifications")
    .then((result) => {
      let mergedArray = [];

      const arrayHashmap = result.data.reduce((obj, item) => {
        obj[item.id]
          ? obj[item.id].organizations.push(...item.organizations)
          : (obj[item.id] = { ...item });
        return obj;
      }, {});

      mergedArray = Object.values(arrayHashmap);
      return mergedArray;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

// Gets the old notifications.
export async function getOldNotifications() {
  return await axios
    .get("/api/oldNotifications")
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

// Deletes a notification.
export async function discardNotification(notification) {
  return await axios.post(`/api/deleteNotification`, {
    notification: notification,
  });
}

// Resets the notifications.
export async function resetAll() {
  return await axios.post(`/api/resetAll`, {});
}
