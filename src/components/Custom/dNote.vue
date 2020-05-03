<template>
  <div class="doc-note doc-note--tip">
    <p class="doc-note__title">{{title ? title : titleAlt}}</p>
    <p>{{description ? description : descAlt}}</p>
  </div>
</template>

<script>
export default {
  props: ['title', 'description', 'titleAlt', 'descAlt'],
  data () {
    return {}
  }
}
</script>
