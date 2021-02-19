<template>
  <div id="app">


    <div id="nav" v-on:scroll="handleScroll" v-bind:class="{ active: isActive }">
      <router-link to="/">Home</router-link>
      <router-link to="/search">Search</router-link>
      <div class="dropdown">
        <button class="dropbtn">Character Sheets</button>
        <div class="dropdown-content">
          <router-link to="/charlotte">Charlotte</router-link>
          <router-link to="/immogen">Immogen</router-link>
        </div>
      </div>


    </div>
    <router-view/>

  </div>
</template>


<script>


export default {
  name: 'App',
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
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



.scrolled-down {
  transform: translateY(-100%);
  transition: all 0.3s ease-in-out;
}

.scrolled-up {
  transform: translateY(0);
  transition: all 0.3s ease-in-out;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html {
  background-image: url("assets/j-jp-.jpg");
  background-repeat: no-repeat;
  /*background-image: linear-gradient(60deg, rgba(7%, 18%, 34%, 1), rgba(0, 0, 255, .25));*/
  background-attachment: fixed;
  text-shadow: 2px 2px 4px #000000;


}


#app {
  /*box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);*/
  color: #ffffff;
  display: flex;
  flex-direction: column;

  /*background-color: rgba(255, 127, 127, 0.75);*/
}


#nav {
  background-color: rgba(0, 0, 0, .25);
  display: flex;
  flex-direction: row;
  overflow-x: hidden; /* Disable horizontal scroll */
  justify-content: center;
  align-items: center;
  margin: 1rem;
}

#nav * {
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  text-align: center;
  font-size: 3vmin;
  margin: 0 1vmin;
  padding: .5vmin;

  /*display: block;*/
  /*width: 15vw;*/

}

#nav a.router-link-exact-active {
  color: rgb(0, 0, 0);
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;

}

#nav a:hover {
  color: rgb(0, 0, 0);
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}



h5, h1, h2, h3, h4, p {
  margin: 0;
  margin-block-start: 1px;
  margin-block-end: 0;
}

p.alignleft {
  float: left;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1vmin;
}

p.alignright {
  float: right;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  text-indent: 10px;
}


/* Navbar container */
.navbar {
  overflow: hidden;
  background-color: rgba(0, 0, 0, .25);

}

/* Links inside the navbar */
.navbar a {
  float: left;
  font-size: 16px;
  color: inherit;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* The dropdown container */
.dropdown {
  float: left;
  overflow: hidden;
}

/* Dropdown button */
.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  background-color: rgba(0, 0, 0, .25);;
  padding: 14px 16px;
  /*background-color: inherit;*/
  font-family: inherit; /* Important for vertical align on mobile phones */
  margin: 0; /* Important for vertical align on mobile phones */
}

/* Add a red background color to navbar links on hover */
.navbar a:hover, .dropdown:hover .dropbtn {
  /*background-color: red;*/
}

/* Dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;

}

/* Links inside the dropdown */
.dropdown-content a {
  float: none;
  color: black;
  text-decoration: none;
  display: block;
  text-align: center;

}

/* Add a grey background color to dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}




</style>
