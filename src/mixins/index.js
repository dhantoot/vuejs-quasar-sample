import store from './store.js'

export default {
  mixins: [store],
  methods: {
    $initializeMixins () {
      console.log('Mixins initialized..')
      console.log('Store Mixin imported..', this)
    }
  }
}
