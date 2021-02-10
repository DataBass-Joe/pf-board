<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/bestiary">Bestiary</router-link>
    </div>
    <router-view/>
  </div>
</template>


<script>


export default {
  name: 'App'
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html {
  background-image: url("assets/j-jp-.jpg");
  background-size: 100vmax;
  background-repeat: no-repeat;
  background-color: #f36b42;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: row;
}


#app > div {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  color: #600;
  display: flex;
  background-color: rgba(255, 127, 127, 0.5);
  margin: 1vmin;
  align-items: center;
}


body {
  margin: 0;
}


#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
