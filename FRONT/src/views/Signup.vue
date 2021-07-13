<template>
  <div class="registerForm">
    <h1>Inscrivez-vous : </h1>
    <form @submit.prevent="submit">
      <label for="pseudo"> Votre pseudonyme </label> <br>
      <input type="text" id="pseudo" name="pseudo" v-model="pseudo"> <br>
      <div class="error" v-if="duplicatedUser">Ce pseudonyme est déjà prit.</div>
      <div class="error" v-if="!$v.pseudo.minLength">Doit comporter au moins 2 caractères.</div>
      <div class="error" v-if="!$v.pseudo.alphaNum">Ne peut contenir que des caractères alphanumériques.</div>

      <label for="email"> Votre email </label> <br>
      <input type="email" id="email" name="email" v-model="email"> <br>
      <div class="error" v-if="!$v.email.email">Veuillez entrer une adresse email valide.</div>
      <div class="error" v-if="duplicatedEmail">Cet email est déjà utilisé.</div>

      <label for="password"> Votre mot de passe </label> <br>
      <input type="password" id="password" name="password" v-model="password"> <br>
      <div class="error" v-if="!$v.password.minLength">Doit comporter au moins 7 caractères.</div>

      <label for="confirmPassword"> Confirmez votre mot de passe </label> <br>
      <input type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword"> <br>
      <div class="error" v-if="!$v.confirmPassword.sameAsPassword">Les 2 mots de passe doivent être identiques.</div>

      <input type="submit" value="Envoyez" :disabled="this.$v.$invalid">
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs, alphaNum } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      pseudo: '',
      email: '',
      password: '',
      confirmPassword: '',
      duplicatedUser: false,
      duplicatedEmail: false
    }
  },
  validations: {
    pseudo: { required, minLength: minLength(2), alphaNum },
    email: { required, email },
    password: { required, minLength: minLength(7) },
    confirmPassword: { sameAsPassword: sameAs('password') }
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.error('invalid inputs')
      } else {
        axios.post('https://ninety-nine-blag.herokuapp.com/api/users/signup', {
          pseudo: this.pseudo,
          email: this.email,
          password: this.password
        })
          .then(res => {
            console.log(res)
            const cookie = [res.data.userPseudo, res.data.token]
            this.$cookies.set('session', cookie, 60 * 60 * 12)
            setTimeout(function () { window.location.href = '/' }, 2000)
          })
          .catch(err => {
            const errorMessage = err.response.data.message
            if (errorMessage.includes('users.user')) {
              this.duplicatedUser = true
            } else if (errorMessage.includes('users.email')) {
              this.duplicatedEmail = true
            }
          })
      }
    }
  }
}
</script>

<style lang="scss">
.registerForm{
  background-color: #333333;
  border-radius: 15px;
  width: 50%;
  min-width: 280px;
  margin: auto;
  margin-top: 10vh;
  padding: 20px;
  box-shadow: 5px 5px black;
   & label{
     display: inline-block;
     margin-top: 20px;
   }
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
    &[type=submit]{
      transition: all 100ms ease;
      width: 20%;
      max-width: 150px;
      cursor: pointer;
      &:disabled{
        color: #333333;
        background-color:#10141A;
      }
      &:enabled{
        color: rgb(234, 230, 230);
        background-color:#333333;
      }
      &:active{
        box-shadow: inset 2px 2px #10141A;
      }
    }
  }
}

.error{
  font-size: 13px;
  font-style: italic;
  color: red;
}

</style>
