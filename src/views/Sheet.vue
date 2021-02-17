<template>


  <div id="sheet">

    <div id="charName">
      {{ characterName }}
    </div>

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


    <hr>

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

    <hr>

    <div id="offense">
      <b> OFFENSE</b>

      <hr>

      <p>
        <b> Spd </b>
        {{ speed }} ft.
      </p>
      <p>
        <b> Melee </b>
        {{ this.weapon[0].name }} {{ makeBonus(meleeAttackBonus(dexMod, bab)) }}
        ({{ this.weapon[0].diceCount }}d{{ this.weapon[0].diceSize }}{{ makeBonus(damageBonus) }})
      </p>
      <p>
        <b> Ranged </b>
        {{ this.weapon[1].name }} {{ makeBonus(rangedAttackBonus(dexMod, bab)) }}
        ({{ this.weapon[1].diceCount }}d{{ this.weapon[1].diceSize }}{{
          makeBonus(damageBonus)
        }}/x{{ this.weapon[1].critMult }})
      </p>
      <p>
        <b> Special Attacks </b>
        <span v-if="className == 'Cleric'">
        channel positive energy ({{ channelCount }}/day, {{ channelDamage }}d6, DC {{ channelDC }}); firebolt
        (1d4+3, 8/day); touch of glory(Sp) (6/day)
      </span>

        <span v-if="specialAbilities['supernaturalAbilities']['Erase From Time'] === 1">{{
            makeBonus(meleeAttackBonus(dexMod, bab))
          }} Erase From Time<sup>(Su)</sup> (1/day, 1d{{ Math.floor(10 / 2) }} Rounds, DC {{ revelationDC }} Fort)</span>
      </p>
      <p v-if="characterRace == 'Aasimar'">
        <b> Spell-Like Abilities</b>
        (CL {{ casterLevel }}th)

        <br>
        1/day—<i>
        daylight</i>
      </p>

      <p>
      <div v-for="(caster) in this.casterClass" v-bind:key="caster">



        <SpellList
            v-bind:caster="caster"
        />

      </div>


      <p v-if="domains != null">
        <b>D</b>

        domain spell; <b> Domains </b>
        <span v-for="(domain, index) in domains" v-bind:key="index">{{ domain }}<span
            v-if="index !== domains.length - 1">, </span>
        </span>
      </p>
    </div>


    <hr>

    <div id="statistics">

      <b> STATISTICS</b>

      <hr>

      <p>
        <span v-for="(score, key, index) in abilityScores" v-bind:key="index"><b
            class="capitalize"> {{ key.substr(0, 3) }}</b> {{ score }}({{makeBonus(abilityMods[key])}})<span
            v-if="index !== Object.keys(abilityScores).length - 1">, </span>
        </span>
      </p>
      <p>
        <b> Base Atk </b> {{ makeBonus(bab) }};
        <b> CMB </b> {{ makeBonus(cmb(strMod, bab)) }};
        <b> CMD </b> {{ makeBonus(cmd(strMod, bab, dexMod)) }}
      </p>
      <p>
        <b> Feats </b>
        <span v-for="(feat, index) in feats" v-bind:key="index">{{ feat }}<span
            v-if="index !== feats.length - 1">, </span>
        </span>
      </p>
      <p>
        <b> Skills </b>
        <span class="capitalize" v-for="(bonus, skill, index) in skills" v-bind:key="index">{{
            skill
          }} +{{ bonus }}<span
              v-if="index !== Object.keys(skills).length - 1">, </span>
        </span><b> Racial Modifiers </b>
        +2 Diplomacy, +2 Perception
      </p>
      <p>
        <b> Languages </b>
        Celestial,
        Common
      </p>
    </div>


    <div id="buttons">
      <button v-on:toggle="heroism">Heroism</button>
    </div>



  </div>


</template>


<script>
import SpellList from "@/components/SpellList";



export default {
  name: "sheet",
  data() {
    return {}
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

  },
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
  }
}

</script>


<style scoped>


#sheet {
  flex-direction: column;
  text-shadow: 2px 2px 4px #000000;
  color: white;
  justify-content: start;
  font-size: 1.5vmax;
  text-align: left;
  align-items: baseline;
  /*background-color: black;*/
  padding: 2vmin;


}

template {
  width: inherit;
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

</style>
