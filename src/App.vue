<template>
  <div id="app">


      <div id="nav" v-on:scroll="handleScroll" v-bind:class="{ active: isActive }">
        <router-link to="/home">Home</router-link>
        <router-link to="/bestiary">Bestiary</router-link>
        <router-link to="/spells">Spells</router-link>
        <router-link to="/charlotte">Charlotte</router-link>
        <router-link to="/immogen">Immogen</router-link>

      </div>
    <router-view/>

  </div>
</template>


<script>


export default {
  name: 'App',
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll () {
      // Any code to be executed when the window is scrolled

    }
  },
  data() {
    return {
      isActive: true,
      hasError: false
    }
  }

}

</script>

<style>


.smart-scroll{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}
.scrolled-down{
  transform:translateY(-100%); transition: all 0.3s ease-in-out;
}
.scrolled-up{
  transform:translateY(0); transition: all 0.3s ease-in-out;
}



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html {
  /*background-image: url("assets/j-jp-.jpg");*/
  background-size: 100vmax;
  background-repeat: no-repeat;
  background-color: #112e56;
  background-position: center;
  background-attachment: fixed;

}


#app {
  /*box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);*/
  color: #ffffff;
  display: flex;
  flex-direction: column;
  /*background-color: rgba(255, 127, 127, 0.75);*/
}


#nav {
  /*background-color: rgba(255, 127, 127, 1);*/
  display: flex;
  flex-direction: row;
  overflow-x: hidden; /* Disable horizontal scroll */
}

#nav a {
  font-weight: bold;
  color: #ffffff;
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 2.5vmin;
  display: block;
}

#nav a.router-link-exact-active {
  color: rgb(0, 0, 0);
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;

}

#nav a:hover {
  color: rgb(0, 0, 0);
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}








/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  #nav {
    padding-top: 15px;
  }

  #nav a {
    font-size: 18px;
  }
}

h5, p {
  margin: 0;
  margin-block-start: 1px;
  margin-block-end: 0;
}

p.alignleft {
  margin-left: 0;
  text-indent: 10px;
  float: left;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  padding: 3px;
}

p.alignright {
  float: right;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  text-indent: 10px;
  padding: 3px;
}

</style>





