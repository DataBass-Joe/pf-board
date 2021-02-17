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
  name: "immogen",
  data() {
    return {
      character: {
        characterName: "Immogen",
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
        ],

        alignment: "CG",
        pointBuy: {
          strength: 11,
          dexterity: 14,
          constitution: 12,
          intelligence: 14,
          wisdom: 12,
          charisma: 16
        },


        race: "Human",
        languages: ['Common'],
        size: "medium",
        type: "humanoid",
        subtype: ['human'],
        speed: 30,
        favoredClassBonus: 1,


        class: [
          {
            name: 'Bard',
            archetypeName: ['Archeologist'],
            hitDie: 8,
            babProgression: .75,
            level: 10,
            spellsPrepared: {
              '4th (2/day)': [
                'Greater Invisibility'
              ],
              '3rd (5/day)': [
                'Haste',
                'Glibness',
                'See Invisibility',
                'Charm monster',
                '?'
              ],
              '2nd (6/day)': [
                'Heroism',
                'Gallant Inspiration',
                'Blur',
                'Invisibility',
                'Heroic Fortune',
                'Minor Image',
                '?',
                '?'
              ],
              '1st (7/day)': [
                'Shadow Trap',
                'Charm Person',
                'Fabricate Disguise',
                'Saving Finale',
                'Hideous Laughter',
                'Grease',
                'Heightened Awareness',
                'Feather Fall'
              ],
              Cantrips: [
                'Dancing Lights',
                'Detect Magic',
                'Prestidigitation',
                'Daze',
                'Open/Close',
                'Mage Hand',
                'Lullaby',
                'Message',
                'Mending'
              ]
            },
            goodSaves: {
              fort: false,
              ref: true,
              will: true
            },
            casterLevel: '10th',
            casting: 'spontanious'
          },
          {
            name: 'Oracle',
            archetypeName: ['Dual-Cursed'],
            hitDie: 8,
            babProgression: .75,
            level: 10,
            spellsPrepared: {
              '5th (4/day)': [
                'Slay Living',
                'Permanency'

              ],
              '4th (6/day)': [
                'Sending',
                'Dimensional Anchor',
                'Dismissal',
                'Threefold Aspect',
                'Wall of Fire'

              ],
              '3rd (8/day)': [
                'Dispel Magic',
                'Stunning Barrier',
                'Stone Shape',
                'Aura Sight',
                'Shield of Wings',
                'Bestow Curse'

              ],
              '2nd (8/day)': [
                ' Hold person',
                'Silence',
                'Grace',
                'Resist Energy',
                'Zone of Truth',
                '?',
                'Oracle\'s Burden',
                'Scorching Ray'

              ],
              '1st (8/day)': [
                'Detect Charm',
                'Moment of Greatness',
                'Murderous Command',
                'Protection from Law',
                'Lucky Number',
                'Fallback Strategy',
                'Sure casting',
                'Ill Omen',
                'Burning Hands'

              ],
              Orisons: [
                'Create Water',
                'Read Magic',
                'Stabilize',
                'Enhance Diplomacy',
                'Purify Food and Drink',
                'Mending',
                'Vigor',
                'Spark'
              ]
            },
            goodSaves: {
              fort: false,
              ref: false,
              will: false
            },
            casterLevel: '10th',
            casting: 'spontanious'

          }
        ],
        gestalt: true,
        armorBonus: 5,
        resistanceBonus: 1,
        soloPlayer: true,

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
      }
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
  background-image: url("../assets/Immogen_single.png");
  background-repeat: no-repeat;
  height: 90vh;
  background-position: 50% 40%;

  background-size: 200vmin;

  max-width: 150vmin;


}


</style>
