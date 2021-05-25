<template>
  <div class="comment">
    <span class="comment__nameNDate" > Posté par {{ author }}, le {{ date }} </span>
    <p> Ceci est un commentaire pour tester la mise en page Ceci est un commentaire
      pour tester la mise en page Ceci est un commentaire pour tester la mise en page Cec
      i est un commentaire pour tester la mise en page</p>
  </div>
</template>

<script>
export default {
  name: 'comments',
  props: {
    author: {
      type: String
    },
    date: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.comment{
  font-family: 'Times New Roman', Times, serif;
  border: 1px solid black;
  background: white;
  min-width: 60%;
  max-width: 650px;
  margin: auto;
  &__nameNDate{
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
  }
}
</style>
