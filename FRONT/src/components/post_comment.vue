<template>
<form class="postComment" @submit.prevent>
  <textarea-autosize
    name="comment"
    placeholder="Ajoutez un commentaire..."
    ref="Comment"
    v-model="comment.text"
    :min-height="30"
    :max-height="350"
    required></textarea-autosize>
  <button @click="submitComment">Postez votre commentaire</button>
</form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'postComment',
  data () {
    return {
      comment: {
        text: '',
        user: this.$cookies.isKey('session') ? this.$cookies.get('session').split(',')[0] : '',
        commentedOn: this.$route.params.id
      }
    }
  },
  methods: {
    submitComment () {
      axios.post('http://localhost:3000/api/gags/:id/comments', this.comment)
        .then(this.$store.dispatch('getGags'))
        .catch(err => console.log(err))
      setTimeout(function () { location.reload() }, 1000)
    }
  }
}
</script>

<style lang="scss">
.postComment{
  width: 100%;
  margin-bottom: 30px;
  & button{
    margin-bottom : 30px;
    box-shadow: 2px 2px black;
    background-color: white;
    border: 1px solid black;
    width: 50%;
    min-width: 300px;
    margin: auto;
    height: 30px;
    transition: all 400ms ease;
    &:hover{
        box-shadow: 0 0 white;
      }
      &:active{
        box-shadow: inset 2px 2px black;
        background-image: radial-gradient(rgba(0, 0, 0, 0.4) .5px, transparent 0);
        background-size: 2.5px 2.5px;
      }
  }
}
textarea{
  width: 99%;
  border: 1px solid black;
  border-top: 0;
}

</style>
