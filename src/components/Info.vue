<template>

  <div>

    <a href="javascript:void(0)" class="closebtn" v-on:click="$emit('closeInfo', '')">&times;</a>


    <span  v-for="entry in this.pg" v-bind:key="entry.id"
           id="stat-block">

          <span>
            <h1>{{ entry.name }}</h1>
            {{entry.description}}
          </span>

    </span>


  </div>

</template>

<script>
import {pg} from "vue-postgrest";

export default {
  name: "Info",
  mixins: [pg],
  props: {
    entryID: Number,
    table: String,
    name: String
  },
  data() {
    return {
      toggleKey: true
    }
  },
  computed: {
    pgConfig() {
      return {
        route: this.table,
        query: {
          select: ['*'],
          or: {
            'id.eq': this.entryID,
            'name.ilike': this.name
          }
        },
        limit: 30,
      }

    }
  },

}
</script>

<style scoped>

div {
  background-color: rgba(0, 0, 0, .25);
  padding: 1vmin;
  margin: 1vmin;

}

h4 {

}

.closebtn {
  position: relative;
  float: right;
  font-size: 36px;
  color: white;
  text-decoration: none;
}

</style>
