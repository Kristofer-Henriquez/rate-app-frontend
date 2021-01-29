<template>
  <div class="Professors">
    <h1>The tables have turned!</h1>

    <!-- sort button -->
<!-- <button v-on:click="sortRatingshigh(); sortRatingslow();"> Sort by Rating!</button> -->
<p> Sort by rating! </p>
<button style="padding: 3px 3px; text-align: center; color: #42b983" @click="sortRatingshigh();">&uarr;</button> |
<button style="padding: 3px 3px; text-align: center; color: #42b983" @click="sortRatingslow();">	&darr;</button>

    <div class="row">
      <div class="col-sm-3" v-for="professor in professors">
        <br />
        <div
          class="card"
          style="width: 20rem; height: auto; margin: 25px; border-color: orange; border-radius: 15px; border-width: 5px"
        >
          <div class="card-body" style="width: auto; height: auto; color: #080601f3;">
            <h2>{{ professor.name }}</h2>
            <h3>{{ professor.avg | formatNumber }}</h3>
            <b-form-rating v-model="professor.avg" variant="warning" class="mb-2" readonly no-border></b-form-rating>
            <p>{{ professor.school }}</p>
            <p>{{ professor.title }}</p>
            <p>{{ professor.department }}</p>
            <a v-bind:href="`/professors/${professor.id}`" class="btn btn-primary">Checkout this professor!</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue from "vue";

// numeral
var numeral = require("numeral");
Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0.0");
});

export default {
  data: function() {
    return {
      professors: [],
    };
  },
  created: function() {
    this.indexProfessors();
  },
  methods: {
    indexProfessors: function() {
      axios.get("/professors").then(response => {
        console.log("professors index", response);
        this.professors = response.data;
      });
    },
    sortRatingshigh: function() {
      var sortedProfessors = this.professors.sort((a, b) => parseFloat(b.avg) - parseFloat(a.avg));
    },
    sortRatingslow: function() {
      var sortedProfessors = this.professors.sort((a, b) => parseFloat(a.avg) - parseFloat(b.avg));
    },
    
  },
};
</script>
