<template>
  <div class="Review-edit">
    <form v-on:submit.prevent="submit()">
      <h1>Edit this Review!</h1>

      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>

      <div class="form-group">
        <label>rating:</label>
        <input type="text" class="form-control" v-model="reviews.rating" />
      </div>

      <div class="form-group">
        <label>text:</label>
        <input type="text" class="form-control" v-model="reviews.text" />
      </div>

      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      errors: [],
      reviews: {},
    };
  },
  mounted() {
    axios.get("/api/reviews/" + this.$route.params.id).then(response => {
      console.log(response.data);
      this.reviews = response.data;
    });
  },
  methods: {
    submit: function() {
      var params = {
        professors_id: this.reviews.professors_id,
        rating: this.reviews.rating,
        text: this.reviews.text,
      };
      axios
        .put(`/api/reviews/${this.$route.params.id}`, params)
        .then(response => {
          this.$router.push(`/professors/${this.reviews.professors_id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
