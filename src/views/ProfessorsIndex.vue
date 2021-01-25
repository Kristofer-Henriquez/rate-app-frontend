<template>
  <div class="Professors">
    <h1>The tables have turned!</h1>
    <div class="row">
      <div class="col-sm-3" v-for="professor in professors">
        <br>
        <div class="card" style="width: 20rem; height: auto; margin: 25px; border-color: orange; border-radius: 15px; border-width: 5px">
          <div class="card-body" style="width: auto; height: auto; color: #080601f3;">
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
