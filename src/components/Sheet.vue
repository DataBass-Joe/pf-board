<template>


  <div id="page">


    <div id="sheet">


      <div id="charName">
        {{ character.name }}
      </div>

      <div id="base">


        <p>{{ character.race }} Gestalt {{ makeList(character.class, ['archetypeName', 'name', 'level']) }}</p>

        <p>{{ character.alignment }} {{ character.size }} {{ character.type }}
          ({{ makeList(character.subtype) }})</p>


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
          {{ flatFootedAC }} ({{ makeList(character.armorClassBonuses, ['name', 'bonus']) }})
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
          {{ character.weapon[0].name }} {{ makeBonus(meleeAttackBonus + character.weapon[0].enhancementBonus) }}
          ({{ character.weapon[0].diceCount }}d{{ character.weapon[0].diceSize }}{{
            makeBonus(meleeDamageBonus + character.weapon[0].enhancementBonus)
          }}/{{ character.weapon[0].critRange }}-20<span v-if="toggle.Holy.active"> plus 2d6</span>)
        </p>
        <p>
          <b> Ranged </b>
          {{ character.weapon[1].name }} {{ makeBonus(rangedAttackBonus + character.weapon[1].enhancementBonus) }}
          ({{ character.weapon[1].diceCount }}d{{ character.weapon[1].diceSize }}{{
            makeBonus(rangedDamageBonus + character.weapon[1].enhancementBonus)
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

          <SpellList v-bind:caster="caster" @changeSpell="changeSpell"/>

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
          <b> CMD </b> {{ cmd }}
        </p>
        <p>
          <b> Feats </b>
          <span v-for="(feat, index) in character.feats" v-bind:key="index">{{ feat }}<span
              v-if="index !== character.feats.length - 1">, </span>
        </span>
        </p>
        <p>
          <b> Skills </b>
          <span class="capitalize" v-for="(skill, index) in character.skill" v-bind:key="index">{{ skill.name }} {{
              makeBonus(skill.bonus)
            }}<span v-if="index !== character.skill.length - 1">, </span>
        </span>
        </p>
        <p>
          <b> Languages </b>
          <span v-for="language in character.languages" v-bind:key="language">{{ language }}</span>
        </p>
      </div>

    </div>

    <div id="info">

      <div id="buttons">
        <div v-for="(bonus, key) in toggle" v-bind:key="key" class="toggle" v-bind:style="{ 'background-color' : bgColor(bonus.action)}">
          <p>{{ key }}</p>
          <!-- Rounded switch -->
          <label class="switch">
            <input v-model="bonus.active" type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <div v-if="spellName" id="spellDesc">


        <FullText
            v-bind:table="'spell'"
            v-bind:name="this.spellName"
            @closeSpell="changeSpell"
        />

      </div>

    </div>


  </div>


</template>


<script>
import SpellList from "@/components/SpellList";
import FullText from "@/components/FullText";


export default {
  name: "sheet",
  data() {
    return {
      spellName: '',
      toggle: {
        'Heroism': {
          type: 'Morale',
          bonus: 2,
          active: true,
          to: ['Attack Rolls', 'Saving Throws', 'Skill Checks'],
          action: 2
        },
        'Archeologist\'s Luck': {
          type: 'Luck',
          bonus: 3,
          active: true,
          to: ['Attack Rolls', 'Damage Rolls', 'Saving Throws', 'Skill Checks'],
          action: 1
        },
        'Power Attack': {
          active: true,
          action: 0
        },
        'Two-Handing': {
          active: true,
          action: 0
        },
        'Haste': {
          type: 'Dodge',
          bonus: 1,
          active: false,
          to: ['Attack Rolls', 'Reflex Saving Throws', 'Armor Class'],
          action: 2
        },
        'Deadly Aim': {
          active: true,
          action: 0
        },
        'Holy': {
          active: false,
          action: 0
        }

      }
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

    },
    changeSpell(value) {
      this.spellName = value
    },
    bgColor(action) {
      if (action === 0) {
        return 'rgba(0,0,0,.25)'
      } else if (action === 1) {
        return 'rgba(255,0,0,.25)'
      } else if (action === 2) {
        return 'rgba(0,0,255,.25)'
      }
    }
  },
  components: {
    SpellList,
    FullText
  },
  computed: {

    deadlyAim() {
      if (this.toggle["Deadly Aim"].active) {
        return Math.floor(this.bab / 4) + 1
      }
      return 0
    },
    powerAttack() {
      if (this.toggle["Power Attack"].active) {
        return Math.floor(this.bab / 4) + 1
      }
      return 0
    },

    haste() {
      if (this.toggle.Haste.active) {
        return this.toggle.Haste.bonus
      }
      return 0
    },


    sizeBonus() {
      if (this.character.size === "medium") return 0
      return 0
    },

    classCount() {
      return this.character.class.length
    },

    morale() {
      if (this.toggle["Heroism"].active) {
        return this.toggle["Heroism"].bonus
      }
      return 0
    },
    luck() {
      if (this.toggle["Archeologist's Luck"].active) {
        return this.toggle["Archeologist's Luck"].bonus
      }
      return 0
    },

    attackBonus() {
      return this.bab + this.morale + this.luck + this.haste
    },


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
      for (let i = 0; i < this.classCount; i++) {
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


      for (let i = 0; i < this.classCount; i++) {


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


        }

      }

      for (let save in totalSaves) {
        //add bonuses here
        totalSaves[save] = Math.floor(totalSaves[save])
            + this.character.resistanceBonus
            + this.luck
            + this.morale
      }

      for (let save in this.character.saveAbilityScore) {
        totalSaves[save] += this.abilityMods[this.character.saveAbilityScore[save]]
      }

      totalSaves["fort"] += 0
      totalSaves["ref"] += 0 + this.haste
      totalSaves["will"] += 0


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


    armorClassLength() {
      return this.character.armorClassBonuses.length
    },

    armorClass() {

      let tempAC = 0


      for (let i = 0; i < this.armorClassLength; i++) {
        tempAC += this.character.armorClassBonuses[i].bonus
      }


      return 10 + this.abilityMods.dexterity + tempAC + this.haste
    },
    touchAC() {

      let notTouch = 0

      for (let i = 0; i < this.armorClassLength; i++) {
        if (!this.character.armorClassBonuses[i].touch)
          notTouch += this.character.armorClassBonuses[i].bonus
      }


      return this.armorClass - notTouch
    },
    flatFootedAC() {
      return this.armorClass - this.abilityMods.dexterity - this.haste
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
      return this.attackBonus + this.abilityMods.dexterity - this.deadlyAim
    },
    meleeAttackBonus() {
      return this.attackBonus + this.abilityMods.dexterity - this.powerAttack
    },
    damageBonus() {
      return this.abilityMods.dexterity + this.luck
    },
    rangedDamageBonus() {
      return this.damageBonus + (this.deadlyAim * 2)
    },
    meleeDamageBonus() {
      return this.damageBonus + (this.powerAttack * (2 + this.toggle["Two-Handing"].active))
    },

    cmb() {
      return this.attackBonus + this.abilityMods.dexterity - this.powerAttack
    },
    cmd() {
      return 10 + this.bab + this.abilityMods.strength + this.abilityMods.dexterity + this.haste
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


<style lang="scss" scoped>


#charName {
  font-size: 5vmin;
}

hr {
  width: 100%
}

p {
  margin: .5vmin;
}

.capitalize {
  text-transform: capitalize;
}

#sheet {

  display: flex;
  flex-direction: column;
  min-width: 50vw;

}

#info {

  display: flex;
  flex-direction: column;
  min-width: 30vw;


}

#buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;


}

.toggle {

  display: flex;
  background-color: rgba(0, 0, 0, .25);

  margin: 1vmin;
  padding: 1vmin;
  align-items: center;


}


@media only screen and (max-width: 1100px) {
  /* For mobile phones: */
  [id*="page"] {
    flex-wrap: wrap;
  }

  [id*="sheet"] {
    width: 100%;
  }

  [id*="info"] {
    width: 100%;
  }
}

span {
  width: clamp(16px, 100%, 50vmin);
}


/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
