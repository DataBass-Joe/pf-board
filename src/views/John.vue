<template>
  <div>
    <Sheet
        v-bind:character="character"
    />


  </div>
</template>
<script>
import Sheet from "@/components/Sheet2";

// let bonus = this.character.level

export default {
  name: "John",
  data() {
    return {
      character: {
        name: "John",
        feats: [
          'Defiant Luck',
          'Auspicious Birth (Retrograde)',
          'Racial Heritage (Catfolk)',
          'Spellsong (Diplomacy)',
          'Black Cat, Deft Maneuvers',
          'Lingering Performance',
          'Inexplicable Luck',
          'Lucky',
          'Combat Reflexes, Extra Revelation',
          'Lady Luck\'s Guidance',
          'Cosmic Gate',
          'Blood of Heroes',
          'Hero\'s Fortune',
          'Luck of Heroes'
        ],
        traits: ['Elven Reflexes', 'Armor Expert'],

        alignment: "NL",
        pointBuy: {
          strength: 7,
          dexterity: 20,
          constitution: 14,
          intelligence: 10,
          wisdom: 12,
          charisma: 10
        },


        race: "Human",
        //TODO fix this
        racialTraits: ['Bonus Feat', 'Skilled'],
        languages: ['Common', 'Elven'],
        size: "medium",
        type: "humanoid",
        subtype: ['human', 'elf'],
        speed: 30,
        favoredClassBonus: 1,


        class: [
          {
            name: 'URogue',
            archetypeName: [''],
            hitDie: 8,
            babProgression: .75,
            level: 6,
            goodSaves: {
              fort: false,
              ref: true,
              will: false
            },
            classSkills: [
              'Acrobatics'
              , 'Appraise'
              , 'Bluff'
              , 'Climb'
              , 'Craft'
              , 'Diplomacy'
              , 'Disable Device'
              , 'Disguise'
              , 'Escape Artist'
              , 'Intimidate'
              , 'Knowledge (dungeoneering)'
              , 'Knowledge (local)'
              , 'Linguistics'
              , 'Perception'
              , 'Perform'
              , 'Profession'
              , 'Sense Motive'
              , 'Sleight of Hand'
              , 'Stealth'
              , 'Swim'
              , 'Use Magic Device'
            ]
          },
        ],
        gestalt: false,

        armorClassBonuses: [
          {
            name: 'Armor',
            bonus: 6,
            touch: false,
            flatFooted: true,
            maxDex: 6,
            armorCheckPenalty: 0
          }, {
            name: 'deflection',
            bonus: 1,
            touch: true,
            flatFooted: true
          }
        ],

        resistanceBonus: 2,
        soloPlayer: false,


        saveAbilityScore: {
          fort: 'constitution',
          ref: 'dexterity',
          will: 'wisdom'
        },


        weapon: [
          {
            name: 'Elven Curveblade',
            diceCount: 1,
            diceSize: 10,
            damageType: ['slashing'],
            weaponType: 'melee',
            critRange: 15,
            critMult: 2,
            weight: 4,
            proficiency: 'martial',
            catagory: 'one-handed',
            group: 'heavy blades',
            enchantment: ['+1', 'Keen'],
            enhancementBonus: 1
          },
          {
            name: 'Throwing Dagger',
            diceCount: 1,
            diceSize: 4,
            damageType: ['slashing'],
            weaponType: 'ranged',
            critRange: 19,
            critMult: 3,
            weight: 3,
            proficiency: 'martial',
            catagory: 'light',
            group: 'light blades',
            enchantment: [''],
            enhancementBonus: 0

          }
        ],

        skill: {
          'Bluff': {ranks: 6},
          'Climb': {ranks: 1},
          'Diplomacy': {ranks: 2},
          'Disable Device': {ranks: 6},
          'Escape Artist': {ranks: 6},
          'Linguistics': {ranks: 1},
          'Perception': {ranks: 6},
          'Sleight of Hand': {ranks: 6},
          'Stealth': {ranks: 6},
          'Swim': {ranks: 1},
          'Use Magic Device': {ranks: 1}
        }

      }
    }
  },
  components: {
    Sheet
  }
}
</script>


<style scoped lang="scss">

#page {
  display: flex;
  flex-direction: row;
  text-shadow: 2px 2px 4px #000000;
  color: white;
  text-align: left;
  align-items: baseline;
  padding: 2vmin;
  background-image: url("../assets/j-jp-.jpg");
  width: 270px;
  height: 441px;
  background-repeat: no-repeat;

  background-size: 100vmax;
  background-position: 50% 30%;
  background-attachment: fixed;
  justify-content: space-between;

}





