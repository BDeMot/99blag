<template>
  <div class="registerForm">
    <h1>Inscrivez-vous : </h1>
    <form @submit.prevent="submit">
      <label for="pseudo"> Votre pseudonyme </label> <br>
      <input type="text" id="pseudo" name="pseudo" v-model="user.pseudo"> <br>
      <div class="error" v-if="submitted && !$v.user.pseudo.required">Ce champs est requis.</div>
      <div class="error" v-if="duplicatedUser">Ce pseudonyme est déjà prit.</div>
      <div class="error" v-if="submitted && !$v.user.pseudo.minLength">Doit comporter au moins 3 caractères.</div>
      <div class="error" v-if="submitted && !$v.user.pseudo.alphaNum">Ne peut contenir que des caractères alphanumériques.</div>

      <label for="email"> Votre email </label> <br>
      <input type="email" id="email" name="email" v-model="user.email"> <br>
      <div class="error" v-if="submitted && !$v.user.email.required">Ce champs est requis.</div>
      <div class="error" v-if="submitted && !$v.user.email.email">Veuillez entrer une adresse email valide.</div>
      <div class="error" v-if="duplicatedEmail">Cet email est déjà utilisé.</div>

      <label for="password"> Votre mot de passe </label> <br>
      <input type="password" id="password" name="password" v-model="user.password"> <br>
      <div class="error" v-if="submitted && !$v.user.password.required">Ce champs est requis.</div>
      <div class="error" v-if="submitted && !$v.user.password.minLength">Doit comporter au moins 7 caractères.</div>

      <label for="confirmPassword"> Confirmez votre mot de passe </label> <br>
      <input type="password" id="confirmPassword" name="confirmPassword" v-model="user.confirmPassword"> <br>
      <div class="error" v-if="submitted && !$v.user.confirmPassword.sameAsPassword">Les 2 mots de passe doivent être identiques.</div>

      <input type="submit" value="Submit">
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
      user: {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      submitted: false,
      duplicatedUser: false,
      duplicatedEmail: false
    }
  },
  validations: {
    user: {
      pseudo: { required, minLength: minLength(2), alphaNum },
      email: { required, email },
      password: { required, minLength: minLength(7) },
      confirmPassword: { sameAsPassword: sameAs('password') }
    }
  },
  methods: {
    submit () {
      this.submitted = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.error('invalid inputs')
      } else {
        axios.post('http://localhost:3000/api/users/signup', {
          user: this.user,
          email: this.email,
          password: this.password
        })
          .then(res => {
            const cookie = [res.data.user, res.data.token]
            this.$cookies.set('session', cookie)
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
  background-color: white;
  border: 1px solid black;
  width: 50%;
  min-width: 300px;
  margin: auto;
  margin-top: 10vh;
  padding: 20px;
  box-shadow: 5px 5px black;
   & label{
     display: inline-block;
     margin-top: 20px;
   }
  & input{
    width: 50%;
    min-width: 300px;
    height: 30px;
    border: 1px solid black;
    &[type=submit]{
      box-shadow: 2px 2px black;
      transition: all 100ms ease;
      width: 20%;
      max-width: 150px;
      background-color: white;
      border: 1px solid black;
      margin-top: 40px;
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

.error{
  font-size: 13px;
  font-style: italic;
  color: red;
}

</style>
