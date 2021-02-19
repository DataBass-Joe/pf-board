<template>
  <div id="page">

    <div>
    <span v-for="table in route" v-bind:key="table">
      <Result v-bind:route="table"/>
    </span>
    </div>

    <div id="stat-block" v-html="statBlock">


    </div>

  </div>
</template>

<script>
import Result from "@/components/Result";

export default {
  name: "Search",
  components: {
    Result
  },
  data() {
    return {
      route: ['bestiary', 'spell', 'item']
    }
  },
  computed: {
    statBlock() {
      return 1
    }
  }
}

</script>

<style scoped>


p {
  margin: 0;
}


#stat-block {
  width: 50vw;
  height: 50vh;
  background-image: linear-gradient(45deg,rgba(0, 0, 0, .10), #112e56, #835810 );
  background-blend-mode: color;
  border: solid 10px rgba(0 0 0 .5);
  margin: .5vmin;
  padding: .5vmin;
}

#page > div {
  display: flex;
}

#page {
  display: flex;
  justify-content: space-between;
}


</style>



