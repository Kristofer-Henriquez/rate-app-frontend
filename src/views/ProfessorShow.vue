<template>
  <div v-if="professor" class="Professors-Show">
    <h1>This is the Show action for professors</h1>
    <h2>{{ professor.name }}</h2>
    <h1>{{ averageRating(professor.reviews) | formatNumber }}</h1>
    <p>{{ professor.school }}</p>
    <p>{{ professor.title }}</p>
    <p>{{ professor.department }}</p>

    <b-button v-b-modal.modal-2 variant="primary" v-on:click="professor">Edit this professor!</b-button>
    <b-button v-b-modal.modal-3 variant="primary" v-on:click="professor">Write Review!</b-button>

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
                <input type="text" class="form-control" v-model="newReviewRating" />
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

    <div v-for="review in professor.reviews">
      <b-card>
        <b-card-text>
          <p>{{ review.rating }}</p>
          <p>{{ review.text }}</p>
        </b-card-text>

        <b-button v-b-modal.modal-1 variant="primary" v-on:click="selectedReview = review">Edit review</b-button>
      </b-card>
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
      const averageRating = totalRatings / this.professor.reviews.length;
      return averageRating;
    },
  },
};
</script>
