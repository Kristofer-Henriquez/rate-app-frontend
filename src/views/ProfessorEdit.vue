<template>
  <div class="professor-edit">
    <form v-on:submit.prevent="submit()">
      <h1>Edit this professor!</h1>

      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      
      <h1>{{ professor.name}}</h1>
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
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      errors: [],
      professor: {},
    };
  },
  mounted() { 
    axios.get("/professors/" + this.$route.params.id).then(response => {
      console.log(response.data);
      this.professor = response.data;
    });
  },
  methods: {
    submit: function() {
      var params = {
        name: this.professor.name,
        school: this.professor.school,
        title: this.professor.title,
        department: this.professor.department,
      };
      axios
        .put(`/professors/${this.$route.params.id}`, params)
        .then(response => {
          this.$router.push("/professors");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
