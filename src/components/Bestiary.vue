<template>
  <div>
      <span id="stat-block" v-html="pg[0]['fulltext']"></span>
  </div>
</template>

<script>
import {pg} from 'vue-postgrest'

export default {
  name: "Bestiary",
  mixins: [pg],
  data() {
    return {
      pgConfig: {
        route: 'bestiary',
        query: {select: ['id', 'name', 'fulltext']},
        limit: 1
      }
    }
  }, computed: {
    bestiary() {
      return this.pg
    }
  },
  onError(err) {
    console.log(err)
  }
}

</script>

<style>





#stat-block {
  padding: 1vmin;
  text-align: left;
  max-width: 50vmax;
  min-width: 50px;
  text-shadow: 2px 2px 4px #000000;
  color:white;
}
h5 {
  font-size: 16px;
  font-weight: normal;
  padding:0;
  margin:1vmin;
}


div.heading {
  height: 30px;
}

h1 {
  font-size: 22px;
}

h2 {
  font-size: 22px;
  text-align: left;
}

h3 {
  font-size: 16px;
  font-weight: normal;
}

h4 {
  text-align: justify;
  font-size: 16px;
  font-weight: normal;
}

p {
  margin: 0 0 1px;
  padding: 0 0 1px;
  color: white;
}

h6 {

  margin-left: 30px;
  font-size: 16px;
  font-weight: normal;
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
