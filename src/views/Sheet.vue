<template>

  <div id="sheet">

    <div id="title">

      <div id="charName">{{ characterName }}</div>

      <div id="class">
        <div>{{ className }} {{ classLevel }}</div>
      </div>

      <div id="health">
        <div>Max HP
          <div>45</div>
        </div>
        <div>Current HP
          <div>45</div>
        </div>
      </div>

    </div>


    <div id="stat-block-1">
      <div id="bab">Base Attack Bonus: {{ bab }}</div>
      <div id="armor-class">Armor Class: {{ armorClass }}</div>
      <div id="touch-ac">Touch AC: {{ touchAC }}</div>
      <div id="flat-footed-ac">Flat-Footed AC: {{ flatFootedAC }}</div>
      <div id="initiative">Initiative: {{ initiative }}</div>


    </div>

    <div id="ability-scores">
      <div v-for="(abilityScore, ability) in abilityScores" v-bind:key="ability">
        <div><p class="capitalize">{{ ability }}:</p></div>
        <div>{{ abilityScore }}:</div>
        <div>{{ getAbilityMod(abilityScore) }}</div>
      </div>
    </div>

    <div id="fight">
      <div id="weapon" class="header">Weapon
        <div>Cestus</div>
      </div>
      <div id="attackBonus" class="header">Attack Bonus
        <div>{{ getAbilityMod(abilityScores.strength) + this.bab }}</div>
      </div>
      <div id="damageDice" class="header">Damage Dice
        <div>1d4</div>
      </div>
      <div id="damageBonus" class="header">Damage Bonus
        <div>{{ getAbilityMod(abilityScores.strength) }}</div>
      </div>
      <div id="criticalRange" class="header">Critical Range
        <div>20</div>
      </div>
      <div id="criticalMultiplier" class="header">Critical Multiplier
        <div>x2</div>
      </div>
      <div id="dpr" class="header">DPR
        <div>0.11</div>
      </div>
    </div>


  </div>


</template>


<script>
export default {
  name: "sheet",
  data() {
    return {
      characterName: "Charlotte",
      className: "Angelfire Cleric",
      classLevel: 6,
      abilityScores: {
        strength: 7,
        dexterity: 13,
        constitution: 14,
        intelligence: 7,
        wisdom: 20,
        charisma: 18
      }
    }
  },
  computed: {
    bab() {
      return Math.floor(this.classLevel * .75)
    },
    armorClass() {
      return this.getAbilityMod(this.abilityScores.dexterity) + 7
    },
    touchAC() {
      return this.armorClass - 7
    },
    flatFootedAC() {
      return this.armorClass - this.getAbilityMod(this.abilityScores.dexterity)
    },
    initiative() {
      return this.getAbilityMod(this.abilityScores.dexterity)
    }
  },
  methods: {
    getAbilityMod(abilityScore) {
      return Math.floor((abilityScore - 10) / 2)
    }
  }
}
</script>

<style scoped>


#health {
  display: flex;
  flex-direction: row;
}



#health > div {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin: 1vmin;
}

#sheet {
  flex-direction: column;
  padding: 1vmin;
  min-width: 50px;
  text-shadow: 2px 2px 4px #000000;
  color: white;
  justify-content: start;
  font-size: 3vmin;
  text-align: left;
  align-items: baseline;


}

#sheet > div {
  margin: 1vmin;


}


#title {
  display: flex;
  flex-direction: row;
  align-items: center;

}

#title > div {
  padding: 1vmin;
  align-items: center;

}

#charName {
  font-size: 5vmin;
}

#class > div {
  display: flex;
  flex-direction: column;
}


#ability-scores {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#ability-scores > div {
  display: flex;
  justify-content: space-between;
  align-items: baseline;

}

p.capitalize {
  text-transform: capitalize;
}


#fight {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(255, 127, 127, 0.75);

  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 5px;

  align-items: stretch;


}

#fight > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header, #damageDice {
  color: black;
  justify-content: space-between;
  margin: 10px;
}

.header > div {
  color: white;
  align-items: flex-start;

}


</style>
