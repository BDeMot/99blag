<template>
  <div class="card">
    <router-link v-if="typeof id !=='undefined'" :to="{name: 'Gag', params: { id : id }} ">
      <div class="card__title">
        <h3> {{title}} </h3>
        <svg @click="deleteGag" v-if="this.userHavePrivilege === 1" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path fill="black" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path>
        </svg>
      </div>
      <div class="card__image">
        <img v-show="imgLoaded" v-lazy="imageUrl" :alt="title" @load="onImgLoad"/> <!-- TODO ajouter la taille des images en attributs afin de ne pas moddifier la mise en page lors du chargement -->
        <loading-spinner v-if="!imgLoaded"/>
      </div>
    </router-link>
    <div class="card__legend">
      <p> Ajouté par {{ op }}, {{ date }} </p>
    </div>
    <div class="card__commentsNLikes">
      <div class="card__commentsNLikes--likes">
        <div :class="{thumbsDown: like === -1}" @click="likeOrDislike(-1)">
          <svg width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 10.15625 6 C 8.746094 6 7.515625 6.996094 7.21875 8.375 L 5.0625 18.375 C 4.667969 20.222656 6.113281 22 8 22 L 13.75 22 L 13.5625 22.75 C 13.359375 22.90625 13.230469 22.972656 12.9375 23.375 C 12.46875 24.015625 12 25.007813 12 26.34375 C 12 27.769531 13.289063 29 14.90625 29 L 15.3125 29 L 15.625 28.71875 L 22.40625 22 L 27 22 L 27 6 Z M 10.15625 8 L 21 8 L 21 20.59375 L 14.59375 26.90625 C 14.171875 26.824219 14 26.652344 14 26.34375 C 14 25.441406 14.273438 24.882813 14.53125 24.53125 C 14.789063 24.179688 14.96875 24.09375 14.96875 24.09375 L 15.3125 23.90625 L 15.4375 23.5 L 16.03125 21.25 L 16.34375 20 L 8 20 C 7.339844 20 6.894531 19.425781 7.03125 18.78125 L 9.15625 8.78125 C 9.257813 8.3125 9.679688 8 10.15625 8 Z M 23 8 L 25 8 L 25 20 L 23 20 Z"/></svg>
        </div>
          <span class="nbOfDislikes"> {{ dislikes }} </span>
        <div :class="{thumbsUp: like === 1}" @click="likeOrDislike(1)">
          <svg width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 16.6875 3 L 16.375 3.28125 L 9.59375 10 L 5 10 L 5 26 L 21.84375 26 C 23.253906 26 24.484375 25.003906 24.78125 23.625 L 26.9375 13.625 C 27.332031 11.777344 25.886719 10 24 10 L 18.25 10 L 18.4375 9.25 C 18.640625 9.09375 18.769531 9.027344 19.0625 8.625 C 19.53125 7.984375 20 6.992188 20 5.65625 C 20 4.230469 18.710938 3 17.09375 3 Z M 17.40625 5.09375 C 17.828125 5.175781 18 5.347656 18 5.65625 C 18 6.558594 17.726563 7.117188 17.46875 7.46875 C 17.210938 7.820313 17.03125 7.90625 17.03125 7.90625 L 16.6875 8.09375 L 16.5625 8.5 L 15.96875 10.75 L 15.65625 12 L 24 12 C 24.660156 12 25.105469 12.574219 24.96875 13.21875 L 22.84375 23.21875 C 22.742188 23.6875 22.320313 24 21.84375 24 L 11 24 L 11 11.40625 Z M 7 12 L 9 12 L 9 24 L 7 24 Z"/></svg>
        </div>
          <span class="nbOfLikes"> {{ likes }} </span>
      </div>
      <div class="card__commentsNLikes--comments">
        <div class="comments--bubble">
          <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="comments" class="svg-inline--fa fa-comments fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path fill="currentColor" d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z"></path>
          </svg>
          <p> {{nbOfComments}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import loadingSpinner from '../components/loadingSpinner.vue'

export default {
  components: { loadingSpinner },

  name: 'card',
  data () {
    return {
      like: 0,
      userHavePrivilege: 0,
      imgLoaded: false
    }
  },
  props: {
    title: {
      type: String
    },
    imageUrl: {
      type: String
    },
    likes: {
      type: Number
    },
    dislikes: {
      type: Number
    },
    op: {
      type: String
    },
    date: {
      type: String
    },
    id: {
      type: Number
    },
    nbOfComments: {
      type: Number
    }
  },
  methods: {
    onImgLoad () {
      this.imgLoaded = true
    },
    likeOrDislike (likeType) {
      if (this.$cookies.isKey('session')) {
        if (this.like === likeType) {
          axios.delete('https://ninety-nine-blag.herokuapp.com/api/gags/:id/likes',
            { params: { user: this.$cookies.get('session').split(',')[1], gag: this.$vnode.key } })
            .then(this.$emit('updateThis'))
            .catch(err => console.log(err))
          this.like = 0
        } else {
          const likeDislike = [this.$cookies.get('session').split(',')[1], this.$vnode.key, likeType]
          axios.post('https://ninety-nine-blag.herokuapp.com/api/gags/:id/likes', likeDislike)
            .then(this.$emit('updateThis'))
            .catch(err => console.log(err))
          this.like = likeType
        }
      }
    },
    deleteGag () {
      axios.delete('https://ninety-nine-blag.herokuapp.com/api/gags/:id',
        { params: { user: this.$cookies.get('session').split(',')[1], gagId: this.$vnode.key, author: this.op } })
        .then(
          window.location.href = '/'
        )
        .catch(err => console.log(err))
    }
  },
  beforeMount () {
    if (this.$cookies.isKey('session')) {
      if (this.$cookies.get('session').split(',')[2] === '1' || this.$cookies.get('session').split(',')[0] === this.op) {
        this.userHavePrivilege = 1
      }
      axios.get('https://ninety-nine-blag.herokuapp.com/api/gags/:id/likes',
        { params: { user: this.$cookies.get('session').split(',')[1], gag: this.$vnode.key } })
        .then(res => {
          this.like = res.data.results[0]?.likeType ?? 0
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss">
.card{
  display: flex;
  flex-direction: column;
  align-items: space-between;
  min-width: 300px;
  max-width: 550px;
  margin: auto;
  margin-top: 3vh;
  margin-bottom: 10vh;
  & router-link{
    text-decoration-line: none;
  }
  &__image{
    width: 100%;
    & img {
    border-radius: 15px;
      width: 100%;
    }
  }
  &__title {
    min-height: 30px;
    display: flex;

    justify-content: center;
    & svg {
      width: 15px;
      margin: 5px;
      & path {
        fill: rgb(234, 230, 230);
      }
      &:hover path{
        fill: red;
      }
    }
    & h3 {
      margin: 5px;
      inline-size: 98%;
      overflow-wrap: break-word;
      width: 90%;
    }
  }
  &__legend{
    display: flex;
    align-items: center;
    height: 30px;
    padding-left: 5px;
    font-size: 15px;
  }
  &__commentsNLikes {
    display: flex;
    &--likes{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-left: 10px;
        & .nbOfDislikes, .nbOfLikes {
          font-size: 15px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          position: relative;
          top: 20px;
          right: 50px;
          border-radius: 50%;
          background-color: #004cceaa;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      & div {
        background-color: #333333;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        & svg {
          width: 35px;
          height: 35px;
          fill: rgb(234, 230, 230);
        }
      }
    }
    &--comments {
      width: 70%;
    }
  }

  .comments--bubble{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #333333;
    margin: auto;
    & svg {
      width : 35px;
      height: 35px;
      position: relative;
      top: 7px;
    }
    & p {
      font-size: 15px;
      display:flex;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #004cceaa;
      position: relative;
      bottom: 20px;
      justify-content: center;
      align-items: center;
    }
  }

  .thumbsUp path{
    fill: green;
  }

  .thumbsDown path{
    fill: red;
  }
}
</style>
