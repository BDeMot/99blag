<template>
  <div class="oneGagCard">
    <card
      :title="gag.title"
      :key="gag.id"
      :imageUrl="gag.imageUrl"
      :likes="gag.likes"
      :dislikes="gag.dislikes"
      :op="gag.op"
      :date="$moment(gag.date).fromNow()"
      :nbOfComments="gag.nb_of_comments"
      :id="gag.id"
      @updateThis="updateThisHere"/>
    <post-comment />
    <comments
      class="comments"
      v-for="comment in comments"
      :key="comment.id"
      :author="comment.user"
      :date="$moment(comment.date).fromNow()"
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
      gag: [],
      comments: []
    }
  },
  beforeCreate () {
    axios.get('http://localhost:3000/api/gags/:id/comments', { params: { gagId: Number(this.$route.params.id) } })
      .then(res => {
        this.comments = res.data.results.reverse()
      })
      .catch(err => console.log(err))
  },
  created () {
    this.gag = this.$store.state.gags.find(gag => gag.id === this.$route.params.id)
  },
  methods: {
    updateThisHere () {
      setTimeout(() => {
        axios.get('http://localhost:3000/api/gags/:id', { params: { gagId: Number(this.$route.params.id) } })
          .then(res => {
            this.gag = res.data.results[0]
          }) // remember, an arrow function does not have its own "this". Otherwise, "this" would refer to the Set Tmeout function.
      }, 500)
    }
  }
}
</script>

<style lang="scss">
.oneGagCard{
  max-width: 650px;
  margin: auto;
}

.comments{
 border: 1px solid black;
 border-bottom: 0;
 overflow: hidden;
 &:last-child{
   margin-bottom: 3vh;
   border-bottom: 1px solid black;
 }
}

</style>
