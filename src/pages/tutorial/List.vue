<template>
  <q-page padding>
    <!-- content -->
    <q-breadcrumbs class="text-grey q-mb-lg" active-color="purple">
      <template v-slot:separator>
        <q-icon
          size="1.2em"
          name="arrow_forward"
          color="purple"
        />
      </template>
      <q-breadcrumbs-el label="Home" icon="home" to="/"/>
      <q-breadcrumbs-el label="Tutorials" icon="widgets" to="/tutorial"/>
      <!-- <q-breadcrumbs-el label="Breadcrumbs" icon="navigation" /> -->
    </q-breadcrumbs>

     <div class="row q-gutter-xs">
      <div class="col q-mt-lg">
        <q-card class="my-card shadow-24">
          <q-card-section class="q-pa-lg">
             <div class="text-h5 q-mb-xl">The List</div>
             <q-btn no-caps class="q-mb-lg" @click="$router.push({name: '_create'})" style="color: goldenrod;" label="Add New"/>

            <q-list bordered separator v-if="tutorialList && tutorialList.length > 0">
              <Tutorials v-for="item in tutorialList" :key="item.id" :itemKadaLoop="item" />
            </q-list>

            <q-banner v-if="tutorialList && tutorialList.length < 0" inline-actions class="text-white bg-red">
              No Data as of the moment. Please add a new one
              <template v-slot:action>
                <!-- <q-btn flat color="white" label="Turn ON Wifi" /> -->
              </template>
            </q-banner>
          </q-card-section>
        </q-card>
      </div>
      <div class="col q-mt-lg">
        <div class="column content-center q-gutter-lg">
           <!-- <p class="caption">Right Side Of List</p> -->
           <!-- <q-btn no-caps class="shadow-10" @click="clearAllTutorials" label="Clear All"/> -->
           <!-- <q-btn no-caps class="shadow-10" @click="bringBackAllTutorials" label="Bring Back"/> -->
           <d-card
            class="shadow-24"
            :overline="'<d-card/>'"
            :title="'Custom Component'"
            :description="'This is an example of custom component, instead of having <q-card> <q-card-section/> </q-card> i customise it to <d-card/>'">
           </d-card>
        </div>
      </div>
     </div>
  </q-page>
</template>

<script>
import Tutorials from '../../components/Shared/Tutorials'
export default {
  props: [],
  components: {
    Tutorials
  },
  data () {
    return {
      isLoading: false,
      copyOfTutorials: []
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    // const x = this.$mixinTest
    this.$initializeMixins()
    console.log(this)
    // test axios if na include naba sa vue instance
    if (this.$axios) {
      console.log('axios is loaded')
    }
    // call init here
    this.init()
  },
  methods: {
    async init () {
      console.log('calling vuex state tutorial/fetchTutorial para masudlan ang tutorialList sa computed property sa ubos')
      await this.$danStoreDispatch('tutorial/fetchTutorial')
      console.log('this.tutorialList', this.tutorialList)
    },
    async fetchTutorials () {
      console.log('fetching data from vuex state..')
    },
    async clearAllTutorials () {
      this.copyOfTutorials = [...this.tutorialList]
      this.tutorialList = []
    },
    async bringBackAllTutorials () {
      console.log(this.copyOfTutorials)
      this.tutorialList = this.copyOfTutorials
    }
  },
  computed: {
    tutorialList: {
      get () {
        /**
         * Normally is inAni: return this.$store.state.tutorial.tutorialList
         * Dependi lang kung unsa imung i include nga field from store/tutorial/actions.js
         * Sa ani nga example is ang tibook object sa response akung gi return. see store/tutorial/actions.js line 10.
         * Also pwedi ka mag mutate sa response dri, like ang kuhaon lang nimo is ang response.status
         * Ex: `return this.$store.state.tutorial.tutorialList.map(e => {return e.status})`
         * Pwedi pud ang `return this.$store.state.tutorial.tutorialList.data` kaso mag error ang pag render sa
         * <q-list> kung naay isa ka item sa array nga null or walai id.
         * so dri gi filter na nako ang array nga limpyo
         */
        if (this.$danStoreState('tutorial').tutorialList && this.$danStoreState('tutorial').tutorialList.data) {
          return this.$danStoreState('tutorial').tutorialList.data.filter(e => {
            return e !== null
          })
        }
        return []
      },
      set (val) {
        /**
         * Ang use ani is kung gusto nimo i update ang state value didto sa store
         * para mu auto update ang tanan components nga nagamit sa tutorialList na data.
         * Example dha sa methods nimo sa taas: this.tutorialList = {id: 10}
         */
        this.$danStoreCommit('tutorial/updateTutorialList', val)
      }
    }
  },
  watch: {},
  beforeDestroy () {}
}
</script>
