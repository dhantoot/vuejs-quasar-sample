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
      <q-breadcrumbs-el label="Create" icon="navigation" />
    </q-breadcrumbs>

    <div class="row q-gutter-xs">
      <div class="col q-mt-lg">
        <q-card class="my-card shadow-24">
          <q-card-section class="q-pa-lg">
             <div class="text-h5 q-mb-xl">Create New</div>
             <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
                <q-input
                  dense
                  filled
                  v-model="title"
                  label="Title"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                  dense
                  filled
                  v-model="description"
                  label="Description"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-toggle v-model="accept" label="I confirm to add entry" />

                <div>
                  <q-btn label="Submit" type="submit" color="primary"/>
                  <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
              </q-form>
          </q-card-section>
        </q-card>
      </div>
      <div class="col q-mt-sm q-pl-xl q-pr-xl">
        <div class="row justify-center">
          <d-note class="full-width"
            :title="realtimeTitle"
            :titleAlt="'Watch hook'"
            :description="realtimedesc"
            :descAlt="`This is an example of using the watch hook.
            It automatically react when data model is change.\n
            Please try to input sumthing in the fields`"/>
        </div>
      </div>
    </div>
    <q-btn label="Submit nga Gawas sa form" color="secondary" @click="onSubmit" class="q-mt-lg" style="float;right"/>
  </q-page>
</template>

<script>
export default {
  props: [],
  components: {
  },
  data () {
    return {
      isLoading: false,
      title: null,
      description: null,
      accept: false,
      realtimeTitle: '',
      realtimedesc: ''
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  methods: {
    async init () {},
    async onSubmit () {
      if (this.accept === true) {
        const data = {
          title: this.title,
          description: this.description
        }
        const isAdded = await this.$danStoreDispatch('tutorial/addTutorial', data)
        if (isAdded) {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Successfully Added',
            position: 'top'
          })
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Something went wrong',
            position: 'top'
          })
        }
      } else {
        this.$q.notify({
          color: 'yellow-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first',
          position: 'top'
        })
      }
    },
    onReset () {
      this.title = null
      this.description = null
      this.accept = false
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
         * Ex: return this.$store.state.tutorial.tutorialList.map(e => {return e.status})
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
  watch: {
    title: function (newVal, oldVal) {
      this.realtimeTitle = newVal
      console.log(this.realtimeTitle)
    },
    description: function (newVal, oldVal) {
      this.realtimedesc = newVal
      console.log(this.realtimedesc)
    }
  },
  beforeDestroy () {}
}
</script>
