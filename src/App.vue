<template>
  <div id="app">

    <Nav/>

    <router-view/>

  </div>
</template>


<script>
import Nav from "@/components/Nav";


export default {
  name: 'App',
  components: {Nav}
}
</script>

<style lang="scss">

$font-size: clamp(16px, 1vw, 1.5vmin);



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*color: #2c3e50;*/
  color: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);



}

html {
  /*background-image: url("assets/j-jp-.jpg");*/
  background-repeat: no-repeat;
  background-image: linear-gradient(60deg, rgba(7%, 18%, 34%, 1), rgba(0, 0, 255, .25));
  background-clip: padding-box	;
  background-size: cover;
  background-attachment: fixed;
  background-position: 50% 40%;
  text-shadow: 2px 2px 4px #000000;
}



h1 {
  font-size: 22;
}
h2 {
  font-size: 22;
  text-align:left;
}
h3 {
  font-size: 16;
  font-weight: normal;
}
h4 {
  text-align: justify;
  font-size: 16;
  font-weight: normal;
}
p {
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 1px;
  padding-left: 0px;
}
h5 {
  font-size: 16px;
  font-weight: normal;
}

h6 {
  font-size: 16px;
  font-weight: normal;
}


h5, h1, h2, h3, h4 {
  margin: 0;
  margin-block-start: 1px;
  margin-block-end: 0;
  font-size: $font-size;

}

p, span, b {
  font-size: $font-size;
}

p.alignleft {
  float: left;
  text-align: left;
  font-size: $font-size;
  font-weight: bold;
  margin-bottom: 1vmin;
}

p.alignright {
  float: right;
  text-align: right;
  font-size: $font-size;
  font-weight: bold;
  text-indent: 10px;
}

.heading p.alignleft{
  font-size: clamp(24px, 1.5vw, 2.025vmin);
  height: 100%;
}

</style>
