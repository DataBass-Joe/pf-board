<template>


  <div id="sheet">


    <div id="charName">
      {{ characterName }}
    </div>

    <div id="base">
      <Base
          v-bind:character-race="characterRace"
          v-bind:character-class="makeList(this.class, ['archetypeName', 'name', 'casterLevel'])"
          v-bind:alignment="alignment"
          v-bind:size="size"
          v-bind:type="type"
          v-bind:subtype="makeList(subtype)"
          v-bind:initiative="initiative"
          v-bind:perception="skills.perception"
      />
    </div>


    <hr>

    <Defense
        v-bind:armor-class="armorClass"
        v-bind:touch-a-c="touchAC"
        v-bind:flat-footed-a-c="flatFootedAC"
        v-bind:armor-bonus="armorBonus"
        v-bind:fort="saves.fort"
        v-bind:reflex="saves.ref"
        v-bind:will="saves.will"
        v-bind:hp="hp"
        v-bind:hp-bonus="this.hpBonus"
        v-bind:character-race="characterRace"
        v-bind:hit-dice="hitDice"
        v-bind:character-level="characterLevel"
    />

    <hr>

    <Offense
        v-bind:speed="speed"
        v-bind:damage-bonus="damageBonus"
        v-bind:channel-count="channelCount"
        v-bind:channel-damage="channelDamage"
        v-bind:channel-d-c="channelDC"
        v-bind:bab="bab"
        v-bind:str-mod="abilityMods.strength"
        v-bind:dex-mod="abilityMods.dexterity"
        v-bind:character-race="characterRace"
        v-bind:caster-class="this.class"
        v-bind:weapon="this.weapon"
        v-bind:special-abilities="classFeatures"
        v-bind:revelation-d-c="revelationDC"

    />


    <hr>

    <Statistics
        v-bind:dex-mod="abilityMods.dexterity"
        v-bind:str-mod="abilityMods.strength"
        v-bind:bab="bab"
        v-bind:ability-scores="abilityScores"
        v-bind:feats="feats"
        v-bind:skills="skills"
        v-bind:ability-mods="abilityMods"
    />


    <div id="buttons">
      <button v-on:toggle="heroism"></button>
    </div>


  </div>


</template>


<script>
import Base from '../components/Base.vue'
import Defense from '@/components/Defense'
import Offense from "@/components/Offense"
import Statistics from "@/components/Statistics"


export default {
  name: "sheet",
  data() {
    return {
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


      characterRace: "Human",
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
              '    ?'
            ],
            '2nd (6/day)': [
              'Heroism',
              'Gallant Inspiration',
              'Blur',
              'Invisiblility',
              'Heroic Fortune',
              'Minor Image',
              '    ?',
              '        ?'
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
              '?',
              'Permanency'

            ],
            '4th (6/day)': [
              'Sending',
              'Dimensional Anchor',
              'Threefold Aspect',
              'Wall of Fire'

            ],
            '3rd (8/day)': [
              'Dispel Magic',
              'Stunning Barrier',
              'Stone Shape',
              'Aura Sight',
              '?',
              'Beacon of Luck*',
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
  },
  computed: {
    characterLevel() {

      let level = 0;

      for (let job in this.class) {

        let characterClass = this.class[job];

        let classLevel = characterClass.level

        if (this.gestalt === false) {
          level += classLevel

        } else if (level < classLevel) {
          level = classLevel
        }
      }

      return level

    },
    bab() {
      let bab = 0;
      let classCount = this.class.length;
      for (var i = 0; i < classCount; i++) {
        let classBab = this.class[i].level * this.class[i].babProgression
        if (this.gestalt === false) {
          bab += classBab
        } else if (bab < classBab) {
          bab = classBab
        }
      }
      return Math.floor(bab)
    },
    saves() {

      let totalSaves = {
        fort: 0,
        ref: 0,
        will: 0
      }

      let classCount = this.class.length;

      for (var i = 0; i < classCount; i++) {


        let classSaves = {
          fort: 0,
          ref: 0,
          will: 0
        }

        for (let save in this.class[i].goodSaves) {
          if (this.class[i].goodSaves[save] === true) {
            classSaves[save] += 2 + (this.class[i].level / 2)
          } else {
            classSaves[save] += this.class[i].level / 3
          }

          if (this.gestalt === false) {
            totalSaves[save] += classSaves[save]

          } else if (totalSaves[save] < classSaves[save]) {
            totalSaves[save] = classSaves[save]

          }
          totalSaves[save] = Math.floor(totalSaves[save]) + this.resistanceBonus + this.classFeatures.extraordinaryAbilities["Archaeologist's Luck"]
        }

      }

      totalSaves["fort"] += this.abilityMods.constitution
      totalSaves["ref"] += this.abilityMods.dexterity
      totalSaves["will"] += this.abilityMods.wisdom


      return totalSaves

    },
    hp() {

      let hp = 0;

      for (let job in this.class) {

        let classHP = 0;

        let characterClass = this.class[job];


        if (this.soloPlayer) {
          classHP = characterClass.hitDie * characterClass.level;
        } else {
          classHP = characterClass.hitDie
              + ((characterClass.level - 1) * Math.ceil((characterClass.hitDie + 1) / 2))
        }

        if (this.gestalt === false) {
          hp += classHP

        } else if (hp < classHP) {
          hp = classHP
        }

      }

      hp += this.characterLevel * this.hpBonus


      return hp
    },
    hitDice() {

      let hitDice = '';

      for (let job in this.class) {

        let classHitDice = '';

        let characterClass = this.class[job];

        classHitDice = characterClass.level + 'd' + characterClass.hitDie


        if (this.gestalt === false) {
          hitDice += classHitDice


        } else if (hitDice < classHitDice) {
          hitDice = classHitDice

          hitDice += ' + '

        }


      }


      return hitDice
    },

    hpBonus() {
      return this.abilityMods.constitution + this.favoredClassBonus
    },

//TODO This shit is horribly messy and unorganized
    classFeatures() {

      return {
        extraordinaryAbilities: {
          'Bardic Knowledge': this.characterLevel,
          'Archaeologist\'s Luck': 3,
          'Clever Explorer': Math.floor(this.characterLevel / 2),
          'Uncanny Dodge': true,
          'Trap Sense': 3,
          'Lore Master': 1,
          'Evasion': true,
          'Oracle\'s Curse': ['Elemental Imbalance(fire)', 'Pranked'],
          'Misforture': 1,
          'Forture': 1
        },
        supernaturalAbilities: {
          'Erase From Time': 1,
          'Temporal Celerity': 1,
          'Rewind Time': 1
        },
        spellLikeAbilities: {
          'Cantrips': true
        },
        untypedAbilities: {
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
          }
        }
      }

    },

    abilityScores() {

      let enchancement = 4

      let level = 2

      let race = 2

      let tempAbilityScores = this.pointBuy

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      tempAbilityScores.strength += 0
      tempAbilityScores.dexterity += enchancement
      tempAbilityScores.constitution += 0
      tempAbilityScores.intelligence += 0
      tempAbilityScores.wisdom += 0
      tempAbilityScores.charisma += enchancement + level + race

      return tempAbilityScores


    },


    abilityMods() {
      let filledArray = {};

      let score;

      for (score in this.abilityScores) {
        filledArray[score] = this.getAbilityMod(this.abilityScores[score])
      }

      return filledArray
    },
    armorClass() {
      return 10 + this.abilityMods.dexterity + this.armorBonus
    },
    touchAC() {
      return this.armorClass - this.armorBonus
    },
    flatFootedAC() {
      return this.armorClass - this.abilityMods.dexterity
    },
    initiative() {
      return this.abilityMods.dexterity
    },
    skills() {
      return {
        perception: 2 + this.abilityMods.wisdom + 2,
        diplomacy: 4 + this.abilityMods.charisma + 3
      }
    },
    damageBonus() {
      return this.abilityMods.dexterity
    },
    channelCount() {
      return 3 + this.abilityMods.charisma + 1 + 2
    },
    channelDamage() {
      return Math.floor((this.classLevel + 1) / 2)
    },
    channelDC() {
      return Math.floor(this.classLevel / 2) + 10 + this.abilityMods.charisma
    },

    revelationDC() {
      return 10 + Math.floor(this.characterLevel) + this.abilityMods.charisma
    }

  }
  ,
  methods: {
    getAbilityMod(abilityScore) {
      return Math.floor((abilityScore - 10) / 2)
    },
    makeBonus(bonus) {
      let text = ''
      if (bonus < 0) {
        text = bonus
      } else {
        text = '+' + bonus
      }
      return text
    },
    makeList(myObj, keys) {

      let list = '';

      let size = Object.keys(myObj).length;


      for (let i = 0; i < size; i++) {


        if (keys) {

          let keySize = keys.length


          for (let key = 0; key < keySize; key++) {

            if (typeof myObj[i][keys[key]] == 'object') {

              list += this.makeList(myObj[i][keys[key]])

              if (key === keySize - 1) {
                continue
              }

              list += ' '

              continue

            }

            list += myObj[i][keys[key]]

            if (key === keySize - 1) {
              continue
            }

            list += ' '
          }

        } else {
          list += myObj[i]
        }
        if (i === size - 1) {
          continue
        }

        list += ', '

      }


      return list

    }

  },

  components: {
    Base,
    Defense,
    Offense,
    Statistics
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


#charName {
  font-size: 5vmin;
}

hr {

  width: 100%;
}

p {
  margin: 0;
}

.capitalize {
  text-transform: capitalize;
}

</style>
