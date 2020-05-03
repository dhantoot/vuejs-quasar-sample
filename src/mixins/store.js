export default {
  computed: {},
  methods: {
    $danStoreState (storeName) {
      return this.$store.state[storeName]
    },
    $danStoreCommit (mutationName, payload) { // payload is obj
      this.$store.commit(mutationName, payload)
    },
    $danStoreDispatch (storeName, payload) {
      if (!(payload instanceof Object)) {
        payload = {}
      }
      return this.$store.dispatch({
        type: storeName,
        payload // object
      })
    }
  }
}
