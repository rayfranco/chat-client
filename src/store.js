import Vue from 'vue'
import io from 'socket.io-client'

const socket = io('https://bddi-2019-chat.herokuapp.com/')

const store = new Vue({
  data: {
    user: {},
    users: [],
    messages: []
  },
  methods: {
    registerListeners () {
      socket.on('connect', () => {
        console.log('connected')
      })

      socket.on('users update', ({ users }) => {
        this.users = users
      })

      socket.on('user registered', (infos) => {
        console.log('user registered', infos)
      })

      socket.on('messages update', (infos) => {
        console.log('messages update', infos)
      })

      socket.on('message new', (infos) => {
        console.log('message new', infos)
      })

      socket.on('chat error', (infos) => {
        console.log('chat error', infos)
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
    this.userRegister('Franco')
  }
})

export default store
