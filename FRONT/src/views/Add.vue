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
      <input type="file" id="image" name='image' accept='image/*' @change="imageHandler" hidden>
      <p class="size_alert" v-if="!validSize">La taille du fichier ne doit pas excéder 500 Ko.<p>
      <div v-if="imgUrl" id="imgPreview">
        <img :src="imgUrl" :alt="this.image.name" @click="deleteImg"/>
        <span id="delete" @click="deleteImg"> Supprimer cette image </span>
      </div>
      <input type="submit" value="Submit" :class="{ invalidSubmit: this.$v.$invalid, submit: !this.$v.$invalid }">
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
      success: false,
      validSize: true
    }
  },
  validations: {
    title: { required },
    image: { required }
  },
  methods: {
    imageHandler (event) {
      const imageSent = event.target.files[0]
      if (imageSent.size < 500000) {
        this.image = imageSent
        this.imgUrl = URL.createObjectURL(imageSent)
        this.validSize = true
      } else {
        this.validSize = false
      }
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
          url: 'https://ninety-nine-blag.herokuapp.com/api/gags',
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
  background-color: #333333;
  width: 50%;
  min-width: 280px;
  margin: auto;
  margin-top: 10vh;
  padding: 20px;
  border-radius: 15px;
  & input{
    margin-bottom: 20px;
    padding-left: 10px;
    width: 50%;
    min-width: 280px;
    height: 30px;
    background-color: #333333;
    border-radius: 15px;
    border: 1px solid #10141A;
    color: rgb(234, 230, 230);
    &.invalidSubmit{
        color: #333333;
        background-color:#10141A;
    }
    &.submit{
        color: rgb(234, 230, 230);
        background-color:#333333;
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
  min-width: 280px;
  min-height: 30px;
  border: 1px solid #10141A;
  margin-bottom: 20px;
  margin: auto;
  cursor : pointer;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

#imgPreview{
  margin: auto;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  & span {
    display: flex;
    height: 30px;
    width: 100%;
    background: #10141A;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 15px 15px;
  }
  & img {
    border-radius: 15px 15px 0 0;
    width: 100%;
    transition: opacity 200ms ease;
    cursor: pointer;
    &:hover{
      opacity: .4;
    }
  }
}

.uploadSucces{
  border: 2px solid black;
  border-radius: 15px;
  margin: auto;
  font-weight: bold;
  background-color : #333333;
}

.size_alert{
  color: red;
  font-size: .8em;
  margin: 0;
}
</style>
