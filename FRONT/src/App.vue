<template>
  <div id="app">
    <div id="nav">
      <router-link class="btn" to="/">Home</router-link>
      <div>
        <router-link class='btn btn__login' to="/login">Log in</router-link>
        <router-link class="btn btn__signup" to="/signup">Sign up</router-link>
      </div>
      <router-link class="btn btn__addImage" to='/add' v-show="checkAddImagePage">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-upload" class="svg-inline--fa fa-file-upload fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path></svg></router-link>
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
  }
}

</script>

<style lang="scss">
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
  color: black;

  background: white;
  background-image: radial-gradient(black 1px, transparent 0);
  background-size: 40px 40px;
  background-position: -19px -19px;
}

a{
  text-decoration: none;
  color: black;
}

#nav {
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  background-color: white;
  width: 100vw;
  min-width: 350px;
  position: sticky;
  top: 0;
  a {
    font-weight: bold;
    font-size: 20px;
    &.router-link-exact-active {
      color: black;
      background-image: radial-gradient(rgba(0, 0, 0, 0.4) .5px, transparent 0);
      background-size: 2.5px 2.5px;
      box-shadow: inset 2px 2px black;
    }
  }
}

.btn{
  border: 1px solid black;
  border-radius: 7px 7px ;
  display: inline-block;
  width: 100px;
  height: 30px;
  text-decoration: none;
  padding-top: 7px;
  margin: 10px;
  color: black;
  &__signup{
    background: white;
    margin-right: 20px;
  }
  &__login{
    background: white;
  }
  &__addImage{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    padding: 0;
    font-size: 30px;
    position: absolute;
    left: 0;
    right: 0;
    top: 85vh;
    margin-left: auto;
    margin-right: auto;
    max-width: 740px;
    background-color: white;
    box-shadow: 2px 2px black;
    &:hover{
      box-shadow: 0 0 white;
    }
    & svg{
      width: 33px;
      border: 2px solid white;
      background-color: white;
      position: relative;
      top: 10px;

    }
  }
  &:active{
    box-shadow: inset 2px 2px black;
    background-image: radial-gradient(rgba(0, 0, 0, 0.4) .5px, transparent 0);
    background-size: 2.5px 2.5px;
  }
}
</style>
