<template>
  <div class="Professors-Create">
    <h2>New Professor</h2>

    <div style="width: 75rem; height: auto; margin: auto; border-color: black; border-radius: 15px; border-width: 5px">
      <b-card>
        <form v-on:submit.prevent="createProfessor()">
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-default">Professor Name:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="input-default"
                placeholder="Enter Professor's name"
                v-model="newProfessorName"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-default">Title:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="input-default"
                placeholder="Enter Professor's title"
                v-model="newProfessorTitle"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-default">School:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="input-default"
                placeholder="Enter Professor's School"
                v-model="newProfessorSchool"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-default">Department:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="input-default"
                placeholder="Enter Professor's Department"
                v-model="newProfessorDepartment"
              ></b-form-input>
            </b-col>
          </b-row>
          <input type="submit" value="Create" style="text-align: left;" />
        </form>
      </b-card>
    </div>
    <br>
    <br>
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
        .post("/api/professors/", params)
        .then(response => {
          console.log(response.data);
          this.$router.push("/professors");
        })
        .catch(error => {
          console.log("professor create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
