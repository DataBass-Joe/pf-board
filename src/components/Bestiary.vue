<template>
  <div>
    <div>
      <button @click="offset += 1">Next Entry</button>
      <button @click="offset -= 1" :disabled="offset - 1 < 0">Previous Entry</button>
    </div>
    <div>
      <span id="stat-block" v-html="pg[0]['fulltext']"></span>
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
        route: 'bestiary',
        query: {select: ['id', 'name', 'fulltext']},
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


#stat-block {
  padding: 1vmin;
  text-align: left;
  max-width: 50vmax;
  min-width: 50px;
  text-shadow: 2px 2px 4px #000000;
  color: white;
}



</style>


<style>




</style>
