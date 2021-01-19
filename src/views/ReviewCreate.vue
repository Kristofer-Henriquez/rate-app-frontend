<template>
  <div class="Review-Create">
    <h2>New Review</h2>
    <form v-on:submit.prevent="createReview()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <div>
        rating:
        <input type="text" v-model="newReviewRating" />
      </div>
      text:
      <input type="text" v-model="newReviewText" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newReviewRating: "",
      newReviewText: "",
      errors: [],
    };
  },
  created: function() {},
  methods: {
    createReview: function() {
      var params = {
        professors_id: this.$route.params.id,
        rating: this.newReviewRating,
        text: this.newReviewText,
      };
      axios
        .post("/reviews/", params)
        .then(response => {
          console.log(response.data);
          this.$router.push(`/professors/${this.$route.params.id}`);
        })
        .catch(error => {
          console.log("Review create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
