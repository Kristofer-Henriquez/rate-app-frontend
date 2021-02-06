<template>
  <div id="app">
    <div id="logo">
      <img src="./Images/LogoMakr-5k2t6X.png" />
    </div>
    <div id="nav">
      <router-link to="/professors" style="color: #f8ae0ff3; font-size:46px">All Professors</router-link>
      <div></div>
      <router-link to="/professorsNew" style="color: #f8ae0ff3; font-size:46px">New Professor</router-link>
      <!-- <div></div>
      <router-link to="/signup" style="color: #f8ae0ff3; font-size:46px">  Signup |</router-link>
      <router-link to="/login" style="color: #f8ae0ff3; font-size:46px">  Login |</router-link>
      <router-link to="/logout" style="color: #f8ae0ff3; font-size:46px">  Logout</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f8ae0ff3;
}
#nav {
  padding: 30px;
}
body {
  background-image: url("./Images/cqSJ92.jpg");
  background-size: auto;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
