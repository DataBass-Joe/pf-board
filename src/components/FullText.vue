<template>

  <div id="stat-block">

    <a href="javascript:void(0)" v-bind:class="{ bestiary: isBestiary}" class="closebtn" v-on:click="$emit('closeSpell', {
        name: name,
        entryID: entryID,
        table: table
      })">&times;</a>


    <span v-for="entry in this.pg" v-bind:key="entry.id">

          <span v-html="entry.fulltext"></span>
      <br>
      <span id="right">Source: {{ entry.source }}</span>

    </span>


  </div>

</template>

<script>
import {pg} from "vue-postgrest";

export default {
  name: "FullText",
  mixins: [pg],
  props: {
    entryID: Number,
    table: String,
    name: String,
    source: String,
    alternateNameForm: String,
    thirdParty: Number
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
        limit: 30
      }

    },
    isBestiary() {
      if (this.table === 'bestiary') {
        return true
      }
      return false
    }
  },

}
</script>

<style scoped>

div {
  background-color: rgba(0, 0, 0, .25);
  padding: 1vmin;

}

.closebtn {
  position: relative;
  z-index: 30;
  float: right;
  right: clamp(16px, 1vw, 1.5vmin);
  font-size: 36px;
  color: white;
  text-decoration: none;
  align-self: flex-end;
}

.bestiary {
  top: clamp(32px, 1vw, 1.5vmin);
}

#right {
  display: flex;
  flex-direction: row-reverse;
}

</style>
