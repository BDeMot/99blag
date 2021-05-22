<template>
  <div>
    <card
      class="oneGagCard"
      :title="gag.title"
      :key="gag.id"
      :imageUrl="gag.imageUrl"
      :likes="gag.likes"
      :dislikes="gag.dislikes"
      :op="gag.op"
      :date="gag.date"
      :id="gag.id"/>
    <post-comment />
    <comments />
    <comments />
    <comments />
  </div>
</template>

<script>
import card from '../components/card.vue'
import comments from '../components/comments.vue'
import postComment from '../components/post_comment.vue'

export default {
  components: {
    card,
    comments,
    postComment
  },
  data () {
    return {
      gag: this.$store.state.gags.find(gags => gags.id === this.$route.params.id)
    }
  }
}
</script>

<style lang="scss">
.oneGagCard{
  min-width: 60%;
  max-width: 600px;
}

</style>
