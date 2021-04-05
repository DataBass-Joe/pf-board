<template>


  <div id="page">


    <div id="sheet">


      <div id="charName">
        {{ name }}
      </div>

      <div id="base">


        <p>{{ race }} Gestalt {{ makeList(this.class, ['archetypeName', 'name', 'level']) }}</p>

        <p>{{ alignment }} {{ size }} {{ type }}
          ({{ makeList(subtype) }})</p>


        <p>
          <b> Init </b> +{{ initiative }} ( Temporal Celerity<sup>(Su)</sup> );
          <b> Senses </b>
          <span v-if="race === 'Aasimar'"> darkvision 60 ft.;</span>
          <!--          TODO Make Skills an object, not an array-->
          <!--          Perception +-->
        </p>


      </div>


      <hr>

      <div id="defense">
        <b> DEFENSE</b>

        <hr>

        <p>
          <b> AC </b>
          {{ armorClass }}, touch {{ touchAC }}, flat-footed
          {{ flatFootedAC }} (<span @click="acToggle = !acToggle" v-show="!acToggle">...</span>
          <span @click="acToggle = !acToggle" v-show="acToggle"
          >{{ makeList(armorClassBonuses, ['name', 'bonus']) }}</span>)
        </p>
        <p>
          <b> HP </b>
          {{ hp }} ({{ hitDice }}
          {{ hpBonus * characterLevel }})
        </p>
        <p>
          <b> Fort </b> +{{ saves.fort }},
          <b> Ref </b> +{{ saves.ref }},
          <b> Will </b> +{{ saves.will }}
        </p>
        <!--        <p v-if="race === 'Aasimar'">-->
        <!--          <b> Resist </b>-->
        <!--          acid 5, cold 5, electricity 5-->
        <!--        </p>-->
        <p>
          <b @click="defensiveAbilitiesToggle = !defensiveAbilitiesToggle"> Defensive Abilities </b>

          <span v-show="!defensiveAbilitiesToggle">...</span>

          <span v-show="defensiveAbilitiesToggle">
          <!--          TODO Automate this-->
            <span>Trap Sense<sup>(Ex)</sup> +3, Uncanny Dodge<sup>(Ex)</sup>, Evasion<sup>(Ex)</sup></span>
          </span>

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

        <!--          TODO Automate this-->
        <p>
          <b> Melee </b>
          {{ weapon[0].name }} {{ makeBonus(meleeAttackBonus + weapon[0].enhancementBonus) }}
          ({{ weapon[0].diceCount }}d{{ weapon[0].diceSize }}{{
            makeBonus(meleeDamageBonus + weapon[0].enhancementBonus)
          }}/{{ weapon[0].critRange }}-20<span v-if="toggle.Holy.active"> plus 2d6</span>)
        </p>
        <p>
          <b> Ranged </b>
          {{ weapon[1].name }} {{ makeBonus(rangedAttackBonus + weapon[1].enhancementBonus) }}
          ({{ weapon[1].diceCount }}d{{ weapon[1].diceSize }}{{
            makeBonus(rangedDamageBonus + weapon[1].enhancementBonus)
          }}/x{{ weapon[1].critMult }})
        </p>


        <p>
          <b @click="specialAbilitiesToggle = !specialAbilitiesToggle"> Special Abilities </b>

          <span v-show="!specialAbilitiesToggle">...</span>

          <span v-show="specialAbilitiesToggle">
            <span v-if="'Cleric' in this.class">
                  channel positive energy ({{ channelCount }}/day, {{ channelDamage }}d6, DC {{ channelDC }}); firebolt
                  (1d4+3, 8/day); touch of glory(Sp) (6/day)
                </span>

            <span v-for="specialAbility in this.classFeatures['specialAbilities']" v-bind:key="specialAbility"> </span>
          </span>
        </p>


        <p>
          <b @click="ExtraordinaryToggle = !ExtraordinaryToggle"> Extraordinary Abilities </b>

          <span v-show="!ExtraordinaryToggle">...</span>

          <span v-show="ExtraordinaryToggle">


          </span>


        </p>

        <p>
          <b @click="SupernaturalToggle = !SupernaturalToggle"> Supernatural Abilities </b>

          <span v-show="!SupernaturalToggle">...</span>

          <span v-show="SupernaturalToggle">          </span>

        </p>


        <p v-if="race === 'Aasimar'">

          <b> Spell-Like Abilities</b>
          (CL {{ characterLevel }}th)

          <br>
          1/day—<i>daylight</i>

        </p>


        <div v-for="(caster, index) in this.class" v-bind:key="index">

          <SpellList v-bind:caster="caster" @changeSpell="changeSpell"/>

        </div>


        <p v-if="this.domains != null">
          <b>D</b>

          domain spell; <b> Domains </b>
          <span v-for="(domain, index) in this.domains" v-bind:key="index">{{ domain }}<span
              v-if="index !== this.domains.length - 1">, </span>
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
          <b> CMB </b> {{ makeBonus(cmb) }} ({{ makeBonus(deftManeuvers) }} Deft Maneuvers);
          <b> CMD </b> {{ cmd }}
        </p>
        <p>
          <b @click="featToggle = !featToggle"> Feats </b>
          <span v-if="featToggle">

          <span v-for="(feat, index) in feats" v-bind:key="index">{{ feat }}<span
              v-if="index !== feats.length - 1">, </span>
        </span>
                    </span>
          <span v-if="!featToggle">...</span>

        </p>
        <p>
          <b @click="skillToggle = !skillToggle"> Skills </b>
          <span v-if="skillToggle">
          <span class="capitalize" v-for="(skill, index) in skills" v-bind:key="index">{{ skill.name }} {{
              makeBonus(skill.bonus)
            }}<span v-if="index !== skills.length - 1">, </span>
        </span>
        </span>
          <span v-if="!skillToggle">...</span>
        </p>

        <p>
          <b> Languages </b>
          <span v-for="language in languages" v-bind:key="language">{{ language }}</span>
        </p>

        <p>
          <!--          TODO Automate this-->
          <b @click="specialQualitiesToggle = !specialQualitiesToggle"> Special Qualities </b>

          <span v-show="!specialQualitiesToggle">...</span>

          <span v-show="specialQualitiesToggle">

            <span>Oracle's Curse<sup>(Ex)</sup> (Elemental Imbalance [Fire], Pranked)
              , Mystery (Time)
              , Revelations (Erase From Time<sup>(Su)</sup>
              , Temporal Celerity<sup>(Su)</sup>
              , Rewind Time<sup>(Su)</sup>
              , Misfortune<sup>(Ex)</sup>
              , Fortune<sup>(Ex)</sup>)
              , Clever Explorer<sup>(Ex)</sup>
            </span>

          </span>
        </p>

      </div>

    </div>

    <div id="info">

      <div id="buttons">
        <div v-for="(bonus, key) in toggle" v-bind:key="key" class="toggle"
             v-bind:style="{ 'background-color' : bgColor(bonus.action)}">
          <p>{{ key }}</p>
          <!-- Rounded switch -->
          <label class="switch">
            <input v-model="bonus.active" type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <div v-if="abilityName" class="info">

        <Info
            v-bind:table="'ability'"
            v-bind:name="this.abilityName"
            @closeInfo="changeInfo"
        />

      </div>

      <div v-if="spellName" class="spellDesc">


        <FullText
            v-bind:table="'spell'"
            v-bind:name="this.spellName"
            @closeSpell="closeInfo"
        />

      </div>


    </div>


  </div>


</template>

<script>
import SpellList from "@/components/SpellList";
import FullText from "@/components/FullText";
import Info from "@/components/Info";

export default {
  name: "Charlotte",
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

      },
      skillToggle: true,
      featToggle: false,
      acToggle: false,
      specialAbilitiesToggle: true,
      ExtraordinaryToggle: true,
      SupernaturalToggle: true,
      specialQualitiesToggle: false,
      defensiveAbilitiesToggle: true,
      abilityName: '',


      name: "Charlotte",
      level: Number,
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


      classFeatures: Object,


      class: [
        {
          name: "Cleric",
          hitDie: 8,
          archetypeName: "Angelfire Apostle",
          level: 7,
          domains: ['Fire', 'Glory'],
          spellsPrepared: {
            '4th': ['Blessing of Fervor'],
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
        'Diplomacy': {ranks: 10},
        'Perception': {ranks: 10},
        'Sense Motive': {ranks: 7},
        'Sleight of Hand': {ranks: 7}
      }


    }
  },
  components: {
    Info,
    SpellList,
    FullText
  },
  computed: {
    ClassFeatures() {

      return {
        extraordinaryAbilities: {},
        supernaturalAbilities: {},
        spellLikeAbilities: {},
        specialAbilities: {
          'Weapon Proficiency': ['simple weapons', 'longsword', 'rapier', 'sap', 'shortsword', 'shortbow', 'whip'],
          'Armor Proficiency': ['light armor', 'medium armor', 'shields'],
          'Spells': '2/3',
          'Spellcasting': '3/3',
        }
      }

    },

    sizeBonus() {
      if (this.size === "medium") return 0
      return 0
    },

    classCount() {
      return this.class.length

    },


    characterLevel() {

      let level = 0;

      for (let job in this.class) {

        let lass = this.class[job];

        let classLevel = lass.level

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
      for (let i = 0; i < this.classCount; i++) {
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


      for (let i = 0; i < this.classCount; i++) {


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


        }

      }

      for (let save in totalSaves) {
        //add bonuses here
        totalSaves[save] = Math.floor(totalSaves[save])
            + this.resistanceBonus
            + this.luck
            + this.morale
      }

      for (let save in this.saveAbilityScore) {
        totalSaves[save] += this.abilityMods[this.saveAbilityScore[save]]
      }

      totalSaves["fort"] += 0
      totalSaves["ref"] += 0 + this.haste
      totalSaves["will"] += 0


      return totalSaves

    },
    hp() {

      let hp = 0;

      for (let job in this.class) {

        let classHP = 0;

        let lass = this.class[job];


        if (this.soloPlayer) {
          classHP = lass.hitDie * lass.level;
        } else {
          classHP = lass.hitDie
              + ((lass.level - 1) * Math.ceil((lass.hitDie + 1) / 2))
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

        let lass = this.class[job];

        classHitDice = lass.level + 'd' + lass.hitDie


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
        filledArray[score] = Math.floor((this.abilityScores[score] - 10) / 2)
      }

      return filledArray
    },


    cmb() {
      return this.attackBonus + this.abilityMods.strength - this.powerAttack
    },
    deftManeuvers() {
      return this.cmb - this.abilityMods.strength + this.abilityMods.dexterity
    },
    cmd() {
      return 10 + this.bab + this.abilityMods.strength + this.abilityMods.dexterity + this.haste
    },

    channelCount() {
      return 3 + this.abilityMods.charisma + 1 + 2
    },
    channelDamage() {
      return Math.floor((this.class['Cleric'].level + 1) / 2)
    },
    channelDC() {
      return Math.floor(this.class['Cleric'].level / 2) + 10 + this.abilityMods.charisma
    },

    revelationDC() {
      return 10 + Math.floor(this.characterLevel) + this.abilityMods.charisma
    },

    skills() {


      let tempSkills = [
        {
          name: 'Acrobatics',
          bonus: 0,
          abilityScore: 'dexterity',
        },
        {
          name: 'Appraise',
          bonus: 0,
          abilityScore: 'intelligence'
        },
        {
          name: 'Bluff',
          bonus: 0,
          abilityScore: 'charisma'
        },
        {
          name: 'Climb',
          bonus: 0,
          abilityScore: 'strength'
        },
        {
          name: 'Craft',
          bonus: 0,
          abilityScore: 'intelligence'
        },
        {
          name: 'Diplomacy',
          bonus: 0,
          abilityScore: 'charisma'
        },
        {
          name: 'Disable Device',
          bonus: 0,
          abilityScore: 'dexterity'
        },
        {
          name: 'Disguise',
          bonus: 0,
          abilityScore: 'charisma'
        },
        {
          name: 'Escape Artist',
          bonus: 0,
          abilityScore: 'dexterity'
        },
        {
          name: 'Fly',
          bonus: 0,
          abilityScore: 'dexterity'
        },
        {
          name: 'Handle Animal',
          bonus: 0,
          abilityScore: 'charisma'
        },
        {
          name: 'Heal',
          bonus: 0,
          abilityScore: 'wisdom'
        },
        {
          name: 'Intimidate',
          bonus: 0,
          abilityScore: 'charisma'
        },
        {
          name: 'Knowledge',
          bonus: 0,
          abilityScore: 'intelligence'
        },
        {
          name: 'Linguistics',
          bonus: 0,
          abilityScore: 'intelligence'
        },
        {
          name: 'Perception',
          bonus: 0,
          abilityScore: 'wisdom'
        },
        {
          name: 'Perform',
          bonus: 0,
          abilityScore: 'charisma'
        },
        {
          name: 'Ride',
          bonus: 0,
          abilityScore: 'dexterity'
        },
        {
          name: 'Sense Motive',
          bonus: 0,
          abilityScore: 'wisdom'
        },
        {
          name: 'Sleight of Hand',
          bonus: 0,
          abilityScore: 'dexterity'
        },
        {
          name: 'Spellcraft',
          bonus: 0,
          abilityScore: 'intelligence'
        },
        {
          name: 'Stealth',
          bonus: 0,
          abilityScore: 'dexterity'
        },
        {
          name: 'Survival',
          bonus: 0,
          abilityScore: 'wisdom'
        },
        {
          name: 'Swim',
          bonus: 0,
          abilityScore: 'strength'
        },
        {
          name: 'Use Magic Device',
          bonus: 0,
          abilityScore: 'charisma'
        }
      ]


      let arrayLength = tempSkills.length

      skillLoop:
          for (let i = 0; i < arrayLength; i++) {
            if (this.skill[tempSkills[i].name]) {

              let skill = this.skill[tempSkills[i].name]

              tempSkills[i].bonus += this.abilityMods[tempSkills[i].abilityScore] + this.morale + skill.ranks + this.luck

              if (skill.bonus === 'Bardic Knowledge') tempSkills[i].bonus += this.class[0].level

              if (tempSkills[i].abilityScore === 'strength') tempSkills[i].bonus += this.armorClassBonuses[0].armorCheckPenalty

              if (tempSkills[i].name === 'Perception') tempSkills[i].bonus += Math.floor(this.characterLevel / 2) + 2

              for (let job in this.class) {

                for (let cSkill in this.class[job].classSkills) {

                  if (this.class[job].classSkills[cSkill] === tempSkills[i].name) {
                    tempSkills[i].bonus += 3

                    continue skillLoop;
                  }
                }
              }


            } else {

              tempSkills.splice(i, 1)

              arrayLength -= 1
              i -= 1

            }
          }


      return tempSkills
    },


    // Maybe be in sheet?


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


    armorClass() {

      let tempAC = 0


      for (let i = 0; i < this.armorClassLength; i++) {
        tempAC += this.armorClassBonuses[i].bonus
      }


      return 10 + this.abilityMods.dexterity + tempAC + this.haste
    },
    touchAC() {

      let notTouch = 0

      for (let i = 0; i < this.armorClassLength; i++) {
        if (!this.armorClassBonuses[i].touch)
          notTouch += this.armorClassBonuses[i].bonus
      }


      return this.armorClass - notTouch
    },
    flatFootedAC() {
      return this.armorClass - this.abilityMods.dexterity - this.haste
    },

    initiative() {
      return this.abilityMods.dexterity
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


  },

  methods: {
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

    closeInfo() {
      this.spellName = null
    },

    changeSpell(value) {
      this.spellName = value
    },
    changeInfo(value) {
      this.abilityName = value
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

