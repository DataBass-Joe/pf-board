<template>

  <div>
    <a v-on:click="toggleKey = !toggleKey">{{ entryName }}</a>
    <span v-show="toggleKey" v-html="fulltext">{{ content }}</span>


  </div>

</template>

<script>

export default {
  name: "List",
  data() {
    return {
      toggleKey: false
    }
  },
  props: {
    fulltext: String,
    entryName: String,
    content: String
  }

}
</script>

<style scoped>

span {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .10), #112e56);
  background-blend-mode: color;
  border: solid 10px rgba(0 0 0 .5);
  margin: .5vmin;
  padding: .5vmin;
}

</style>
