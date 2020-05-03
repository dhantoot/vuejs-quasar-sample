<template>
  <q-item clickable v-ripple @click="goToDetails">
    <q-item-section>
      <q-item-label>{{itemKadaLoop.title}}</q-item-label>
      <q-item-label caption>{{itemKadaLoop.description}}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <!-- <q-icon name="delete" @click="deleteItem"/> -->
      <!-- <q-btn label="Delete" color="warning" @click="deleteItem"/> -->
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ['itemKadaLoop'],
  data () {
    return {}
  },
  methods: {
    goToDetails () {
      if (this.itemKadaLoop && this.itemKadaLoop.id) {
        this.$router.push({ name: '_detail', query: { id: this.itemKadaLoop.id } })
      }
    }
  }
}
</script>
