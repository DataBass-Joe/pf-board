<template>
  <div id="defense">
    <b> DEFENSE</b>

    <hr>

    <p>
      <b> AC </b>
      {{ armorClass }}, touch {{ touchAC }}, flat-footed {{ flatFootedAC }} (+{{ armorBonus }} armor)
    </p>
    <p>
      <b> hp </b>
      {{ hp }} ({{ hitDice }} {{ hpBonus * characterLevel }})
    </p>
    <p>
      <b> Fort </b> +{{ fort }},
      <b> Ref </b> +{{ reflex }},
      <b> Will </b> +{{ will }}
    </p>
    <p v-if="characterRace == 'Aasimar'">
      <b> Resist </b>
      acid 5, cold 5, electricity 5
    </p>
  </div>

</template>

<script>
export default {
  name: "Defense",
  props: [
    'armorClass',
    'touchAC',
    'flatFootedAC',
    'armorBonus',
    'fort',
    'reflex',
    'will',
    'hp',
    'classLevel',
    'classHitDie',
    'hpBonus',
    'characterRace',
    'hitDice',
    'characterLevel'

  ]
}
</script>

<style scoped>

p {
  margin: 0;
}

</style>
