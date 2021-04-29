<template>

  <div>

    <div id="introduction">

      <div>
        <div id="name" v-text="introduction.name"></div>
        <div id="cr" v-text="stat.introduction().cr()"></div>
      </div>

      <div id="xp" v-text="stat.introduction().xp()"></div>

      <div>
        <div id="race" v-text="introduction.race"></div>
        <div id="class" v-text="introduction.class"></div>
        <div id="level" v-text="stat.introduction().level()"></div>
      </div>

      <div>
        <div id="alignment" v-text="stat.introduction().alignment()"></div>
        <div id="size" class="capitalize" v-text="stat.introduction().size()"></div>
        <div id="type" v-text="stat.introduction().type()"></div>
        <div id="type" v-text="stat.introduction().subtype()"></div>

      </div>

      <div>
        <div id="initiative" v-text="stat.introduction().initiative()"></div>
        <div id="senses" v-text="stat.introduction().senses()"></div>
      </div>

      <div id="aura" v-text="stat.introduction().aura()"></div>

    </div>

    <div id="defense">

      <div id="ac" v-text="stat.defense().ac()"></div>
      <div id="hp" v-text="stat.defense().hp()"></div>
      <div id="saving throws">
        <div id="fortitude" v-text="stat.defense().savingThrows().fortitude()"></div>
        <div id="reflex" v-text="stat.defense().savingThrows().reflex()"></div>
        <div id="will" v-text="stat.defense().savingThrows().will()"></div>
      </div>
      <div>

        <div id="defensive abilities" v-text="stat.defense().defensiveAbilities()"></div>
        <div id="dr" v-text="stat.defense().dr()"></div>
        <div id="immune" v-text="stat.defense().immune()"></div>
        <div id="resist" v-text="stat.defense().resist()"></div>
        <div id="sr" v-text="stat.defense().sr()"></div>

      </div>
      <div id="weaknesses" v-text="stat.defense().weaknesses()"></div>


    </div>

    <div id="offense">

      <div id="speed" v-text="stat.offense().speed()"></div>
      <div id="melee" v-text="stat.offense().melee()"></div>
      <div id="ranged" v-text="stat.offense().ranged()"></div>
      <div>
        <div id="space" v-text="stat.offense().space()"></div>
        <div id="reach" v-text="stat.offense().reach()"></div>
      </div>
      <div id="special attacks" v-text="stat.offense().specialAttacks()"></div>
      <div id="spell-like abilities" v-text="stat.offense().spellLikeAbilities()"></div>
      <div id="spells">
        <div id="spells known" v-text="stat.offense().spells().spellsKnown()"></div>
        <div id="spells prepared" v-text="stat.offense().spells().spellsPrepared()"></div>
      </div>

    </div>

    <div id="tactics">
      <div id="before combat" v-text="stat.tactics().beforeCombat()"></div>
      <div id="during combat" v-text="stat.tactics().duringCombat()"></div>
      <div id="morale" v-text="stat.tactics().morale()"></div>
    </div>

    <div id="statistics">
      <div id="ability scores">
        <div id="strength" v-text="stat.statistics().abilityScores().strength()"></div>
        <div id="dexterity" v-text="stat.statistics().abilityScores().dexterity()"></div>
        <div id="constitution" v-text="stat.statistics().abilityScores().constitution()"></div>
        <div id="intelligence" v-text="stat.statistics().abilityScores().intelligence()"></div>
        <div id="wisdom" v-text="stat.statistics().abilityScores().wisdom()"></div>
        <div id="charisma" v-text="stat.statistics().abilityScores().charisma()"></div>
      </div>
      <div>
        <div id="base atk" v-text="stat.statistics().baseAtk()"></div>
        <div id="cmb" v-text="stat.statistics().cmb()"></div>
        <div id="cmd" v-text="stat.statistics().cmd()"></div>
      </div>
      <div id="feats" v-text="stat.statistics().feats()"></div>
      <div id="skills" v-text="stat.statistics().skills()"></div>
      <div id="languages" v-text="stat.statistics().languages()"></div>
      <div id="sq" v-text="stat.statistics().sq()"></div>


    </div>

    <div id="special abilities">

    </div>

    <div id="gear">

    </div>

    <div id="ecology">

      <div id="environment" v-text="stat.ecology().environment()"></div>
      <div id="organization" v-text="stat.ecology().organization()"></div>
      <div id="treasure" v-text="stat.ecology().treasure()"></div>

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
    return {
      introduction: {
        name: "John",
        race: ['half-elf'],
        class: [{
          name: 'Unchained Rogue',
          level: 1
        }]
      }
    }
  },
  computed: {

    stat() {
      return {


        //INTRODUCTION
        introduction() {
          return {

            cr() {
              return 'bar'
            },
            xp() {
              return 'bar'
            },
            level() {
              return this.$parent.$parent.introduction.class.reduce((accumulator, cur) => accumulator + cur.level, 0);
            },
            alignment() {
              return 'LN'
            },
            size() {
              return 'medium'
            },
            type() {
              return 'humanoid'
            },
            subtype() {
              return ['elf', 'human']
            },
            initiative() {
              return 'bar'
            },
            senses() {
              return 'bar'
            },
            aura() {
              return 'foo'
            }
          }
        },


        //DEFENSE
        defense() {
          return {
            ac() {
              return 'bar'
            },
            hp() {
              return 'bar'
            },
            savingThrows() {
              return {
                fortitude() {
                  return 'bar'
                },
                reflex() {
                  return 'bar'
                },
                will() {
                  return 'bar'
                },
              }
            },
            defensiveAbilities() {
              return 'foo'
            },
            dr() {
              return 'foo'
            },
            immune() {
              return 'foo'
            },
            resist() {
              return 'foo'
            },
            sr() {
              return 'foo'
            },
            weaknesses() {
              return 'foo'
            }
          }
        },


        //OFFENSE
        offense() {
          return {
            speed() {
              return '30'
            },
            melee() {
              return 'bar'
            },
            ranged() {
              return 'bar'
            },
            space() {
              return '5'
            },
            reach() {
              return '5'
            },
            specialAttacks() {
              return 'bar'
            },
            spellLikeAbilities() {
              return 'bar'
            },
            spells() {
              return {
                spellsKnown() {
                  return 'bar'
                },
                spellsPrepared() {
                  return 'bar'
                }
              }
            }
          }
        },


        //TACTICS
        tactics() {
          return {
            beforeCombat() {
              return 'bar'
            },
            duringCombat() {
              return 'bar'
            },
            morale() {
              return 'bar'
            }
          }
        },


        //STATISTICS
        statistics() {
          return {
            abilityScores() {
              return {
                strength() {
                  return 'bar'
                },
                dexterity() {
                  return 'bar'
                },
                constitution() {
                  return 'bar'
                },
                intelligence() {
                  return 'bar'
                },
                wisdom() {
                  return 'bar'
                },
                charisma() {
                  return 'bar'
                }
              }
            },
            baseAtk() {
              return 'bar'
            },
            cmb() {
              return 'bar'
            },
            cmd() {
              return 'bar'
            },
            feats() {
              return ['bar']
            },
            skills() {
              return [{foo: 'bar'}]
            },
            languages() {
              return ['bar']
            },
            sq() {
              return 'bar'
            }
          }
        },


        //SPECIAL ABILITIES
        specialAbilities() {
          return 'bar'
        },


        //GEAR
        gear() {
          return 'bar'
        },


        //ECOLOGY
        ecology() {
          return {
            environment() {
              return 'bar'
            },
            organization() {
              return 'bar'
            },
            treasure() {
              return 'bar'
            }
          }
        },


        //MISCELLANEOUS
        miscellaneous() {
          return 'bar'
        }


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
  methods: {}

}
</script>

<style scoped lang="scss">

.capitalize {
  text-transform: capitalize;
}

</style>
