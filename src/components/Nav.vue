<template>

  <div id="nav">
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

</template>

<script>
export default {
  name: "Nav"
}


</script>

<style lang="scss" scoped>

$width: clamp(10vw, 35vmin, 200vmax);


#nav {
  background-color: rgba(0, 0, 0, .25);
  display: flex;
  overflow-x: hidden; /* Disable horizontal scroll */
  justify-content: center;
  align-items: center;
  margin: 1rem;

  a, .dropbtn, .dropdown-content {
    font-weight: bold;
    color: #ffffff;
    text-decoration: none;
    font-size: 3vmin;
    margin: 0 1vmin;
    /*padding: .5vmin;*/


  }

  a {
    align-self: center;
    align-content: center;
    justify-content: center;
  }

  a.router-link-exact-active {
    color: rgb(0, 0, 0);
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;

  }

  a:hover {
    color: rgb(0, 0, 0);
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
  }
}

.dropdown {

}


.dropdown .dropbtn {
  border: none;
  outline: none;
  color: white;
  background-color: rgba(0, 0, 0, .25);
  padding: 14px 16px;
  font-family: inherit; /* Important for vertical align on mobile phones */
  margin: 0; /* Important for vertical align on mobile phones */

  width: $width;

}


/* Dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: rgba(0, 0, 0, .25);

  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
  flex-direction: column;

  width: $width;
  margin: 1vmin;



  a {
    align-self: center;


  }



}



/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: flex;
}


</style>
