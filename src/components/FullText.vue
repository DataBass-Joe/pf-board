<template>

  <div>
    <span v-for="entry in this.pg" v-bind:key="entry.id"
          id="stat-block">

          <span v-html="entry.fulltext"></span>

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
          'id.eq': this.entryID,
        },
        limit: 30,
      }

    }
  },

}
</script>
