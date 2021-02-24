<template>
  <div>
    <Sheet
        v-bind:character="character"
    />


  </div>
</template>
<script>
import Sheet from "@/components/Sheet";

// let bonus = this.character.level

export default {
  name: "immogen",
  data() {
    return {
      character: {
        name: "Immogen",
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
        traits: ['Fate\'s Favored', 'Reactionary'],

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
        racialTraits: ['Bonus Feat', 'Skilled'],
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
                'Invisibility, Greater'
              ],
              '3rd (5/day)': [
                'Haste',
                'Glibness',
                'See Invisibility',
                'Charm monster',
                'Confusion'
              ],
              '2nd (6/day)': [
                'Heroism',
                'Gallant Inspiration',
                'Blur',
                'Invisibility',
                'Heroic Fortune',
                'Minor Image',
                'Detect Thoughts',
                'Mirror Image'
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
                'Hold person',
                'Silence',
                'Grace',
                'Resist Energy',
                'Zone of Truth',
                'Visualization of the Mind',
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
              will: true
            },
            casterLevel: '10th',
            casting: 'spontanious'

          }
        ],
        gestalt: true,

        armorClassBonuses: [
          {
            name: 'Armor',
            bonus: 8,
            touch: false,
            flatFooted: true
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

        resistanceBonus: 3,
        soloPlayer: true,


        saveAbilityScore: {
          fort: 'constitution',
          ref: 'charisma',
          will: 'wisdom'
        },


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
            enchantment: ['+2', 'Keen', 'Holy'],
            enhancementBonus: 2
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
            enchantment: ['+1', 'Flaming', 'Composite'],
            enhancementBonus: 1

          }
        ],

        skill: [
            {
              name: 'Acrobatics',
              ranks: 0,
              abilityScore: 'Dexterity',
              bonus: 10
            }, {
              name: 'Appraise',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Bluff',
              ranks: 7,
              abilityScore: 'Dexterity'
            }, {
              name: 'Climb',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Craft',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Diplomacy',
              ranks: 7,
              abilityScore: 'Dexterity'
            }, {
              name: 'Disable Device',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Disguise',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Escape Artist',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Fly',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Handle Animal',
              ranks: 7,
              abilityScore: 'Dexterity'
            }, {
              name: 'Heal',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Intimidate',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Knowledge',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Linguistics',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Perception',
              ranks: 10,
              abilityScore: 'Dexterity'
            }, {
              name: 'Perform',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Ride',
              ranks: 7,
              abilityScore: 'Dexterity'
            }, {
              name: 'Sense Motive',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Sleight of Hand',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Spellcraft',
              ranks: 7,
              abilityScore: 'Dexterity'
            }, {
              name: 'Stealth',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Survival',
              ranks: 7,
              abilityScore: 'Dexterity'
            }, {
              name: 'Swim',
              ranks: 0,
              abilityScore: 'Dexterity'
            }, {
              name: 'Use Magic Device',
              ranks: 0,
              abilityScore: 'Dexterity'
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


<style scoped lang="scss">

#page {
  display: flex;
  flex-direction: row;
  text-shadow: 2px 2px 4px #000000;
  color: white;
  text-align: left;
  align-items: baseline;
  padding: 2vmin;
  background-image: url("../assets/Immogen_single.png");
  background-repeat: no-repeat;

  background-size: 100vmax;
  background-position: 50% 30%;
  background-attachment: fixed;
  justify-content: space-between;

}

</style>




