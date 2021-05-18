<template>
  <div>
    <card v-for="gag in $store.state.gags"
    :title="gag.title"
    :key="gag.id"
    :imageUrl="gag.imageUrl"
    :likes="gag.likes"
    :dislikes="gag.dislikes"
    :op="gag.op"
    :date="gag.date"
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
  }
}
</script>

<style lang="scss">
</style>
