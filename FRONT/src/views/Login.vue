<template>
  <div class="loginForm">
    <h1>Connectez-vous : </h1>
    <form @submit.prevent="submit">
      <label for="email"> Votre email </label> <br>
      <input type="email" id="email" name="email" v-model="user.email"> <br>

      <label for="password"> Votre mot de passe </label> <br>
      <input type="password" id="password" name="password" v-model="user.password"> <br>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'app',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
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
      if (this.$v.$invalid) {
        console.log(this.$v.$dirty)
      } else {
        console.log(JSON.stringify(this.user))
      }
    }
  }
}
</script>

<style lang="scss">
.loginForm{
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
    &:last-of-type{
      box-shadow: 2px 2px black;
      transition: all 100ms ease;
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
