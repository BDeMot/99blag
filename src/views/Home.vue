<template>
  <div>
  <div class="card">
    <card />
  </div>
  <div class="card">
    <card />
  </div>
  <div class="card">
    <card />
  </div>
  </div>
</template>

<script>
import card from '../components/card.vue'

export default {
  components: {
    card
  }
}
</script>

<style lang="scss">
  .card{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 350px;
    height: 50vh;
    border: 1px solid black;
    background: white;
    margin: auto;
    margin-top: 5vh;
    margin-bottom: 5vh;
  }
</style>
