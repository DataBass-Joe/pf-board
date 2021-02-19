<template>


  <div>

    <p>Searching {{ route }} by Name: {{ nameSearch }}</p>


    <input v-model="nameSearch" placeholder="search for Entries by Name Here">
    <br>

    <p>Searching by Description: {{ descSearch }}</p>

    <input v-model="descSearch" placeholder="search for Entries by Description Here">
    <br>


    <p>Results Shown: {{ pg.length }}</p>
    <br>


    <span v-for="entry in pg" v-bind:key="entry.id"
          id="stat-block">
      <List v-bind:entry-name="entry.name"
            v-bind:fulltext="entry.fulltext"
      />



        </span>
    <button v-on:click="offset += 30" :disabled="offset + 30 > pg.length + offset">Next</button>
    <button @click="offset -= 30" :disabled="offset - 1 < 0">Back</button>

  </div>

</template>


<script>
import {pg} from 'vue-postgrest'
import List from "@/components/List";

export default {
  name: "Result",
  components: {
    List
  },
  mixins: [pg],
  props: {
    route: String
  },
  data() {
    return {
      nameSearch: '',
      counter: 0,
      descSearch: '',
      offset: 0,

    }
  },
  computed: {
    pgConfig() {
      return {
        route: this.route,
        query: {
          select: ['*'],
          'name.ilike': '*' + this.nameSearch + '*',
          'description.ilike': '*' + this.descSearch + '*'
        },
        limit: 30,
        offset: this.offset
      }
    }
  }
}
</script>

<style scoped>

div {
  display: flex;
  flex-direction: column;
}

button {
  background-color: rgba(0, 0, 255, 0.25);
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.2s;
  height: auto;
  margin-top: 1vmin;
  width: 5rem;
}

button:hover {
  background-color: rgba(0, 0, 255, 0.5); /* Green */
  color: white;
}

button:disabled {
  background-color: grey;
}

input {
  width: 20rem;
  margin: 1vmin 0 1vmin 0;
}

</style>
