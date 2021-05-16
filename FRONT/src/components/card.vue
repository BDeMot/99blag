<template>
  <div class="likesNComments">
      <div class="likesNComments__likes">
        <likesHandler />
      </div>
      <div class="likesNComments__comm">
        <card-comments />
      </div>
    </div>
</template>

<script>
import likesHandler from './likesHandler.vue'
import cardComments from './cardComments.vue'

export default {
  components: {
    likesHandler,
    cardComments
  }
}
</script>

<style lang="scss">
  .likesNComments{
    border-top: 1px solid black;
    display: flex;
    &__likes{
      border-right: 1px solid black;
      width: 32%;
    }
    &__comm{
      width: 68%;
      margin: 0px;
      display: flex;
      align-items: center;
      &:hover{
        background-image: radial-gradient(rgba(0, 0, 0, 0.618) .5px, transparent 0);
        background-size: 2.5px 2.5px;
      }
    }
  }
</style>
