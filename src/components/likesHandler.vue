<template class="test">
  <div class="thumbs">
    <div class="thumb">
      <thumbs-up />
    </div>
    <div class="thumb">
      <thumbs-down /></div>
  </div>
</template>

<script>
import thumbsUp from './thumbsup.vue'
import thumbsDown from './thumbsdown.vue'

export default {
  name: 'likesHandler',
  components: {
    thumbsUp,
    thumbsDown
  }
}
</script>

<style lang="scss">
.thumbs{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 100%;
  //padding: 3px;
  font-size: .8em;
}

</style>
