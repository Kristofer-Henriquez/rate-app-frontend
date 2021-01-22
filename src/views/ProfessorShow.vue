<template>
  <div v-if="professor" class="Professors-Show">
    <h1>This is the Show action for professors</h1>
    <h2>{{ professor.name }}</h2>
    <h1> {{ averageRating(professor.reviews) }} </h1>
    <p>{{ professor.school }}</p>
    <p>{{ professor.title }}</p>
    <p>{{ professor.department }}</p>

    <a v-bind:href="`/professors/${professor.id}/edit`">Edit this professor!</a>

    <p><button v-on:click="destroyProfessor()">Delete this Professor</button></p>

    <div v-for="review in professor.reviews">
      <p>{{ review.rating }}</p>
      <p>{{ review.text }}</p>

      <a v-bind:href="`/reviewEdit/${review.id}`">Edit this review!</a>

      <p><button v-on:click="destroyReview(review.id)">Delete this review</button></p>
    </div>
    <a v-bind:href="`/professors/${professor.id}/reviewcreate`">Write Review!</a>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      professor: null,
    };
  },
  created: function() {
    this.showProfessor();
  },
  mounted () {
    // console.log("mounted", this.professor);
    // // mapping each item of professor to merge averageRating calculated
    // this.professor = this.professor.map(professor => {
    //   // ratings summation
    //   const totalRatings = this.professor.reviews.reduce((acc, { rating }) => acc += Number(rating), 0);
    //   console.log(totalRatings);
    //   const averageRating = totalRatings / this.professor.reviews.length;
    //   // returning the merge of the current this.professor with averageRating
    //   return {...this.professor, averageRating};
    // });
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
        rating: this.newReviewrating,
        text: this.newReviewText,
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
    destroyReview: function(review) {
      console.log("deleting this review");

      axios.delete(`/reviews/${review}`).then(response => {
        console.log(response.data);
        location.reload();
      });
    },
    averageRating: function(reviews) {
      const totalRatings = reviews.reduce((acc, { rating }) => acc += Number(rating), 0);
      console.log(totalRatings);
      const averageRating = totalRatings / this.professor.reviews.length;
      return averageRating;
    }
  },
};
</script>
