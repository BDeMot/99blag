<template>
<form class="postComment" @submit.prevent="submit">
  <label for="textarea"> Ajouté un commentaire </label>
  <textarea id="textarea" name="comment" required></textarea>
  <button>Postez votre commentaire</button>
</form>
</template>

<script>
export default {
  name: 'postComment'
}
</script>

<style lang="scss">
textarea{
  min-width: 60%;
  max-width: 600px;
  margin-top: 30px;
  margin-bottom: 100px;
}

</style>
