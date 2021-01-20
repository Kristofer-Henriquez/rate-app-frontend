<template>
  <div class="Review-edit">
    <form v-on:submit.prevent="submit()">
      <h1>Edit this Review!</h1>

      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>

      <!-- <h1>{{ professor.name }}</h1> -->
      <div class="form-group">
        <label>rating:</label>
        <input type="text" class="form-control" v-model="reviews.rating" />
      </div>
      <div class="form-group">
        <label>text:</label>
        <input type="text" class="form-control" v-model="reviews.title" />
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
    axios.get("/reviews/" + this.$route.params.id).then(response => {
      console.log(response.data);
      this.reviews = response.data;
    });
  },
  methods: {
    submit: function() {
      var params = {
        rating: this.reviews.rating,
        text: this.reviews.text,
      };
      axios
        .put(`/reviews/${this.$route.params.id}`, params)
        .then(response => {
          this.$router.push("/professors");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
