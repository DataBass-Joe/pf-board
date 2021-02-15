<template>
  <div id="base">


    <div> {{ characterRace }} {{ characterClass }}</div>

    {{ alignment }} {{ size }} {{ type }} ({{ subtype }})


    <p>
      <b> Init </b> +{{ initiative }};
      <b> Senses </b>
      <span v-if="characterRace === 'Aasimar'"> darkvision 60 ft.;</span>
      Perception + {{ perception }}
    </p>


  </div>

</template>

<script>

export default {
  name: "Base",
  props: [
    'characterRace',
    'characterClass',
    'alignment',
    'size',
    'type',
    'subtype',
    'initiative',
    'perception'
  ],

}
</script>

<style scoped>

p {
  margin: 0;
}

</style>
