<template>
  <div class="comments">
    <p> {{ nbOfComments }} Commentaires</p>
  </div>
</template>

<script>
export default {
  name: 'cardComments',
  data () {
    return {
      nbOfComments: 3
    }
  }
}
</script>

<style lang="scss">
.comments{
  width: 100%;
  p{
  margin: 0;
  }
}
</style>
