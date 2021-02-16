<template>
  <div>

    <p>Searching For: {{ message }}</p>

    <input v-model="message" placeholder="search for Entries by Name Here">
    <br>


    <div v-if="message !== ''">

      <p>Results Shown: {{ pg.length }}</p>
      <br>


      <span v-for="entry in pg" v-bind:key="entry.id"
            id="stat-block">
      <Search v-bind:entry-name="entry.name"
              v-bind:fulltext="entry.full_text"
      />


    </span>

    </div>

    <button v-on:click="offset += 30" :disabled="offset + 30 > pg.length + offset">Next</button>
    <button @click="offset -= 30" :disabled="offset - 1 < 0">Back</button>


  </div>
</template>

<script>
import {pg} from 'vue-postgrest'
import Search from "@/components/Search";

export default {
  name: "Spells",
  mixins: [pg],
  data() {
    return {
      offset: 0,
      message: '',
      route: 'spell',
      counter: 0
    }
  },
  computed: {
    pgConfig() {
      return {
        route: this.route,
        query: {
          select: ['*'],
          'name.ilike': '*' + this.message + '*',
        },
        limit: 30,
        offset: this.offset
      }
    }
  },
  onError(err) {
    console.log(err)
  },
  components: {
    Search
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
  padding: .1vmin;
  text-align: left;
  max-width: 50vmax;
  min-width: 50px;
  text-shadow: 2px 2px 4px #000000;
  color: white;
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
  height: auto;
  margin-top: 1vmin;
  width: 10vmin;
}

button:hover {
  background-color: darkred; /* Green */
  color: white;
}

button:disabled {
  background-color: grey;
}

input {
  width: 20vmin;
  margin: 1vmin 0 1vmin 0;
}


</style>



