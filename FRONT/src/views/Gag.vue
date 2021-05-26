<template>
  <div class="oneGagCard">
    <card
      v-if="$route.params.id"
      :title="gag.title"
      :key="gag.id"
      :imageUrl="gag.imageUrl"
      :likes="gag.likes"
      :dislikes="gag.dislikes"
      :op="gag.op"
      :date="gag.date"
      :nbOfComments="gag.nb_of_comments"
      :id="gag.id"/>
    <post-comment />
    <comments
      v-for="comment in this.comments"
      :key="comment.id"
      :author="comment.user"
      :date="comment.date"
      :text="comment.comment"/>
  </div>
</template>

<script>
import card from '../components/card.vue'
import comments from '../components/comments.vue'
import postComment from '../components/post_comment.vue'
import axios from 'axios'

export default {
  components: {
    card,
    comments,
    postComment
  },
  data () {
    return {
      gag: this.$store.state.gags.find(gags => gags.id === Number(this.$route.params.id)),
      comments: []
    }
  },
  mounted () {
    axios.get('http://localhost:3000/api/gags/:id/comments', { params: { gagId: Number(this.$route.params.id) } })
      .then(res => {
        this.comments = res.data.results.reverse()
      })
      .catch(err => console.log(err))
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
