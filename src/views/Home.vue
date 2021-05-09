<template>
  <div class="gag">
    <div class="likesNComments">
      <div class="likesNComments__likes">
        <likesHandler />
      </div>
      <div class="likesNComments__comm"></div>
    </div>
  </div>
</template>

<script>
import likesHandler from '../components/likesHandler.vue'

export default {
  components: {
    likesHandler
  }
}
</script>

<style lang="scss">
  .gag{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 350px;
    height: 50vh;
    border: 1px solid black;
    background: white;
    margin: auto;
    margin-top: 10vh;
  }

  .likesNComments{
    border-top: 1px solid black;
    &__likes{
      border-right: 1px solid black;
      width: 33%;
    }
  }
</style>
