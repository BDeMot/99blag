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
    <post-comment @updateComments="updateComments" />
    <div class="container">
      <comments
        class="comments"
        v-for="comment in comments"
        :key="comment.id"
        :author="comment.user"
        :date="$moment(comment.date).fromNow()"
        :text="comment.comment"
        @updateComments="updateComments"
        />
    </div>
  </div>
</template>

<script>
import card from './card.vue'
import comments from './comments.vue'
import postComment from './post_comment.vue'
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
  async beforeCreate () {
    await axios.get('https://ninety-nine-blag.herokuapp.com/api/gags/:id', { params: { gagId: window.location.pathname.split('/')[2] } })
      .then(res => { this.gag = res.data.results[0] })
    axios.get('https://ninety-nine-blag.herokuapp.com/api/gags/:id/comments', { params: { gagId: window.location.pathname.split('/')[2] } })
      .then(res => {
        this.comments = res.data.results.reverse()
      })
      .catch(err => console.log(err))
  },
  mounted () {
    this.gag = this.$store.state.gags.find(gag => gag.id === window.location.pathname.split('/')[2])
  },
  methods: {
    updateThisHere () {
      setTimeout(() => {
        axios.get('https://ninety-nine-blag.herokuapp.com/api/gags/:id', { params: { gagId: window.location.pathname.split('/')[2] } })
          .then(res => {
            this.gag = res.data.results[0]
          }) // remember, an arrow function does not have its own "this". Otherwise, "this" would refer to the Set Tmeout function.
      }, 500)
    },
    updateComments (addOrRemove) {
      addOrRemove === 'add' ? this.gag.nb_of_comments++ : this.gag.nb_of_comments--
      setTimeout(() => {
        axios.get('https://ninety-nine-blag.herokuapp.com/api/gags/:id/comments', { params: { gagId: window.location.pathname.split('/')[2] } })
          .then(res => {
            this.comments = res.data.results.reverse()
            this.$store.dispatch('getGags')
          })
          .catch(err => console.log(err))
      }, 1000)
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
 border-bottom: 0;
 overflow: hidden;
}

.container{
  overflow: hidden;
  border-radius: 15px;
  margin-bottom: 3vh;
}

.s{
  border:1px solid red;
}

</style>
