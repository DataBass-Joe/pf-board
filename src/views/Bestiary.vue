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
              v-bind:fulltext="entry.fulltext"
      />


    </span>

    </div>

    <button v-on:click="offset += 30" :disabled="offset + 30 > pg.length + offset">Next</button>
    <button @click="offset -= 30" :disabled="offset - 1 < 0">Back</button>


  </div>
</template>

<script>
import {pg} from 'vue-postgrest'
import Search from "@/components/List";

export default {
  name: "Bestiary",
  mixins: [pg],
  data() {
    return {
      offset: 0,
      message: '',
      route: 'bestiary',
      counter: 0
    }
  },
  computed: {
    pgConfig() {
      return {
        route: this.route,
        query: {
          select: ['name', 'id', 'fulltext'],
          'name.ilike': '*' + this.message + '*',
          'third_party.eq': 0
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




