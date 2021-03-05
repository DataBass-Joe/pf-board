<template>
  <div id="page">
    <div id="search">


      <p>Select a Source Table:</p>

      <select v-model="searchEntry.table">
        <option disabled value="">Please select one</option>
        <option>item</option>
        <option>spell</option>
        <option>bestiary</option>
        <option>feat</option>
      </select>


      <p>Search by Name: {{ nameSearch }}</p>


      <input v-model="nameSearch" placeholder="search for Entries by Name Here">

      <p>Search by Full-Text: {{ descSearch }}</p>

      <input v-model="descSearch" placeholder="search for Entries by Description Here">

      <p>Filter by Full-Text: {{ descFilter }}</p>

      <input v-model="descFilter" placeholder="search for Entries by Description Here">
      <br>


      <div id="search-results" v-if="nameSearch !== '' || descSearch !== ''">

        <p>Results Shown: {{ pg.length }}</p>
        <br>

        <table>
          <tr>
            <th>Name</th>
            <th v-if="searchEntry.table === 'bestiary'">CR</th>
            <th v-if="searchEntry.table === 'item'">CL</th>
          </tr>


          <tr v-for="text in pg" v-bind:key="text.id">
          <span v-bind:entry-name="text.name"
                v-on:click="makeTab(text.name, text.id, searchEntry.table)"
          ><td>{{ text.name }}<sup v-if="text.third_party === 1">3pp</sup></td>
          </span>
            <td v-if="searchEntry.table === 'bestiary'">{{ text.cr }}</td>
            <td v-if="searchEntry.table === 'item'">{{ text.cl }}</td>

          </tr>
        </table>

        <button v-on:click="offset += 30" :disabled="offset + 30 > pg.length + offset">Next</button>
        <button @click="offset -= 30" :disabled="offset - 1 < 0">Back</button>

      </div>


    </div>


    <LineChart v-bind:data="pData"/>

    <div id="stat-block">

      <div id="nav">


      </div>
      <div id="content">
        <div id="dynamic-component-demo" class="demo">
          <button
              v-for="tab in tabs"
              v-bind:key="tab.name"
              v-bind:class="['tab-button', { active: currentTab.name === tab.name }]"
              v-on:click="currentTab = tab; entry = tab;"
          >
            {{ tab.name }}
          </button>

        </div>

        <div v-show="tabs.length !== 0">
          <FullText v-bind.sync="currentTab"/>
        </div>


      </div>
    </div>


  </div>
</template>


<script>
import FullText from "@/components/FullText";
import {pg} from "vue-postgrest";
import LineChart from "@/components/LineChart";

import * as d3 from "d3"


export default {
  name: "Search",
  components: {
    FullText,
    LineChart
  },
  mixins: [pg, d3],
  data() {
    return {
      entry: {
        entryID: 0,
        table: ''
      },
      searchEntry: {
        entryID: 0,
        table: ''
      },
      nameSearch: '',
      counter: 0,
      descSearch: '',
      descFilter: '',
      offset: 0,
      tabs: [],
      currentTab: Object
    }
  },
  computed: {
    pData: {

      get: function() {
        let resultLength = this.pg.length

        let tempResult = []

        for (let i = 0; i < resultLength; i++) {

          tempResult.push(this.pg[i].cr)

        }


        return tempResult
      }


    },
    pgConfig() {

      let order = ['name']

      if (this.searchEntry.table === 'bestiary') order = ['cr.desc.nullslast']
      if (this.searchEntry.table === 'item') order = ['cl.desc.nullslast']

      let filter = '';
      if (this.descFilter === '') filter = ''
      else filter = '*' + this.descFilter + '*'

      return {
        route: this.searchEntry.table,
        query: {
          select: ['*'],
          'name.ilike': '*' + this.nameSearch + '*',
          'fulltext.ilike': '*' + this.descSearch + '*',
          'fulltext.not.ilike': filter,
          order: order
        },
        limit: 30,
        offset: this.offset,
      }
    }

  },

  methods: {
    makeTab(name, entryId, table) {

      let newTab = {
        name: name,
        entryID: entryId,
        table: table
      }

      let contains = this.tabs.some(elem => {
        return JSON.stringify(newTab) === JSON.stringify(elem);
      });
      if (!contains) {

        this.tabs.push(newTab);

      }

      this.currentTab = newTab


    },

  }
}
</script>

<style scoped>


p {
  margin: 0;
}


#stat-block {
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

<style scoped>
.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}

.tab-button:hover {
  background: #e0e0e0;
}

.tab-button.active {
  background: #e0e0e0;
}

.tab {
  border: 1px solid #ccc;
  padding: 10px;
}


</style>


