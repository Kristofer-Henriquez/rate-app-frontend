<template>
  <div class="Professors-Create">
    <h2>New Professor</h2>
    <form v-on:submit.prevent="createProfessor()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <div>
        Name:
        <input type="text" v-model="newProfessorName" />
      </div>
      Title:
      <input type="text" v-model="newProfessorTitle" />
      school:
      <input type="text" v-model="newProfessorSchool" />
      department:
      <input type="text" v-model="newProfessorDepartment" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newProfessorName: "",
      newProfessorTitle: "",
      newProfessorSchool: "",
      newProfessorDepartment: "",
      errors: [],
    };
  },
  created: function() {},
  methods: {
    createProfessor: function() {
      var params = {
        name: this.newProfessorName,
        title: this.newProfessorTitle,
        school: this.newProfessorSchool,
        department: this.newProfessorDepartment,
      };
      axios
        .post("/professors/", params)
        .then(response => {
          console.log(response.data);
          this.$router.push("/professors");
        })
        .catch(error => {
          console.log("photos create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
