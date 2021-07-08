<template>
  <div class="loginForm">
    <h1>Connectez-vous : </h1>
    <form @submit.prevent="submit">
      <label for="email"> Votre email </label> <br>
      <input type="email" id="email" name="email" v-model="user.email"> <br>

      <label for="password"> Votre mot de passe </label> <br>
      <input type="password" id="password" name="password" v-model="user.password"> <br>
      <input type="submit" value="Envoyez" :disabled="this.$v.$invalid">
      <div v-if="unauthorized" class="unauthorized">
        <p> L'email ou le mot de passe ne sont pas valides.</p>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      unauthorized: false
    }
  },
  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(7) }
    }
  },
  methods: {
    submit () {
      axios.post('https://ninety-nine-blag.herokuapp.com/api/users/login', {
        email: this.user.email,
        password: this.user.password
      })
        .then(res => {
          const cookie = [res.data.userPseudo, res.data.token, res.data.privilege]
          this.$cookies.set('session', cookie, 60 * 60 * 12)
          setTimeout(function () { window.location.href = '/' }, 500)
        })
        .catch(err => {
          this.unauthorized = true
          console.error(err)
        })
    }
  }
}
</script>

<style lang="scss">
.loginForm{
  background-color: white;
  border: 1px solid black;
  width: 50%;
  min-width: 280px;
  margin: auto;
  margin-top: 10vh;
  padding: 20px;
  box-shadow: 5px 5px black;
  & input{
    margin-bottom: 20px;
    width: 50%;
    min-width: 280px;
    height: 30px;
    border: 1px solid black;
    &:last-of-type{
      transition: all 100ms ease;
      width: 20%;
      max-width: 150px;
      background-color: white;
      border: 1px solid black;
      &:enabled{
        box-shadow: 2px 2px black;
      }
      &:disabled{
        background-image: radial-gradient(rgba(0, 0, 0, 0.4) .5px, transparent 0);
        background-size: 2.5px 2.5px;
      }
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

  .unauthorized{
    border: 1px solid red;
    color: red;
  }
}
</style>
