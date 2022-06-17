// Will return the remaining time.

import moment from "moment";
export default {
  methods: {
    getRemaining(ts) {
      const now = moment();
      const then = moment(ts);
      const diff = then.diff(now);

      const dur = moment.duration(diff);

      let parts = [];
      for (const part of ["days", "hours", "minutes", "seconds"]) {
        const d = dur[part]();

        dur.subtract(moment.duration(d, part));

        parts.push(d);
      }
      let timePassed = "";
      // If days passed, will show the days only.
      // If hours passed, will show the hours only.
      // If minutes passed, will show the minutes only.
      // If seconds passed, will show the seconds only.
      if (parts[0] * -1 !== 0) {
        timePassed = `${parts[0] * -1} days ago`;
      } else if (parts[1] * -1 !== 0) {
        timePassed = `${parts[1] * -1}h ago`;
      } else if (parts[2] * -1 !== 0) {
        timePassed = `${parts[2] * -1}min ago`;
      } else if (parts[3] * -1 !== 0) {
        timePassed = `${parts[3] * -1}sec ago`;
      } else {
        timePassed = "Just now";
      }

      return timePassed;
    },
  },
};
