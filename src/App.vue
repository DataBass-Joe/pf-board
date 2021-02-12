<template>
  <div id="app">
    <button v-on:click="show = !show" id="toggle">
      &#9776;
    </button>
    <transition name="fade">
      <div v-if="show" id="nav" v-on-clickaway="away">
        <a href="javascript:void(0)" class="closebtn" v-on:click="show = false">&times;</a>
        <router-link to="/home">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/bestiary">Bestiary</router-link>
        <router-link to="/sheet">Character Sheet</router-link>
      </div>
    </transition>
    <router-view/>
  </div>
</template>


<script>
import {mixin as clickaway} from 'vue-clickaway';


export default {
  name: 'App',
  mixins: [clickaway],

  data: function () {
    return {
      show: false
    }
  },
  methods: {
    away: function () {
      this.show = false
    }
  }
}

</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.fade-enter, .fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}

#toggle {
  /*position: fixed;*/
  position: -webkit-sticky; /* Safari */
  position: sticky;
}

button {
  background-color: rgba(255, 127, 127, 0.75);
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.2s;
  height: 3vmin;
  margin-top: 1vmin;
}

button:hover {
  background-color: darkred; /* Green */
  color: white;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

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
  color: #ffffff;
  display: flex;
  /*background-color: rgba(255, 127, 127, 0.75);*/
}


#toggle {
  background-color: rgba(255, 127, 127, 0.90);
  position: fixed; /* Stay in place */
  z-index: 0; /* Stay on top */
  bottom: 0; /* Stay at the top */
  right: 0;
  padding: 1vmin;
  margin: 2.5vmin;
  overflow-x: hidden; /* Disable horizontal scroll */
  font-size: 4vmin;
  height:auto;

}

#nav a {
  font-weight: bold;
  color: #ffffff;
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  display: block;
}

#nav a.router-link-exact-active {
  color: rgb(255, 0, 0);
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;

}

#nav a:hover {
  color: rgb(255, 0, 0);
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}


/* The side navigation menu */
#nav {
  background-color: rgba(255, 127, 127, 1);
  height: 100%; /* 100% Full-height */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  flex-direction: column;
}


/* Position and style the close button (top right corner) */
#nav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
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

li {
  text-indent: 0;
}
</style>
