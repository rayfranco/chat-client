import Vue from 'vue'
import io from 'socket.io-client'
import router from './router'

const socket = io('https://bddi-2019-chat.herokuapp.com/')

const store = new Vue({
  data: {
    isRegistered: false,
    error: null,
    user: {},
    users: [],
    messages: []
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

      socket.on('users update', ({ users }) => {
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
      socket.emit('user register', { username })
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
