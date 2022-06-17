const express = require("express");
const path = require("path");
const app = express();
bodyParser = require("body-parser");
port = 3080;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../job/dist/index.html")));

var fs = require("fs");
const e = require("express");

// get All New Notifications
// read from newNotifications.json, send back to client as JSON
app.get("/api/newNotifications", (req, res) => {
  fs.readFile("./newNotifications.json", "utf8", function (err, result) {
    if (err) {
      console.log("error", err);
    } else {
      var newNotifications = JSON.parse(result);
      res.send(newNotifications);
    }
  });
});

// get All Previous/Old Notifications
// read from oldNotifications.json, send back to client as JSON
app.get("/api/oldNotifications", (req, res) => {
  fs.readFile("./oldNotifications.json", "utf8", function (err, result) {
    if (err) {
      console.log("error", err);
    } else {
      var oldNotifications = JSON.parse(result);
      res.send(oldNotifications);
    }
  });
});

// Reset Notifications
// read from notificationsForReset.json, overwrite newNotifications.json with the result.
// overwrite oldNotifications.json with the an empty array.
// essentially, reset the notifications.
app.post("/api/resetAll", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./notificationsForReset.json"));
  fs.writeFile("./newNotifications.json", JSON.stringify(data), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
  fs.writeFile("./oldNotifications.json", JSON.stringify([]), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });

  res.json({ status: "1" });
});

// Delete a Notification
// read from newNotifications.json, filter out what needs to be deleted.
// Write the leftover notifications back to newNotifications.json

// read from oldNotifications.json, add the deleted notification to the end of the array, then write to oldNotifications.json

app.post("/api/deleteNotification", (req, res) => {
  fs.readFile("./newNotifications.json", "utf8", function (err, data) {
    var jsonNew = JSON.parse(data);

    var filteredNotifications = jsonNew.filter(
      (item) => item.id !== req.body.notification.id
    );

    jsonNew = JSON.stringify(filteredNotifications);

    fs.writeFile("./newNotifications.json", jsonNew, function (err, result) {
      if (err) console.log("error", err);
    });
  });

  fs.readFile("./oldNotifications.json", "utf8", function (err, data) {
    var jsonOld = JSON.parse(data);
    jsonOld.push(req.body.notification);
    jsonOld = JSON.stringify(jsonOld);
    fs.writeFile("./oldNotifications.json", jsonOld, function (err, result) {
      if (err) console.log("error", err);
    });
  });

  res.json({ status: "1" });
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
