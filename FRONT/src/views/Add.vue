<template>
  <div class="addForm">
    <h1>Envoyez votre gag : </h1>
    <div class="uploadSucces" v-if="success">
      <p> Gag créé avec succès !</p>
    </div>
    <form @submit.prevent="submit" v-if="!success">
      <label for="title"> Titre </label> <br>
      <input type="text" id="title" name="title" v-model="title"> <br>
      <label for="image" id="imgBtn"> {{this.image.name || "Choisissez une image"}}</label> <br>
      <input type="file" id="image" name='image' @change="imageHandler" hidden>
      <div v-if="imgUrl" id="imgPreview">
        <img :src="imgUrl" :alt="this.image.name" @click="deleteImg"/>
        <span id="delete" @click="deleteImg"> Supprimer cette image </span>
      </div>
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
      image: '',
      imgUrl: null,
      success: false
    }
  },
  validations: {
    title: { required },
    image: { required }
  },
  methods: {
    imageHandler (event) {
      this.image = event.target.files[0]
      this.imgUrl = URL.createObjectURL(this.image)
    },
    deleteImg () {
      this.image = ''
      this.imgUrl = null
      this.$mount()
    },
    submit () {
      if (this.$v.$invalid) {
        console.error('Data not valid ! One field or more is required.')
      } else {
        const formData = new FormData()
        formData.append('image', this.image)
        formData.append('title', this.title)
        formData.append('op', this.$cookies.get('session').split(',')[0])
        axios({
          method: 'post',
          url: 'http://localhost:3000/api/gags',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then(res => {
            this.success = true
            setTimeout(function () { window.location.href = '/' }, 2000)
          })
          .catch(err => alert(err))
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
    padding: 0;
    margin-bottom: 20px;
    width: 60%;
    min-width: 300px;
    height: 30px;
    border: 1px solid black;
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

#imgBtn{
  display: flex;
  width: 60%;
  min-width: 300px;
  min-height: 30px;
  border: 1px solid black;
  margin-bottom: 20px;
  margin: auto;
  cursor : pointer;
  justify-content: center;
  align-items: center;
}

#imgPreview{
  margin: auto;
  width: 60%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-image: radial-gradient(rgba(0, 0, 0, 0.4) .5px, transparent 0);
  background-size: 2.5px 2.5px;
  & span {
    display: flex;
    height: 30px;
    width: 100%;
    background: white;
    cursor: pointer;
    justify-content: center;
    align-items: center;
  }
  & img {
    width: 100%;
    transition: opacity 200ms ease;
    cursor: pointer;
    &:hover{
      opacity: .4;
    }
  }
}

.uploadSucces{
  border: 1px solid black;
  margin: auto;
  font-weight: bold;
  background-image: radial-gradient(rgba(30, 217, 52, 0.93) .5px, transparent 0);
  background-size: 2.5px 2.5px;
}
</style>
