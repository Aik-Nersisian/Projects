// Return the first char of a string
export default {
  methods: {
    firstLetter(str) {
      if (str && str.length > 0) {
        return str.charAt(0);
      }
    },
  },
};
