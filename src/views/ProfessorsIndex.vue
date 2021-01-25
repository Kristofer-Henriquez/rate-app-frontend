<template>
  <div class="Professors">
    <h1>This is the Index action for professors</h1>
    <div class="row">
      <div class="col-sm-6" v-for="professor in professors">
        <div class="card">
          <div class="card-body">
            <h2>{{ professor.name }}</h2>
            <h3> {{ professor.avg | formatNumber}} </h3>
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
Vue.filter("formatNumber", function (value) {
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
  },
};
</script>
