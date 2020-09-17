import Vue from 'vue'
import io from 'socket.io-client'
import router from './router'

const socket = io('https://bddi-2019-chat.herokuapp.com/')

const COLORS = ['#57c7ff', '#58f08a', '#ff6ac1', '#f3f99d']
const store = new Vue({
  data: {
    isRegistered: false,
    error: null,
    user: {},
    users: [],
    messages: [],
    colors: {}
  },
  watch: {
    isRegistered (registered) {
      if (registered) {
        router.push('/')
      } else {
        router.push('/login')
      }
    }
  },
  methods: {
    registerListeners () {
      socket.on('connect', () => {
        const sessionUser = sessionStorage.getItem('user')

        if (sessionUser) {
          store.userRegister(JSON.parse(sessionUser).username)
        }
      })

      socket.on('disconnect', () => {
        this.isRegistered = false
        this.user = {}
      })

      socket.on('users update', ({ users, user, type }) => {
        if (this.users.length > 0) {
          // Test user
          if (type === 'join') {
            this.colors[user.username] = this.generateRandomColor()
          } else {
            delete this.colors[user.username]
          }
        } else {
          users.forEach((user) => {
            this.colors[user.username] = this.generateRandomColor()
          })
        }

        this.users = users
      })

      socket.on('user registered', (user) => {
        this.isRegistered = true
        this.error = null
        this.user = user
        sessionStorage.setItem('user', JSON.stringify(user))
      })

      socket.on('messages update', ({ messages }) => {
        this.messages = this.parseGiphy(messages)
      })

      socket.on('message new', ({ message }) => {
        message = this.parseGiphy([message])[0]
        this.messages.push(message)
      })

      socket.on('command new', ({ command, value }) => {

      })

      socket.on('chat error', (error) => {
        this.$set(this, 'error', error)
        console.log('chat error', error.message)
      })
    },

    generateRandomColor () {
      return COLORS[Math.floor(Math.random() * COLORS.length)]
    },

    logout () {
      sessionStorage.clear()
      socket.disconnect()
    },

    parseGiphy (messages) {
      const regex = /https:\/\/.*giphy\.com.*\.gif/

      return messages.map((message) => {
        const giphyLink = message.text.match(regex)
        if (giphyLink) {
          message = {
            user: message.user,
            text: message.text.replace(regex, `<img src="${giphyLink[0]}" height="100">`),
            html: true
          }
        }
        return message
      })
    },

    // API calls

    userRegister (username) {
      const avatar = 'https://vignette.wikia.nocookie.net/jaygt/images/4/41/Hidethepainharold.png/revision/latest/scale-to-width-down/340?cb=20190714050339'
      socket.emit('user register', { username, avatar })
    },
    userTyping () {

    },
    messageNew (message) {
      socket.emit('message new', message)
    }
  },
  created () {
    this.registerListeners()
  }
})

export default store
