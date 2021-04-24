<template>

  <div>

    <div id="introduction">

      <div>
        <div id="name"></div>
        <div id="cr"></div>
      </div>

      <div id="xp"></div>

      <div>
        <div id="race"></div>
        <div id="class"></div>
        <div id="level"></div>
      </div>

      <div>
        <div id="alignment"></div>
        <div id="size"></div>
        <div id="type"></div>
      </div>

      <div>
        <div id="initiative"></div>
        <div id="senses"></div>
      </div>

      <div id="aura"></div>

    </div>

    <div id="defense">

      <div id="ac"></div>
      <div id="hp"></div>
      <div id="saving throws"></div>
      <div>

        <div id="defensive abilities"></div>
        <div id="dr"></div>
        <div id="immune"></div>
        <div id="resist"></div>
        <div id="sr"></div>

      </div>
      <div id="weaknesses"></div>


    </div>

    <div id="offense">

      <div id="speed"></div>
      <div id="melee"></div>
      <div id="ranged"></div>
      <div>
        <div id="space"></div>
        <div id="reach"></div>
      </div>
      <div id="special attacks"></div>
      <div id="spell-like abilities"></div>
      <div id="spells">
        <div id="spells known"></div>
        <div id="spells prepared"></div>
      </div>

    </div>

    <div id="tactics">
      <div id="before combat"></div>
      <div id="during combat"></div>
      <div id="morale"></div>
    </div>

    <div id="statistics">
      <div id="ability scores"></div>
      <div>
        <div id="base atk"></div>
        <div id="cmb"></div>
        <div id="cmd"></div>
      </div>
      <div id="feats"></div>
      <div id="skills"></div>
      <div id="languages"></div>
      <div id="sq"></div>


    </div>

    <div id="special abilities">

    </div>

    <div id="gear">

    </div>

    <div id="ecology">

      <div id="environment"></div>
      <div id="organization"></div>
      <div id="treasure"></div>

    </div>

    <div id="miscellaneous">

    </div>

  </div>

</template>

<script>
// import SpellList from "@/components/SpellList";
// import FullText from "@/components/FullText";
// import Info from "@/components/Info";

export default {
  name: "John",
  // components: {SpellList, FullText, Info},
  data() {
    return {}
  },
  computed: {

    stat() {
      return {


        //INTRODUCTION
        name() {
          return 'John'
        },
        cr() {
          return 'bar'
        },
        xp() {
          return 'bar'
        },
        race() {
          return 'bar'
        },
        class() {
          return 'bar'
        },
        level() {
          return 'bar'
        },
        alignment() {
          return 'bar'
        },
        size() {
          return 'bar'
        },
        type() {
          return 'bar'
        },
        initiative() {
          return 'bar'
        },
        senses() {
          return 'bar'
        },
        aura() {
          return 'bar'
        },

        //DEFENSE
        ac() {
          return 'bar'
        },
        hp() {
          return 'bar'
        },
        savingThrows() {
          return 'bar'
        },
        foo() {
          return 'bar'
        },
        foo() {
          return 'bar'
        },
        foo() {
          return 'bar'
        },
        foo() {
          return 'bar'
        },
        foo() {
          return 'bar'
        },


      }
    },
    statBonus() {
      return {

        foo() {
          return 'bar'
        }

      }
    },
    rollBonus() {
      return {

        foo() {
          return 'bar'
        }

      }
    },
    bonusModifier() {
      return {

        foo() {
          return 'bar'
        }

      }

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
    },

    modifyRoll(modifier) {
      for (let x in modifier) {
        x
      }
    }
  }

}
</script>

<style scoped lang="scss">

#page {
  display: flex;
  flex-direction: row;
  text-shadow: 2px 2px 4px #000000;
  color: white;
  text-align: left;
  align-items: baseline;
  padding: 2vmin;
  background-image: url("../assets/Immogen_single.png");
  background-repeat: no-repeat;

  background-size: 100vmax;
  background-position: 50% 30%;
  background-attachment: fixed;
  justify-content: space-between;

}


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
