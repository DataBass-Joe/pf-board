<template>
  <div>
    <span v-html="pg[0]['fulltext']"></span>
  </div>
</template>

<script>
import {pg} from 'vue-postgrest'

export default {
  name: "Bestiary",
  mixins: [pg],
  data() {
    return {
      pgConfig: {
        route: 'bestiary',
        query: {select: ['id', 'name', 'fulltext']},
        limit: 1
      }

    }
  }, computed: {
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


</style>
