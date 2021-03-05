<template>

</template>

<script>
import * as d3 from "d3"

export default {
  name: "BarChart",
  props: {
    data: Object
  },
  created() {
    this.colorScale = this.d3.interpolateOranges()
  }
}
</script>

<style scoped>

</style>
