<template>
  <q-card class="my-card">
    <q-card-section>
        <div class="text-overline text-orange-9">{{overline}}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{title}}</div>
        <div class="text-caption text-grey">
          {{description}}
        </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ['overline', 'title', 'description'],
  data () {
    return {}
  }
}
</script>
