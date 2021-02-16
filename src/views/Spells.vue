<template>
  <div>
    <div>
      <button @click="offset += 1">Next Entry</button>
      <button @click="offset -= 1" :disabled="offset - 1 < 0">Previous Entry</button>
    </div>
    <div>
      <span id="stat-block" v-html="pg[0]['full_text']"></span>
    </div>
  </div>
</template>

<script>
import {pg} from 'vue-postgrest'

export default {
  name: "Bestiary",
  mixins: [pg],
  data() {
    return {
      offset: 0
    }
  },
  computed: {
    pgConfig() {
      return {
        route: 'spell',
        query: {select: ['id', 'name','full_text']},
        limit: 1,
        offset: this.offset
      }
    },
    bestiary() {
      return this.pg
    }
  },
  onError(err) {
    console.log(err)
  }
}

</script>

<style scoped>

div {
  display: flex;
  flex-direction: column;
}

p {
  margin: 0;
}


#stat-block {
  padding: 1vmin;
  text-align: left;
  max-width: 50vmax;
  min-width: 50px;
  text-shadow: 2px 2px 4px #000000;
  color: white;
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


button {
  background-color: rgba(255, 127, 127, 0.75);
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.2s;
  height: 10vmin;
  margin-top: 1vmin;
  width: 10vmin;
}

button:hover {
  background-color: darkred; /* Green */
  color: white;
}
</style>



