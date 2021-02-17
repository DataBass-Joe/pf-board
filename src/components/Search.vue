<template>

  <div>
    <a v-on:click="toggleKey = !toggleKey">{{ entryName }}</a>
    <span v-show="toggleKey" v-html="fulltext">{{ content }}</span>

  </div>

</template>

<script>

export default {
  name: "Search",
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
  background-color: #111456;
  background-blend-mode: color;
  border: solid 10px rgba(0 0 0 .5);
  padding: 1vmin;
}

</style>
