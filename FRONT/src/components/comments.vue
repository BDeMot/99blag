<template>
  <div class="comment">
    <div class="comment__nameDateDelete">
      <span class="comment__nameDateDelete--nameNDate" > {{ author }}, {{ date }} </span>
      <svg v-if="this.userHavePrivilege === 1"
      @click="deleteComment" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="black" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path>
      </svg>
    </div>
    <p> {{ text }} </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'comments',
  data () {
    return {
      userHavePrivilege: 0
    }
  },
  props: {
    author: {
      type: String
    },
    date: {
      type: String
    },
    text: {
      type: String
    }
  },
  mounted () {
    if (this.$cookies.isKey('session')) {
      if (this.$cookies.get('session').split(',')[2] === '1' ||
      this.$cookies.get('session').split(',')[0] === this.author) {
        this.userHavePrivilege = 1
      }
    }
  },
  methods: {
    deleteComment () {
      axios.delete('https://ninety-nine-blag.herokuapp.com/api/gags/:id/comments/:id',
        {
          params: {
            commentId: this.$vnode.key,
            gagId: this.$route.params.id,
            user: this.$cookies.get('session').split(',')[1],
            author: this.author
          }
        }
      )
        .then(this.$emit('updateComments', 'remove'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss">
.comment{
  font-family: 'Times New Roman', Times, serif;
  background: white;
  min-width: 60%;
  max-width: 650px;
  margin: auto;
  &__nameDateDelete{
    display: flex;
    justify-content: space-between;
    margin: 5px;
    & svg {
      width: 15px;
      &:hover path{
        fill: red;
      }
    }
  }
  & p {
    text-align: left;
    padding: 20px;
    text-align: justify;
  }
}
</style>
