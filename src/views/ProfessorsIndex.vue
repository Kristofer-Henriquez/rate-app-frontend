<template>
  <div class="Professors">
    <h1>This is the Index action for professors</h1>
    <div v-for="professor in professors">
      <h2> {{ professor.name }} </h2>
      <p> {{ professor.school }} </p>
      <p> {{ professor.title }} </p>
      <p> {{ professor.department }} </p>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

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