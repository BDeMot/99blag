<template>
  <div id="app">
    <div id="nav">
      <router-link class="btn" to="/">Home</router-link>
      <router-link v-show="checkAddImagePage" v-if="$cookies.isKey('session')" class="btn btn__addImage" to='/add'>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-upload" class="svg-inline--fa fa-file-upload fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path>
        </svg>
      </router-link>
      <div class="loginSignup">
        <router-link v-if="!$cookies.isKey('session')" class='btn btn__login' to="/login">Log in</router-link>
        <router-link v-if="!$cookies.isKey('session')" class="btn btn__signup" to="/signup">Sign up</router-link>
        <span v-if="$cookies.isKey('session')" class=" btn btn__logout" @click="disconnect">Logout</span>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  computed: {
    checkAddImagePage () {
      if (this.$route.path === '/add') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    disconnect () {
      this.$cookies.remove('session')
      setTimeout(function () { location.reload() }, 1000)
    }
  }
}

</script>

<style lang="scss">
$main-color : #10141A;
$secondary-color: #333333;
$text-color: rgb(234, 230, 230);

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 0;
  margin: 0;
}

body{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: $text-color;
  background: $main-color;
}

a{
  text-decoration: none;
  color: $text-color;
}

#nav {
  display: flex;
  justify-content: space-between;
  background-color: $main-color;
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 35px;
  a {
    background-color: $secondary-color;
    color: rgb(234, 230, 230);
    &.router-link-exact-active {
      background-color: #004DCE;
    }
  }
}

  .loginSignup{
    display: flex;
  }
.btn{
  border-radius: 50px;
  width: 100px;
  height: 25px;
  text-decoration: none;
  padding: 3px;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  font-size: 18px;
  &__logout{
    background: $secondary-color;
    color: rgb(243, 170, 170);
    cursor: pointer;
  }
  &__addImage{
    height: 50px;
    width: 50px;
    padding: 0;
    font-size: 30px;
    max-width: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid $main-color;
    &:hover{
      box-shadow: 0 0 white;
    }
    & svg{
      width: 20px;
    }
  }
  &:active{
    box-shadow: inset 2px 2px black;
    background-image: radial-gradient(rgba(0, 0, 0, 0.4) .5px, transparent 0);
    background-size: 2.5px 2.5px;
  }

}
</style>
