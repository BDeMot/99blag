<template>
  <div>
    <card v-for="gag in $store.state.gags"
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
</style>
