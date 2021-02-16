<template>

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
      ({{ this.weapon[0].diceCount }}d{{this.weapon[0].diceSize}}{{ makeBonus(damageBonus) }})
    </p>
    <p>
      <b> Ranged </b>
      {{ this.weapon[1].name }} {{ makeBonus(rangedAttackBonus(dexMod, bab)) }}
      ({{ this.weapon[1].diceCount }}d{{this.weapon[1].diceSize}}{{ makeBonus(damageBonus) }}/x{{this.weapon[1].critMult}})
    </p>
    <p>
      <b> Special Attacks </b>
      <span v-if="className == 'Cleric'">
        channel positive energy ({{ channelCount }}/day, {{ channelDamage }}d6, DC {{ channelDC }}); firebolt
        (1d4+3, 8/day); touch of glory(Sp) (6/day)
      </span>

      <span v-if="specialAbilities['supernaturalAbilities']['Erase From Time'] === 1">{{ makeBonus(meleeAttackBonus(dexMod, bab)) }} Erase From Time<sup>(Su)</sup> (1/day, 1d{{Math.floor(10/2)}} Rounds, DC {{revelationDC}} Fort)</span>
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
      <b>{{ caster.name }} Spells <span v-if="caster.casting === 'spontanious' ">Known</span> (CL
        {{ caster.casterLevel }})</b>

    <div class="spells" v-for="(spellsList, level) in caster.spellsPrepared" v-bind:key="level"><b>{{ level }}: </b>
        <i v-for="spell, index in spellsList" v-bind:key="index">{{ spell }}<span
            v-if="index !== spellsList.length - 1">, </span>
        </i>

      </div>

    </div>


    <p v-if="domains != null">
      <b>D</b>

      domain spell; <b> Domains </b>
      <span v-for="(domain, index) in domains" v-bind:key="index">{{ domain }}<span
          v-if="index !== domains.length - 1">, </span>
        </span>
    </p>
  </div>


</template>

<script>
export default {
  name: "Offense",
  props: {
    speed: Number,
    damageBonus: Number,
    channelCount: Number,
    channelDamage: Number,
    channelDC: Number,
    casterLevel: Number,
    spellsPrepared: Object,
    domains: Array,
    strMod: Number,
    dexMod: Number,
    bab: Number,
    characterRace: String,
    casterClass: Array,
    weapon: Array,
    specialAbilities: Object,
    revelationDC: Number
  },
  methods: {
    meleeAttackBonus(strMod, bab) {
      return strMod + bab
    },
    rangedAttackBonus(dexMod, bab) {
      return dexMod + bab
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

  }

}
</script>

<style scoped>
p {
  margin: 0;
}

.capitalize {
  text-transform: capitalize;
}

div.spells {
  text-indent: 3em;
  margin: .4vmin;
}

</style>
