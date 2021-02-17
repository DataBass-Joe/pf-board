<template>

</template>

<script>
export default {
  name: "Charlotte",
  data() {
    return {
      characterName: "Charlotte",
      feats: ['Selective Channel', 'Extra Channel', 'Purifying Chanel', 'Quick Channel'],
      alignment: "LG",
      abilityScores: {
        strength: 7,
        dexterity: 13,
        constitution: 14,
        intelligence: 7,
        wisdom: 20,
        charisma: 18
      },


      characterRace: "Aasimar",
      size: "medium",
      type: "humanoid",
      subtype: ['human'],
      speed: 30,


      className: "Cleric",
      classHitDie: 8,
      archetypeName: "Angelfire Apostle",
      classLevel: 6,
      domains: ['Fire', 'Glory'],
      spellsPrepared: {
        cleric : {
          '3rd': ['Prayer'],
          '2nd': ['Protection from Evil, Communal x2'],
          '1st': ['Bless x2', 'Shield of Faith x2'],
          orisons: ['Detect Magic', 'Spark', 'Light', 'Guidance']
        }
      },


      armorBonus: 5,
      resistanceBonus: 1

    }
  }
}
</script>

<style scoped>

</style>
