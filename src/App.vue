<template>
  <div id="app">
    <div id="nav">
      <router-link class="btn" to="/">Home</router-link>
      <div>
        <router-link class='btn btn__login' to="/login">Log in</router-link>
        <router-link class="btn btn__signup" to="/signup">Sign up</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>

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
    &.router-link-exact-active {
      color: #42b983;
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
  color: white;
  text-shadow: #000000 1px 1px, #000000 -1px 1px, #000000 -1px -1px, #000000 1px -1px;
  &__signup{
    background: white;
    margin-right: 20px;
  }
  &__login{
    background: white;
  }
  &:hover{
    background-image: radial-gradient(rgba(0, 0, 0, 0.618) .5px, transparent 0);
    background-size: 2.5px 2.5px;
    color: white;
  }
}
</style>
