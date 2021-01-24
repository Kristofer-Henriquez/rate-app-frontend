<template>
  <div v-if="professor" class="Professors-Show">
    <h1>This is the Show action for professors</h1>
    <h2>{{ professor.name }}</h2>
    <h1>{{ averageRating(professor.reviews) | formatNumber }}</h1>
    <p>{{ professor.school }}</p>
    <p>{{ professor.title }}</p>
    <p>{{ professor.department }}</p>

    <a v-bind:href="`/professors/${professor.id}/edit`">Edit this professor!</a>

    <div>
      <a v-bind:href="`/professors/${professor.id}/reviewcreate`">Write Review!</a>
    </div>

    <p><button v-on:click="destroyProfessor()">Delete this Professor</button></p>

    <div v-for="review in professor.reviews">
      <p>{{ review.rating }}</p>
      <p>{{ review.text }}</p>

      <b-button v-b-modal.modal-1 v-on:click="selectedReview = review">Edit review</b-button>
    </div>

    <div>
      <b-modal id="modal-1" title="BootstrapVue">
        <template #modal-header="">
          <h1>Edit this Review!</h1>
        </template>

        <template #default="">
          <div>
            <form v-on:submit.prevent="submit()">
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>

              <div class="form-group">
                <label>rating:</label>
                <input type="text" class="form-control" v-model="selectedReview.rating" />
              </div>

              <div class="form-group">
                <b-form-textarea
                  id="textarea"
                  v-model="selectedReview.text"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </div>
            </form>
          </div>
        </template>

        <template #modal-footer="{ ok, cancel, hide }">
          <div>
            <b-button size="sm" variant="success" @click="ok(submit(selectedReview.id))">
              OK
            </b-button>

            <b-button size="sm" @click="cancel()">
              Cancel
            </b-button>

            <b-button size="sm" @click="hide(destroyReview(selectedReview.id))" variant="danger">
              delete
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

// Numeral
import Vue from "vue";
var numeral = require("numeral");
Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0.0");
});

export default {
  data: function() {
    return {
      errors: "",
      professor: null,
      text: "",
      reviews: {},
      selectedReview: {},
    };
  },
  created: function() {
    this.showProfessor();
  },
  methods: {
    submit: function(review) {
      var params = {
        professors_id: this.selectedReview.professors_id,
        rating: this.selectedReview.rating,
        text: this.selectedReview.text,
      };
      axios
        .put(`/reviews/${review}`, params)
        .then(response => {
          console.log("Review edited", response);
          // this.$router.push(`/professors/${this.reviews.professors_id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
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
      const totalRatings = reviews.reduce((acc, { rating }) => (acc += Number(rating)), 0);
      const averageRating = totalRatings / this.professor.reviews.length;
      return averageRating;
    },
  },
};
</script>