<template>
  <div>
    <Sheet2
        v-bind:character="character"
        v-bind:computed-list="list"
    />


  </div>
</template>

<script>
import Sheet2 from "@/components/Sheet2";

export default {
  name: "Charlotte",
  data() {
    return {
      character: {

        name: "Charlotte",
        feats: ['Selective Channel', 'Extra Channel', 'Purifying Chanel', 'Quick Channel', 'Angelic Blood'],
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
        type: "outsider",
        subtype: ['native'],
        speed: 30,
        favoredClassBonus: 1,
        languages: ['Celestial', 'Common'],


        class: [
          {
            name: "Cleric",
            hitDie: 8,
            archetypeName: "Angelfire Apostle",
            level: 7,
            domains: ['Fire', 'Glory'],
            spellsPrepared: {
              '4th': [''],
              '3rd': ['Prayer'],
              '2nd': ['Protection from Evil, Communal', 'Protection from Evil, Communal'],
              '1st': ['Bless', 'Shield of Faith', 'Bless', 'Shield of Faith'],
              orisons: ['Detect Magic', 'Spark', 'Light', 'Guidance']
            }
          }],


        armorClassBonuses: [
          {
            name: 'Armor',
            bonus: 8,
            touch: false,
            flatFooted: true,
            maxDex: 8,
            armorCheckPenalty: -2
          }, {
            name: 'deflection',
            bonus: 2,
            touch: true,
            flatFooted: true
          }, {
            name: 'natural',
            bonus: 1,
            touch: false,
            flatFooted: true
          }, {
            name: 'insight',
            bonus: 1,
            touch: true,
            flatFooted: true
          },
        ],
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
        ],


        skill: {
          'Bluff': {ranks: 9},
          'Climb': {ranks: 1},
          'Diplomacy': {ranks: 10},
          'Disable Device': {ranks: 6},
          'Disguise': {ranks: 7},
          'Intimidate': {ranks: 7},
          'Knowledge':
              {
                ranks: 0,
                bonus: 'Bardic Knowledge'
              },
          'Linguistics': {ranks: 1},
          'Perception': {ranks: 10},
          'Ride': {ranks: 7},
          'Sense Motive': {ranks: 7},
          'Sleight of Hand': {ranks: 7},
          'Spellcraft': {ranks: 7},
          'Stealth': {ranks: 10},
          'Use Magic Device': {ranks: 1}
        }

      },

    }
  },
  components: {
    Sheet2
  },
  computed: {
    list:{
      classFeatures() {

        return {
          extraordinaryAbilities: {
            'Archaeologist\'s Luck': 3,
            'Uncanny Dodge': true,
            'Trap Sense': 3,
            'Lore Master': 1,
            'Evasion': true,
            'Oracle\'s Curse': ['Elemental Imbalance(fire)', 'Pranked'],
            'Misfortune': 1,
            'Fortune': 1
          },
          supernaturalAbilities: {
            'Erase From Time': 1,
            'Temporal Celerity': 1,
            'Rewind Time': 1
          },
          spellLikeAbilities: {
            'Cantrips': true
          },
          specialAbilities: {
            'Weapon Proficiency': ['simple weapons', 'longsword', 'rapier', 'sap', 'shortsword', 'shortbow', 'whip'],
            'Armor Proficiency': ['light armor', 'medium armor', 'shields'],
            'Spells': '2/3',
            'Rogue Talents': ['Combat Training(Deft Maneuvers)', 'Combat Training(Combat Reflexes)'],
            'Spellcasting': '3/3',
            'Mystery': 'Time',
            'Orisons': true,
            'Revelation': true,
            'Bonus Spells': {
              '2nd': 'Ill Omen',
              '4th': 'Oracle\'s Burden',
              '6th': 'Bestow Curse'
            },
            'Defiant Luck': 3,
            'Black Cat': 3,
            'Inexplicable Luck': 3,
            'Cosmic Gate': 1,
            'Hero Points': 7
          }
        }

      }

    }

  }
}
</script>

<style scoped lang="scss">

#page {
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
  background-position: center 30%;



  background-attachment: fixed;
}


</style>

