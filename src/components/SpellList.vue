<template>

  <div id="p">

    <b v-on:click="toggleKey = !toggleKey">{{ caster.name }} Spells <span
        v-if="caster.casting === 'spontanious' ">Known</span> (CL
      {{ caster.casterLevel }})</b>

    <div class="spells" v-for="(spellList, level) in caster.spellsPrepared"
         v-bind:key="level">

      <div v-show="toggleKey"><b>{{ level }}: </b>
        <i v-for="(spell, index) in spellList" v-bind:key="index">{{ spell }}<span
            v-if="index !== spellList.length - 1">, </span>
        </i>

      </div>

    </div>

  </div>


</template>

<script>
export default {
  name: "SpellLevel",
  data() {
    return {
      toggleKey: true
    }
  },
  props: {
    caster: Object
  }
}
</script>

<style scoped>

.spells {
  text-indent: 4rem;
  margin: .5vmin;
}

b {
  margin: .5vmin;
}

</style>
