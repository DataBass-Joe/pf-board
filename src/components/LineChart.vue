<template>
  <svg
      class="line-chart"
      :viewBox="viewBox"
  >
    <g :data="series">
      <g :fill="fill"></g>
      <rect
          class="line-chart__line"
          :x="x"
          :y="y"
          :width="width"
          :height="height"

      />
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'LineChart',
  props: {
    data: {
      required: true,
      type: Array,
    },
    width: {
      default: 500,
      type: Number,
    },
    height: {
      default: 270,
      type: Number,
    }
  },
  data() {
    return {
      padding: 60,
      margin: {top: 10, right: 10, bottom: 20, left: 40}
    };
  },
  computed: {

    series() {
      return d3.stack()
          .keys(Object.keys(this.data[0]))(this.data)
          .map(d => (d.forEach(v => v.key = d.key), d))
    },
    x() {
      const x = d3.scaleBand()
          .domain(d3.range(this.data.length))
          .range([this.margin.left, this.width - this.margin.right])
          .padding(0.1)

      let xCalc = (d) => x(d.name)

      return xCalc(this.data)

    },
    y() {
      const y = d3.scaleLinear()
          .domain([0, d3.max(this.series, d => d3.max(d, d => d[1]))])
          .rangeRound([this.height - this.margin.bottom, this.margin.top])

      let yCalc = d => y(d[1])

      return yCalc(this.data)
    },
    color() {
      return d3.scaleOrdinal()
          .domain(this.series.map(d => d.key))
          .range(d3.schemeSpectral[this.series.length])
          .unknown("#ccc")
    },
    viewBox() {
      return `0 0 ${this.width} ${this.height}`;
    },
    fill()  {
      return (d => this.color(d.key))
    }
  }
};
</script>


<style lang="sass">
.line-chart
  margin: 25px

  &__line
    fill: none
    stroke: #76BF8A
    stroke-width: 3px

svg
  background-color: rgba(0, 0, 0, .25)

g
  background-color: rgba(255, 183, 0, .5)
</style>
