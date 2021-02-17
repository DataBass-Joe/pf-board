<template>
  <div id="sheet">
    <Sheet
        v-bind:character="character"
    />


  </div>
</template>

<script>
import Sheet from "@/components/Sheet";

export default {
  name: "Charlotte",
  data() {
    return {
      character: {

        characterName: "Charlotte",
        feats: ['Selective Channel', 'Extra Channel', 'Purifying Chanel', 'Quick Channel'],
        alignment: "LG",
        pointBuy: {
          strength: 7,
          dexterity: 13,
          constitution: 14,
          intelligence: 7,
          wisdom: 20,
          charisma: 18
        },


        race: "Aasimar",
        size: "medium",
        type: "humanoid",
        subtype: ['human'],
        speed: 30,
        favoredClassBonus: 1,
        languages: ['Celestial', 'Common'],


        class: [
          {
            name: "Cleric",
            hitDie: 8,
            archetypeName: "Angelfire Apostle",
            level: 6,
            domains: ['Fire', 'Glory'],
            spellsPrepared: {
              '3rd': ['Prayer'],
              '2nd': ['Protection from Evil, Communal x2'],
              '1st': ['Bless x2', 'Shield of Faith x2'],
              orisons: ['Detect Magic', 'Spark', 'Light', 'Guidance']
            }
          }],


        armorBonus: 5,
        resistanceBonus: 1,
        gestalt: false,
        soloPlayer: false,

        weapon: [
          {
            name: 'Stella\'s Cutlass',
            diceCount: 1,
            diceSize: 6,
            damageType: ['slashing'],
            weaponType: 'melee',
            critRange: 15,
            critMult: 2,
            weight: 4,
            proficiency: 'martial',
            catagory: 'one-handed',
            group: 'heavy blades',
            enchantment: ['+1', 'Keen', 'Holy']
          },
          {
            name: 'The Furies\' Longbow',
            diceCount: 1,
            diceSize: 8,
            damageType: ['slashing'],
            weaponType: 'melee',
            critRange: 20,
            critMult: 3,
            weight: 3,
            proficiency: 'martial',
            catagory: 'one-handed',
            group: 'heavy blades',
            enchantment: ['+1', 'Flaming', 'Composite']
          }
        ]

      },

    }
  },
  components: {
    Sheet
  }
}
</script>

<style scoped>

#sheet {
  flex-direction: column;
  text-shadow: 2px 2px 4px #000000;
  color: white;
  justify-content: start;
  font-size: 1.5vh;
  text-align: left;
  align-items: baseline;
  padding: 2vmin;
  background-image: url("../assets/j-jp-.jpg");
  background-repeat: no-repeat;
  height: 90vh;
  background-position: 50% 40%;

  background-size: 200vmin;

  max-width: 150vmin;


}
</style>
