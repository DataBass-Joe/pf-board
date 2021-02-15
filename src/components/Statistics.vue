<template>

  <div id="statistics">

    <b> STATISTICS</b>

    <hr>

    <p>
        <span v-for="(score, key, index) in abilityScores" v-bind:key="index"><b
            class="capitalize"> {{ key.substr(0, 3) }}</b> {{ score }}<span
            v-if="index !== Object.keys(abilityScores).length - 1">, </span>
        </span>
    </p>
    <p>
      <b> Base Atk </b> {{ makeBonus(bab) }};
      <b> CMB </b> {{ makeBonus(cmb(strMod, bab)) }};
      <b> CMD </b> {{ makeBonus(cmd(strMod, bab, dexMod)) }}
    </p>
    <p>
      <b> Feats </b>
      <span v-for="(feat, index) in feats" v-bind:key="index">{{ feat }}<span
          v-if="index !== feats.length - 1">, </span>
        </span>
    </p>
    <p>
      <b> Skills </b>
      <span class="capitalize" v-for="(bonus, skill, index) in skills" v-bind:key="index">{{
          skill
        }} +{{ bonus }}<span
            v-if="index !== Object.keys(skills).length - 1">, </span>
        </span><b> Racial Modifiers </b>
      +2 Diplomacy, +2 Perception
    </p>
    <p>
      <b> Languages </b>
      Celestial,
      Common
    </p>
  </div>


</template>

<script>
export default {
name: "Statistics",
  props: {
    abilityScores: Object,
    bab: Number,
    strMod: Number,
    dexMod: Number,
    feats: Array,
    skills: Object

  },
  methods: {
    cmb(strMod, bab) {
      return strMod + bab
    },
    cmd(strMod, bab, dexMod) {
      return strMod + bab + 10 + dexMod
    },
    makeBonus(bonus) {
      let text = ''
      if (bonus < 0) {
        text = bonus
      } else {
        text = '+' + bonus
      }
      return text
    }

  }
}
</script>

<style scoped>
p {
  margin: 0;
}

.capitalize {
  text-transform: capitalize;
}
</style>
