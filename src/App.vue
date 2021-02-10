<template>
  <div id="app">
    <div id="nav"> <!--v-bind:style="styleObject">-->
      <router-link to="/home">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/bestiary">Bestiary</router-link>
      |
      <router-link to="/">Hide</router-link>
    </div>
    <router-view/>
  </div>
</template>


<script>

//
//function getAverageRGB(imgEl) {
//
//  var blockSize = 5, // only visit every 5 pixels
//      defaultRGB = {r: 0, g: 0, b: 0}, // for non-supporting envs
//      canvas = document.createElement('canvas'),
//      context = canvas.getContext && canvas.getContext('2d'),
//      data, width, height,
//      i = -4,
//      length,
//      rgb = {r: 0, g: 0, b: 0},
//      count = 0;
//
//  if (!context) {
//    return defaultRGB;
//  }
//
//  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
//  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
//
//  context.drawImage(imgEl, 0, 0);
//
//  try {
//    data = context.getImageData(0, 0, width, height);
//  } catch (e) {
//    /* security error, img on diff domain */
//    return defaultRGB;
//  }
//
//  length = data.data.length;
//
//  while ((i += blockSize * 4) < length) {
//    ++count;
//    rgb.r += data.data[i];
//    rgb.g += data.data[i + 1];
//    rgb.b += data.data[i + 2];
//  }
//
//  // ~~ used to floor values
//  rgb.r = ~~(rgb.r / count);
//  rgb.g = ~~(rgb.g / count);
//  rgb.b = ~~(rgb.b / count);
//
//  return rgb;
//
//}
//
//let r = getAverageRGB("assets/j-jp-.jpg")['r']
//let g = getAverageRGB("assets/j-jp-.jpg")['g']
//let b = getAverageRGB("assets/j-jp-.jpg")['b']
//
//let x = ''


export default {
  name: 'App'
  // ,
  // data: function () {
  //   return {
  //     styleObject: {"background-color": x.concat("rgba(", r, ',', g, ',', b, ',.5')}
  //
  //   };
  // }
}

</script>


<style>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
  color: #600;
  display: flex;
  /*background-color: rgba(255, 127, 127, 0.75);*/
  margin: 1vmin;
  align-items: center;
}


body {
  margin: 0;
}


#nav {
  padding: 30px;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  background-color: rgba(255, 127, 127, 0.90);

}

#nav a {
  font-weight: bold;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #000000;
}
</style>
