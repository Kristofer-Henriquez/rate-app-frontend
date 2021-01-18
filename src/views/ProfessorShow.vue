<template>
  <div class="Professors-Show">
    <h1>This is the Show action for professors</h1>
    <h2>{{ professor.name }}</h2>
    <p>{{ professor.school }}</p>
    <p>{{ professor.title }}</p>
    <p>{{ professor.department }}</p>

    <a v-bind:href="`/professors/${professor.id}/edit`">Edit this professor!</a>

    <p><button v-on:click="destroyProfessor()">Delete this Professor</button></p>

    <div v-for="review in professor.reviews">
      <p>{{ review.rating }}</p>
      <p>{{ review.text }}</p>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      professor: [],
      review: [
        // rating: "",
      ],
    };
  },
  created: function() {
    this.showProfessor();
  },
  methods: {
    showProfessor: function() {
      axios.get("/professors/" + this.$route.params.id).then(response => {
        console.log("professor show", response);
        this.professor = response.data;
      });
    },
    destroyProfessor: function() {
      console.log("deleting this professor");

      axios.delete(`/professors/${this.$route.params.id}`).then(response => {
        console.log(response.data);
        this.$router.push("/professors");
      });
    },
    createReview: function() {
      var params = {
        professors_id: this.professor.id,
        name: this.newReviewrating,
        title: this.newReviewText,
      };
      axios
        .post("/reviews/", params)
        .then(response => {
          console.log(response.data);
          this.$router.push(`/professors/${this.$route.params.id}`);
        })
        .catch(error => {
          console.log("photos create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
