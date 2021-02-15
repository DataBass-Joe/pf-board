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
      {{this.weapon[0].name}} {{ makeBonus(meleeAttackBonus(strMod, bab)) }} ({{this.weapon[0].weaponDamage}}{{ makeBonus(damageBonus) }})
    </p>
    <p>
      <b> Ranged </b>
      light
      crossbow {{ makeBonus(rangedAttackBonus(dexMod, bab)) }} (1d8{{ makeBonus(damageBonus) }}/19-20)
    </p>
    <p>
      <b> Special Attacks </b>
      <span v-if="className == 'Cleric'">
        channel positive energy ({{ channelCount }}/day, {{ channelDamage }}d6, DC {{ channelDC }}); firebolt
        (1d4+3, 8/day); touch of glory(Sp) (6/day)
      </span>
    </p>
    <p v-if="characterRace == 'Aasimar'">
      <b> Spell-Like Abilities</b>
      (CL {{ casterLevel }}th)

      <br>
      1/day—<i>
      daylight</i>
    </p>

    <p>

    <div v-for="(spellsList, caster) in this.class[0].spellsPrepared" v-bind:key="caster">
      <b
          class="capitalize">{{ caster }} Spells Prepared (CL {{ casterLevel }}th)</b>
      <br>

      <div class="spells" v-for="(spells, level) in spellsList" v-bind:key="level">
        {{ level }}:
        <span v-for="(spell, index) in spells" v-bind:key="spell">
                         <i>{{ spell }}</i>
                    <span
                        v-if="index !== spells.length - 1">, </span>
                            </span>


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
    class: Array,
    weapon: Array,
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
}

</style>
