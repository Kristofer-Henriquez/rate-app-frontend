<template>
  <div v-if="professor" class="Professors-Show">
    <h2>Want to add a review? Just click below!</h2>
    <hr style="height:2px;border-width:0;color:gray;background-color:white">
    <h1>{{ professor.name }}</h1>
    <hr style="height:2px;border-width:0;width:50px;color:gray;background-color:white">
    <h1 class="mt-2">{{ (averageValue = averageRating(professor.reviews)) | formatNumber }} / 5</h1>
    <b-form-rating
      v-model="averageValue"
      variant="warning"
      class="mb-2"
      readonly
      show-clear
      no-border
      style="background: #2c3e5000; width: 25em; margin-left: auto; margin-right: auto"
      size="lg"
    ></b-form-rating>
    <hr style="height:2px;border-width:0;width:50px;color:gray;background-color:white">
    <h1>{{ professor.school }}</h1>
    <h1>{{ professor.title }}</h1>
    <h1>{{ professor.department }}</h1>

    <b-button v-b-modal.modal-2 variant="primary" v-on:click="professor">Edit this professor!</b-button>
    <br>
    <br>
    <b-button v-b-modal.modal-3 variant="primary">Write Review!</b-button>

    <!-- ProfessorEdit Model -->
    <div>
      <b-modal id="modal-2" title="BootstrapVue">
        <template #modal-header="">
          <h1>Edit this Professor!</h1>
        </template>

        <template #default="">
          <div>
            <b-form v-on:submit.prevent="submitProfessor()">
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>

              <div class="form-group">
                <label>School:</label>
                <input type="text" class="form-control" v-model="professor.school" />
              </div>

              <div class="form-group">
                <label>Title:</label>
                <input type="text" class="form-control" v-model="professor.title" />
              </div>

              <div class="form-group">
                <label>Department:</label>
                <input type="text" class="form-control" v-model="professor.department" />
              </div>
            </b-form>
          </div>
        </template>

        <template #modal-footer="{ ok, cancel, hide }">
          <div>
            <b-button size="sm" variant="primary" @click="ok(submitProfessor(professor.id))">
              OK
            </b-button>

            <b-button size="sm" @click="cancel()">
              Cancel
            </b-button>

            <b-button size="sm" @click="hide(destroyProfessor())" variant="danger">
              delete
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>

    <!-- New Review Model -->
    <div>
      <b-modal id="modal-3" title="BootstrapVue">
        <template #modal-header="">
          <h1>New Review!</h1>
        </template>

        <template #default="">
          <div>
            <b-form v-on:submit.prevent="createReview()">
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>

              <div class="form-group">
                <label>rating:</label>
                <b-form-rating v-model="newReviewRating" variant="warning" class="mb-2" no-border></b-form-rating>
              </div>

              <div class="form-group">
                <b-form-textarea
                  id="textarea"
                  v-model="newReviewText"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </div>
            </b-form>
          </div>
        </template>

        <template #modal-footer="{ ok, cancel}">
          <div>
            <b-button size="sm" variant="primary" @click="ok(createReview())">
              OK
            </b-button>

            <b-button size="sm" @click="cancel()">
              Cancel
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>

<div class="row">
    <div class="col-sm-3" v-for="review in professor.reviews">
      <br>
      <b-card style="width: 20rem; height: auto; margin: 25px; border-color: orange; border-radius: 15px; border-width: 5px">
        <b-card-text style="color: #080601f3;">
          <p>{{ review.rating }} / 5</p>
          <b-form-rating v-model="review.rating" variant="warning" class="mb-3" readonly no-border></b-form-rating>
          <p>{{ review.text }}</p>
        </b-card-text>

        <b-button v-b-modal.modal-1 variant="primary" v-on:click="selectedReview = review">Edit review</b-button>
      </b-card>
    </div>
  </div>

    <!-- ReviewEdit Model -->
    <div>
      <b-modal id="modal-1" title="BootstrapVue">
        <template #modal-header="">
          <h1>Edit this Review!</h1>
        </template>

        <template #default="">
          <div>
            <b-form v-on:submit.prevent="submitReview()">
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>

              <div class="form-group">
                <label>rating:</label>
                <b-form-rating v-model="selectedReview.rating" variant="warning" class="mb-2" no-border></b-form-rating>
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
            </b-form>
          </div>
        </template>

        <template #modal-footer="{ ok, cancel, hide }">
          <div>
            <b-button size="sm" variant="primary" @click="ok(submitReview(selectedReview.id))">
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
    <br>
    <br>
  </div>
</template>

<style>
.selector-for-some-widget {
  box-sizing: border-box;
}
</style>

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
      value: null,
      newReviewRating: "",
      newReviewText: "",
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
    submitProfessor: function() {
      var params = {
        name: this.professor.name,
        school: this.professor.school,
        title: this.professor.title,
        department: this.professor.department,
      };
      axios
        .put(`/professors/${this.$route.params.id}`, params)
        .then(response => {
          this.$router.push(`/professors/${this.professor.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    submitReview: function(review) {
      var params = {
        professors_id: this.selectedReview.professors_id,
        rating: this.selectedReview.rating,
        text: this.selectedReview.text,
      };
      axios
        .put(`/reviews/${review}`, params)
        .then(response => {
          console.log("Review edited", response);
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
        rating: this.newReviewRating,
        text: this.newReviewText,
      };
      axios
        .post("/reviews/", params)
        .then(response => {
          console.log(response.data);
          // this.$router.push(`/professors/${this.$route.params.id}`);
          location.reload();
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
      if (totalRatings) {
        const averageRating = totalRatings / this.professor.reviews.length;
        return averageRating;
      }
    },
  },
};
</script>
