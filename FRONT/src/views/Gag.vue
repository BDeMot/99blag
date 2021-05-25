<template>
  <div class="oneGagCard">
    <card
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
    <button @click="test">test</button>
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
  },
  methods: {
    test () {
      console.log(Number(this.$route.params.id))
    }
  }
}
</script>

<style lang="scss">
.oneGagCard{
  max-width: 650px;
  margin: auto;
  //max-width: 600px;
}

</style>
