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


      <input v-model="nameSearch" placeholder="search for Entries by Name Here"/>

      <p>Search by Full-Text: {{ descSearch }}</p>

      <input v-model="descSearch" placeholder="search for Entries by Description Here"/>

      <p>Filter by Full-Text: {{ descFilter }}</p>

      <input v-model="descFilter" placeholder="search for Entries by Description Here"/>
      <br>


      <div id="search-results" v-if="nameSearch !== '' || descSearch !== ''">

        <p>Results Shown: {{ pg.length }}</p>
        <br>

        <table>
          <tr>
            <th>Name</th>

            <th v-if="searchEntry.table === 'bestiary'">CR</th>
            <th v-if="searchEntry.table === 'item'">CL</th>
            <th v-if="searchEntry.table === 'spell'">SLA Level</th>

            <th>Source</th>


          </tr>


          <tr v-for="text in pg" v-bind:key="text.id"
              v-on:click="makeTab(text.name, text.id, searchEntry.table, text.source, text.alternatenameform, text.third_party)">

          <td class="entry-name">          <span v-bind:entry-name="text.name">
                                                 {{ text.name }}<sup
              v-if="text.alternatenameform"> ({{ text.alternatenameform }})</sup>
            </span>
          </td>
            <td class="center" v-if="searchEntry.table === 'bestiary'">{{ text.cr }}</td>
            <td class="center" v-if="searchEntry.table === 'item'">{{ text.cl }}</td>
            <td class="center" v-if="searchEntry.table === 'spell'">{{ text.SLA_Level }}</td>
            <td id="source">{{ text.source }}<sup v-if="searchEntry.table === 'bestiary' && text.third_party === 1">3pp</sup></td>


          </tr>
        </table>

        <button @click="offset += 30" :disabled="offset + 30 > pg.length + offset">Next</button>
        <button @click="offset -= 30" :disabled="offset - 1 < 0">Back</button>

      </div>


    </div>


    <LineChart v-if="this.pg !== []" v-bind:data="this.pg"/>


    <div id="stat-block">

      <div id="nav">


      </div>
      <div id="content">
        <div id="dynamic-component-demo" class="demo">
          <button
              v-for="tab in tabs"
              v-bind:key="tab.entryID"
              v-bind:class="['tab-button', { active: currentTab.name === tab.name && currentTab.entryID === tab.entryID,
              'third-party': tab.thirdParty === 1}]"
              v-on:click="currentTab = tab; entry = tab;"
          >
            {{ tab.name }}<sup v-if="tab.alternateNameForm">{{ tab.alternateNameForm }}</sup>
          </button>

        </div>

        <div id="info-sheet" v-show="tabs.length !== 0">
          <FullText v-bind.sync="currentTab"
                    @closeSpell="closeInfo"/>
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

      get: function () {
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
      let select = ['id', 'name', 'fulltext', 'source']

      if (this.searchEntry.table === 'bestiary') {
        order = ['cr.desc.nullslast']
        select = ['id', 'name', 'cr', 'ac', 'fulltext', 'alignment', 'third_party', 'source', 'alternatenameform']
      }
      if (this.searchEntry.table === 'item') {
        order = ['cl.desc.nullslast']
        select = ['id', 'name', 'fulltext', 'source', 'cl']
      }

      if (this.searchEntry.table === 'spell') {
        order = ['SLA_Level.desc.nullslast']
        select = ['id', 'name', 'fulltext', 'source', 'SLA_Level']
      }

      let filter = '';
      if (this.descFilter === '') filter = ''
      else filter = '*' + this.descFilter + '*'

      return {
        route: this.searchEntry.table,
        query: {
          select: select,
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
    makeTab(name, entryId, table, source, alternateNameForm, thirdParty) {

      let newTab = {
        name: name,
        entryID: entryId,
        table: table,
        source: source,
        alternateNameForm: alternateNameForm,
        thirdParty: thirdParty
      }

      let contains = this.tabs.some(elem => {
        return JSON.stringify(newTab) === JSON.stringify(elem);
      });
      if (!contains) {

        this.tabs.push(newTab);

      }

      this.currentTab = newTab


    },
    closeInfo: function (tab) {

      let arrayLength = this.tabs.length

      for (let i = 0; i < arrayLength; i++) {

        let word = this.tabs[i]

        if ((word.name === tab.name)
            && (word.entryID === tab.entryID)
            && (word.table === tab.table)) {

          this.tabs.splice(i, 1)

          this.currentTab = this.tabs[i - 1]

        }
      }
    }
  }


}
</script>

<style scoped lang="scss">

p {
  margin: 0;
}


.stat-block {
  background-blend-mode: color;
  //border: solid 10px rgba(0, 0, 0, .5);


}

#content {
  padding: 1vmin;
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

#entry-name:hover {
  background: rgba(0, 0, 0, .5);
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


.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #cccccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;

  &:hover {
    background: #e0e0e0;
  }

  &.active {
    background: #e0e0e0;
  }

  &.third-party {
    background-color: rgba(255, 200, 200, 1);
  }

  &.third-party.active {
    background-color: rgba(255, 164, 164, 1);

  }
}

.tab {
  border: 1px solid #ccc;
  padding: 10px;
}

#search-results tr:nth-child(even) {
  background-color: rgba(0, 0, 0, .25);
}

#search-results tr:hover {
  background-color: rgb(159, 149, 111);
}



#search-results td {
  display: table-cell;
  height: 100%;

}

#source {
  display: block;
  text-align: right;
}

.center {
  display: block;
  text-align: center;
}



</style>


