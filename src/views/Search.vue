<template>
  <div id="page">

    <div id="search">


      <p>Select a Source Table:</p>

      <select v-model="entry.table">
        <option disabled value="">Please select one</option>
        <option>item</option>
        <option>spell</option>
        <option>bestiary</option>
      </select>


      <p>Search by Name: {{ nameSearch }}</p>


      <input v-model="nameSearch" placeholder="search for Entries by Name Here">

      <p>Search by Full-Text: {{ descSearch }}</p>

      <input v-model="descSearch" placeholder="search for Entries by Description Here">
      <br>

      <div id="search-results" v-if="nameSearch !== '' || descSearch !== ''">

        <p>Results Shown: {{ pg.length }}</p>
        <br>


        <span v-for="text in pg" v-bind:key="text.id">
          <span v-bind:entry-name="text.name" v-on:click="entry.entryID = text.id">{{ text.name }}</span>

        </span>

        <button v-on:click="offset += 30" :disabled="offset + 30 > pg.length + offset">Next</button>
        <button @click="offset -= 30" :disabled="offset - 1 < 0">Back</button>

      </div>


    </div>

    <div id="stat-block">

      <div id="nav">

        <span @click="entry.entryID = num + 10" v-for="num in 10" v-bind:key="num">{{ num }}</span>

      </div>
      <div id="content">

        <FullText v-bind.sync="entry"/>


      </div>
    </div>


  </div>
</template>

<script>
import FullText from "@/components/FullText";
import {pg} from "vue-postgrest";

export default {
  name: "Search",
  mixins: [pg],
  components: {
    FullText
  },
  data() {
    return {
      entry: {
        entryID: 'bestiary',
        table: String
      },
      nameSearch: '',
      counter: 0,
      descSearch: '',
      offset: 0,
    }
  },
  computed: {
    pgConfig() {
      return {
        route: this.entry.table,
        query: {
          select: ['*'],
          'name.ilike': '*' + this.nameSearch + '*',
          'fulltext.ilike': '*' + this.descSearch + '*'
        },
        limit: 30,
        offset: this.offset
      }
    }
  },
}

</script>

<style scoped>


p {
  margin: 0;
}


#stat-block {
  background-image: radial-gradient(rgba(0, 0, 0, .0), rgba(0, 0, 255, .10), rgba(0, 0, 0, .0));
  background-blend-mode: color;
  border: solid 10px rgba(0 0 0 .5);
  margin: .5vmin;
  padding: .5vmin;
  width: 100%;

}

#search {
  display: flex;
  flex-direction: column;
  min-width: 20rem;
}

#search-results {
  display: flex;
  flex-direction: column;

}

#page {
  display: flex;
  justify-content: space-between;
  align-content: center;


}

input, select {
  margin: 1vmin 0 1vmin 0;
}


@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  [id*="page"] {
    flex-wrap: wrap;
  }

  [id*="search"] {
    width: 100%;

  }
}

</style>



