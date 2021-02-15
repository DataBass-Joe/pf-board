<template>


  <div id="sheet">


    <div id="charName">
      {{ characterName }}
    </div>

    <div id="base">
      <Base
          v-bind:character-race="characterRace"
          v-bind:archetype-name="archetypeName"
          v-bind:class-name="className"
          v-bind:class-level="classLevel"
          v-bind:alignment="alignment"
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
        v-bind:class-level="classLevel"
        v-bind:class-hit-die="classHitDie"
        v-bind:con-mod="abilityMods.constitution"
    />

    <hr>

    <Offense
    v-bind:speed="speed"
    v-bind:damage-bonus="damageBonus"
    v-bind:channel-count="channelCount"
    v-bind:channel-damage="channelDamage"
    v-bind:channel-d-c="channelDC"
    v-bind:caster-level="casterLevel"
    v-bind:spells-prepared="spellsPrepared"
    v-bind:domains="domains"
    v-bind:bab="bab"
    v-bind:str-mod="abilityMods.strength"
    v-bind:dex-mod="abilityMods.dexterity"
    />

    <hr>

    <Statistics
        v-bind:dex-mod="abilityMods.dexterity"
        v-bind:str-mod="abilityMods.strength"
        v-bind:bab="bab"
        v-bind:ability-scores="abilityScores"
        v-bind:feats="feats"
        v-bind:skills="skills"
    />



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
  },
  computed: {
    bab() {
      return Math.floor(this.classLevel * .75)
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
    saves() {
      return {
        fort: Math.floor(this.classLevel / 2) + 2 + this.abilityMods.constitution + this.resistanceBonus,
        ref: Math.floor(this.classLevel / 3) + this.abilityMods.dexterity + this.resistanceBonus,
        will: Math.floor(this.classLevel / 2) + 2 + this.abilityMods.wisdom + this.resistanceBonus
      }
    },
    hp() {
      return this.classHitDie
          + ((this.classLevel - 1) * Math.ceil((this.classHitDie + 1) / 2))
          + (this.abilityMods.constitution * this.classLevel)
    },

    damageBonus() {
      return this.abilityMods.strength
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
    casterLevel() {
      return this.classLevel
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
