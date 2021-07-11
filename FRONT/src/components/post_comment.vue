<template>
<form v-if="this.$cookies.isKey('session')" class="postComment" @submit.prevent>
  <textarea-autosize
    name="comment"
    placeholder="Ajoutez un commentaire..."
    ref="Comment"
    v-model="comment.text"
    :min-height="30"
    :max-height="350"
    required></textarea-autosize>
  <button @click="submitComment" class="submitComment" :disabled="this.comment.text.length < 3 ? true : false">Postez votre commentaire</button>
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
      if (this.comment.text.length > 2) {
        axios.post('https://ninety-nine-blag.herokuapp.com/api/gags/:id/comments', this.comment)
          .then(this.$emit('updateComments', 'add'))
          .catch(err => console.log(err))
      } else {
        console.error('Comment text must be at least 3 caracters long.')
      }
    }
  }
}
</script>

<style lang="scss">
.postComment{
  width: 100%;
  margin-bottom: 30px;
  & .submitComment{
    margin-bottom : 30px;
    color: rgb(234, 230, 230);
    background-color:#333333;
    border-radius: 15px;
    width: 50%;
    min-width: 300px;
    margin: auto;
    height: 30px;
    transition: all 400ms ease;
    border: 1px solid #333333;
    &:enabled{
      color: rgb(234, 230, 230);
      background-color:#333333;
    }
    &:disabled{
      color: #333333;
      background-color:#10141A;
    }
    &:active{
      box-shadow: inset 2px 2px black;
    }
  }
}
textarea{
  width: 95%;
  border: 1px solid black;
  border-radius: 15px;
  padding-left: 10px;
}

</style>
