<template>
  <div class="addForm">
    <h1>Envoyez votre image : </h1>
    <form @submit.prevent="submit">
      <label for="title"> Titre </label> <br>
      <input type="text" id="title" name="title" v-model="image.title"> <br>

      <label for="image"> Choisissez votre image</label> <br>
      <input type="file" id="image" name="image" @change="selectedFile()"> <br>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'app',
  data () {
    return {
      image: {
        title: '',
        file: ''
      }
    }
  },
  validations: {
    image: {
      title: { required },
      file: { required }
    }
  },
  methods: {
    submit () {
      if (this.$v.$invalid) {
        console.log(this.$v.$invalid)
      } else {
        console.log(JSON.stringify(this.image))
      }
    }
  }
}
</script>

<style lang="scss">
.addForm{
  background-color: white;
  border: 1px solid black;
  width: 50%;
  min-width: 300px;
  margin: auto;
  margin-top: 10vh;
  padding: 20px;
  box-shadow: 5px 5px black;
  & input{
    margin-bottom: 20px;
    width: 50%;
    min-width: 300px;
    height: 30px;
    border: 1px solid black;
    &[type=file]{
      width: 100px;
    }
    &:last-of-type{
      box-shadow: 2px 2px black;
      transition: all 400ms ease;
      width: 20%;
      max-width: 150px;
      background-color: white;
      border: 1px solid black;
      &:hover{
        box-shadow: 0 0 white;
      }
      &:active{
        box-shadow: inset 2px 2px black;
        background-image: radial-gradient(rgba(0, 0, 0, 0.4) .5px, transparent 0);
        background-size: 2.5px 2.5px;
      }
    }
  }
}
</style>
