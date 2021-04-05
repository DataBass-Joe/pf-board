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
          <b> Init </b> +{{ initiative }} ( Temporal Celerity<sup>(Su)</sup> );
          <b> Senses </b>
          <span v-if="character.race === 'Aasimar'"> darkvision 60 ft.;</span>
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
          >{{ makeList(character.armorClassBonuses, ['name', 'bonus']) }}</span>)
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
        <!--        <p v-if="character.race === 'Aasimar'">-->
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
          {{ character.speed }} ft.
        </p>

        <!--          TODO Automate this-->
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
          <b @click="specialAbilitiesToggle = !specialAbilitiesToggle"> Special Abilities </b>

          <span v-show="!specialAbilitiesToggle">...</span>

          <span v-show="specialAbilitiesToggle">
            <span v-if="'Cleric' in character.class">
                  channel positive energy ({{ channelCount }}/day, {{ channelDamage }}d6, DC {{ channelDC }}); firebolt
                  (1d4+3, 8/day); touch of glory(Sp) (6/day)
                </span>

            <span v-for="specialAbility in character.specialAbilities" v-bind:key="specialAbility"> </span>
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
          <b> CMB </b> {{ makeBonus(cmb) }} ({{ makeBonus(deftManeuvers) }} Deft Maneuvers);
          <b> CMD </b> {{ cmd }}
        </p>
        <p>
          <b @click="featToggle = !featToggle"> Feats </b>
          <span v-if="featToggle">

          <span v-for="(feat, index) in character.feats" v-bind:key="index">{{ feat }}<span
              v-if="index !== character.feats.length - 1">, </span>
        </span>
                    </span>
          <span v-if="!featToggle">...</span>

        </p>
        <p>
          <b @click="skillToggle = !skillToggle"> Skills </b>
          <span v-if="skillToggle">
          <span class="capitalize" v-for="(skill, index) in character.skills" v-bind:key="index">{{ skill.name }} {{
              makeBonus(skill.bonus)
            }}<span v-if="index !== character.skills.length - 1">, </span>
        </span>
        </span>
          <span v-if="!skillToggle">...</span>
        </p>

        <p>
          <b> Languages </b>
          <span v-for="language in character.languages" v-bind:key="language">{{ language }}</span>
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



export default {
  name: "Sheet2",
  data() {
    return {

    }
  },
  props: {
    character: Object
  }
}

</script>


