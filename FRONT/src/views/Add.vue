<template>
  <div class="addForm">
    <h1>Envoyez votre image : </h1>
    <form @submit.prevent="submit">
      <label for="title"> Titre </label> <br>
      <input type="text" id="title" name="title" v-model="title"> <br>
      <label for="image"> Choisissez votre image</label> <br>
      <input type="file" name='image' @change="imageHandler">
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      title: '',
      image: null
    }
  },
  validations: {
    title: { required },
    image: { required }
  },
  methods: {
    imageHandler: function (event) {
      this.image = event.target.files[0]
    },
    submit () {
      if (this.$v.$invalid) {
        console.error('Data not valide ! One field or more is required.')
      } else {
        const formData = new FormData()
        formData.append('image', this.image)
        formData.append('title', this.title)
        console.log(this.formData)
        axios({
          method: 'post',
          url: 'http://localhost:3000/api/gags',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then(res => console.log('hmmmm...'))
          .catch(err => console.log(err))
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
    width: 60%;
    min-width: 300px;
    height: 30px;
    border: 1px solid black;
    &[type=file]{
      width: 300px;
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
