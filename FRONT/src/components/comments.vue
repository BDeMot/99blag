<template>
  <div class="comment">
    <span class="comment__nameNDate" > {{ author }}, le {{ date }} </span>
    <p> {{ text }} </p>
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
    },
    text: {
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
  & p {
    text-align: left;
    padding: 10px;
    text-align: justify;
  }
}
</style>
