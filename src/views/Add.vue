<template>
  <div class="addForm">
    <h1>Envoyez votre image : </h1>
    <form @submit.prevent="submit">
      <label for="title"> Titre </label> <br>
      <input type="text" id="title" name="title" v-model="formImage.title"> <br>

      <label for="UploadImages"> Choisissez votre image</label> <br>
      <UploadImages
      :max='1'
      uploadMsg="Cliquez ou glissez votre image ici"
      @change="imageHandler" /> <br>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import UploadImages from 'vue-upload-drop-images' // thx to yudax42 => https://github.com/yudax42/vue-upload-drop-images

export default {
  name: 'app',
  components: {
    UploadImages
  },
  data () {
    return {
      formImage: {
        title: '',
        file: ''
      }
    }
  },
  validations: {
    formImage: {
      title: { required },
      file: { required }
    }
  },
  methods: {
    imageHandler (file) {
      this.formImage.file = file
    },
    submit () {
      if (this.$v.$invalid) {
        console.log(this.$v.$invalid)
      } else {
        const formData = new FormData()
        formData.append('title', this.formImage.title)
        formData.append('file', this.formImage.file)
        console.log(formData)
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
  .container{
    width: 50%;
    margin: auto;
  }
}

</style>
