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
      <q-breadcrumbs-el label="Detail" icon="navigation" />
    </q-breadcrumbs>

    <div class="row q-gutter-xs justify-evenly">
      <div class="col q-mt-lg">
        <q-card class="my-card shadow-24">
          <q-card-section class="q-pa-lg">
            <div class="text-h5 q-mb-xl">Update ({{selectedItem.title}})</div>
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
            <div class="row q-gutter-sm">
              <q-btn no-caps class="" label="Update" color="secondary" @click="update"/>
              <q-btn no-caps class="" label="Delete" color="warning" @click="confirm=true"/>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col q-mt-lg">
        <div class="row justify-center">
           <p class="caption">Right Side of Detail</p>
        </div>
      </div>
    </div>

    <div class="col q-mt-lg">

    </div>

      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete_forever" color="primary" text-color="white" />
            <span class="q-ml-sm">You want to delete this record ?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn no-caps flat label="Cancel" color="primary" v-close-popup />
            <q-btn no-caps flat label="Yes" color="primary" v-close-popup @click="deleteItem"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  components: {},
  data () {
    return {
      isLoading: false,
      confirm: false,
      title: null,
      description: null,
      selectedItem: {}
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      // get the selected item from the state through computed property below
      console.log('this.tutorialList ', this.tutorialList)
      console.log('this.$route ', this.$route)
      /**
       * Ayaw e let nga mugamit ka ug .find, .map, .each, .filter
       * sa mga variable array nga naay chance mag undefined, null, empty or non-array
       * i check gyud then i return. <return means dili mu proceed sa next line.>
       * !undefined, !null, !empty are all true
       */
      if (!this.tutorialList) {
        return
      }
      this.selectedItem = this.tutorialList.find(el => {
        return el.id === this.$route.query.id
      })
      this.title = this.selectedItem.title
      this.description = this.selectedItem.description
    },
    async update () {
      const data = {
        title: this.title,
        description: this.description,
        id: this.$route.query.id
      }
      const isUpdated = await this.$danStoreDispatch('tutorial/updateTutorial', data)
      if (isUpdated) {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Successfully Updated',
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
    },
    async deleteItem () {
      if (!this.selectedItem) {
        return
      }
      const idToDelete = this.selectedItem.id
      const isDeleted = await this.$danStoreDispatch('tutorial/deleteTutorial', idToDelete)
      if (isDeleted) {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Successfully Deleted',
          position: 'top'
        })
        this.$router.push({ path: '/tutorial' })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: 'Something went wrong',
          position: 'top'
        })
      }
    }
  },
  computed: {
    tutorialList: {
      get () {
        // pwedi nimo i mutate ang tutorialList
        if (this.$danStoreState('tutorial').tutorialList && this.$danStoreState('tutorial').tutorialList.data) {
          return this.$danStoreState('tutorial').tutorialList.data.filter(e => {
            return e !== null
          })
        }
        return []
      },
      set (val) {
        this.$danStoreCommit('tutorial/updateTutorialList', val)
      }
    }
  },
  watch: {},
  beforeDestroy () {}
}
</script>
