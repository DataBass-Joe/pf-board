<template>


  <div id="sheet">


    <div id="charName">
      {{ character.name }}
    </div>

    <div id="base">


      <div> {{ character.race }} Gestalt {{ makeList(character.class, ['archetypeName', 'name', 'level']) }}</div>

      {{ character.alignment }} {{ character.size }} {{ character.type }}
      ({{ makeList(character.subtype) }})


      <p>
        <b> Init </b> +{{ initiative }};
        <b> Senses </b>
        <span v-if="character.race === 'Aasimar'"> darkvision 60 ft.;</span>
        Perception + {{ skills.perception }}
      </p>


    </div>


    <hr>

    <div id="defense">
      <b> DEFENSE</b>

      <hr>

      <p>
        <b> AC </b>
        {{ armorClass }}, touch {{ touchAC }}, flat-footed
        {{ flatFootedAC }} (+{{ character.armorBonus }} armor)
      </p>
      <p>
        <b> hp </b>
        {{ hp }} ({{ hitDice }}
        {{ hpBonus * characterLevel }})
      </p>
      <p>
        <b> Fort </b> +{{ saves.fort }},
        <b> Ref </b> +{{ saves.ref }},
        <b> Will </b> +{{ saves.will }}
      </p>
      <p v-if="character.race === 'Aasimar'">
        <b> Resist </b>
        acid 5, cold 5, electricity 5
      </p>
    </div>

    <hr>

    <div id="offense">
      <b> OFFENSE</b>

      <hr>

      <p>
        <b> Spd </b>
        {{ character.speed }} ft.
      </p>
      <p>
        <b> Melee </b>
        {{ character.weapon[0].name }}
        ({{ character.weapon[0].diceCount }}d{{ character.weapon[0].diceSize }}{{
          makeBonus(damageBonus)
        }})
      </p>
      <p>
        <b> Ranged </b>
        {{ character.weapon[1].name }}
        ({{ character.weapon[1].diceCount }}d{{ character.weapon[1].diceSize }}{{
          makeBonus(damageBonus)
        }}/x{{ character.weapon[1].critMult }})
      </p>
      <p>
        <b> Special Attacks </b>
        <span v-if="'Cleric' in character.class">
                channel positive energy ({{ channelCount }}/day, {{ channelDamage }}d6, DC {{ channelDC }}); firebolt
                (1d4+3, 8/day); touch of glory(Sp) (6/day)
              </span>


        <span v-if="classFeatures['supernaturalAbilities']['Erase From Time'] === 1">
          Erase From Time<sup>(Su)</sup> {{ makeBonus(meleeAttackBonus) }} (1/day, 1d{{
            Math.floor(10 / 2)
          }} Rounds, DC {{
            revelationDC
          }} Fort)</span>
      </p>

      <p v-if="character.race === 'Aasimar'">

        <b> Spell-Like Abilities</b>
        (CL {{ characterLevel }}th)

        <br>
        1/day—<i>daylight</i>

      </p>


      <div v-for="(caster, index) in character.class" v-bind:key="index">

        <SpellList v-bind:caster="caster"/>

      </div>


      <p v-if="character.domains != null">
        <b>D</b>

        domain spell; <b> Domains </b>
        <span v-for="(domain, index) in character.domains" v-bind:key="index">{{ domain }}<span
            v-if="index !== character.domains.length - 1">, </span>
        </span>
      </p>
    </div>


    <hr>

    <div id="statistics">

      <b> STATISTICS</b>

      <hr>

      <p>
        <span v-for="(score, key, index) in abilityScores" v-bind:key="index"><b
            class="capitalize"> {{ key.substr(0, 3) }}</b> {{ score }}({{ makeBonus(abilityMods[key]) }})<span
            v-if="index !== Object.keys(abilityScores).length - 1">, </span>
        </span>
      </p>
      <p>
        <b> Base Atk </b> {{ makeBonus(bab) }};
        <b> CMB </b> {{ makeBonus(cmb) }};
        <b> CMD </b> {{ makeBonus(cmd) }}
      </p>
      <p>
        <b> Feats </b>
        <span v-for="(feat, index) in character.feats" v-bind:key="index">{{ feat }}<span
            v-if="index !== character.feats.length - 1">, </span>
        </span>
      </p>
      <p>
        <b> Skills </b>
        <span class="capitalize" v-for="(bonus, skill, index) in skills" v-bind:key="index">{{ skill }} {{
            makeBonus(bonus)
          }}<span v-if="index !== Object.keys(skills).length - 1">, </span>
        </span>
      </p>
      <p>
        <b> Languages </b>
        <span v-for="language in character.languages" v-bind:key="language">{{ language }}</span>
      </p>
    </div>


  </div>


</template>


<script>
import SpellList from "@/components/SpellList";


export default {
  name: "sheet",

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
    SpellList
  },
  computed: {


    characterLevel() {

      let level = 0;

      for (let job in this.character.class) {

        let characterClass = this.character.class[job];

        let classLevel = characterClass.level

        if (this.character.gestalt === false) {
          level += classLevel

        } else if (level < classLevel) {
          level = classLevel
        }
      }

      return level

    },
    bab() {
      let bab = 0;
      let classCount = this.character.class.length;
      for (let i = 0; i < classCount; i++) {
        let classBab = this.character.class[i].level * this.character.class[i].babProgression
        if (this.character.gestalt === false) {
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

      let classCount = this.character.class.length;

      for (let i = 0; i < classCount; i++) {


        let classSaves = {
          fort: 0,
          ref: 0,
          will: 0
        }

        for (let save in this.character.class[i].goodSaves) {
          if (this.character.class[i].goodSaves[save] === true) {
            classSaves[save] += 2 + (this.character.class[i].level / 2)
          } else {
            classSaves[save] += this.character.class[i].level / 3
          }

          if (this.character.gestalt === false) {
            totalSaves[save] += classSaves[save]

          } else if (totalSaves[save] < classSaves[save]) {
            totalSaves[save] = classSaves[save]

          }
          totalSaves[save] = Math.floor(totalSaves[save]) + this.character.resistanceBonus + this.classFeatures["extraordinaryAbilities"]["Archaeologist's Luck"]
        }

      }

      totalSaves["fort"] += this.abilityMods.constitution
      totalSaves["ref"] += this.abilityMods.dexterity
      totalSaves["will"] += this.abilityMods.wisdom


      return totalSaves

    },
    hp() {

      let hp = 0;

      for (let job in this.character.class) {

        let classHP = 0;

        let characterClass = this.character.class[job];


        if (this.character.soloPlayer) {
          classHP = characterClass.hitDie * characterClass.level;
        } else {
          classHP = characterClass.hitDie
              + ((characterClass.level - 1) * Math.ceil((characterClass.hitDie + 1) / 2))
        }

        if (this.character.gestalt === false) {
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

      for (let job in this.character.class) {

        let classHitDice = '';

        let characterClass = this.character.class[job];

        classHitDice = characterClass.level + 'd' + characterClass.hitDie


        if (this.character.gestalt === false) {
          hitDice += classHitDice


        } else if (hitDice < classHitDice) {
          hitDice = classHitDice

          hitDice += ' + '

        }


      }


      return hitDice
    },

    hpBonus() {
      return this.abilityMods.constitution + this.character.favoredClassBonus
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

      let tempAbilityScores = this.character.pointBuy

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
      return 10 + this.abilityMods.dexterity + this.character.armorBonus
    },
    touchAC() {
      return this.armorClass - this.character.armorBonus
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

    rangedAttackBonus() {
      return this.bab + this.abilityMods.dexterity + this.character.luck
    },
    meleeAttackBonus() {
      return this.bab + this.abilityMods.dexterity + this.character.luck
    },
    damageBonus() {
      return this.abilityMods.dexterity + this.character.luck
    },
    cmb() {
      return this.bab + this.abilityMods.strength
    },
    cmd() {
      return this.bab + this.abilityMods.strength + 10 + this.abilityMods.dexterity
    },
    channelCount() {
      return 3 + this.abilityMods.charisma + 1 + 2
    },
    channelDamage() {
      return Math.floor((this.character.class['Cleric'].level + 1) / 2)
    },
    channelDC() {
      return Math.floor(this.character.class['Cleric'].level / 2) + 10 + this.abilityMods.charisma
    },

    revelationDC() {
      return 10 + Math.floor(this.characterLevel) + this.abilityMods.charisma
    }
  },
  props: {
    character: Object

  }
}

</script>


<style scoped>


#charName {
  font-size: 5vmin;
}

hr {

  width: 100%;
}

p {
  margin: .5vmin;
}

.capitalize {
  text-transform: capitalize;
}
</style>
