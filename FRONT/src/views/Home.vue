<template>
  <div>
    <div v-if="$store.state.gags !== null">
      <card
      class="cards"
      v-for="gag in $store.state.gags"
      :title="gag.title"
      :key="gag.id"
      :imageUrl="gag.imageUrl"
      :likes="gag.likes"
      :dislikes="gag.dislikes"
      :op="gag.op"
      :date="$moment(gag.date).fromNow()"
      :id="gag.id"
      :nbOfComments="gag.nb_of_comments"
      @updateThis="updateThisHere"
      />
    </div>
    <div class="loader" v-else>
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import card from '../components/card.vue'

export default {
  components: {
    card
  },
  mounted () {
    this.$store.dispatch('getGags')
  },
  methods: {
    updateThisHere () {
      setTimeout(() => {
        this.$store.dispatch('getGags') // remember, an arrow function does not have its own "this". Otherwise, "this" would refer to the Set Tmeout function.
      }, 500)
    }
  }
}
</script>

<style lang="scss">
.cards{
  min-width: 300px;
  max-width: 450px;
}

.loader{
  display: flex;
  width: 100%;
  height: 100%;
  background-color:  #10141A;
  position: absolute;
  top: 50px;
  left:50px;
  color: white;
  justify-content: center;
  align-items: center;
  & .lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
} .lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

}
</style>
