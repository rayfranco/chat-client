<template>
  <div>
    <UsersList :users="store.users"/>
    <MessageList :messages="store.messages"/>
    <MessageBox
      @sendMessage="onSendMessage"
      @logoutRequest="logout"
      @typing="onTyping"/>
  </div>
</template>

<script>
import MessageBox from '../components/MessageBox.vue'
import MessageList from '../components/MessagesList.vue'
import UsersList from '../components/UsersList.vue'

import axios from 'axios'
import store from '../store'

export default {
  data () {
    return {
      store
    }
  },
  methods: {
    onSendMessage (text) {
      const match = text.match(/^\/gif (.+)/)
      if (match) {
        const tag = match[1]
        console.log('sending request for tag', tag)
        axios
          .get(`https://api.giphy.com/v1/gifs/random?api_key=Zmxd68H8QGnFXrbaURxWj0T0o8QMFpJQ&tag=${tag}&rating=g`)
          .then((response) => {
            store.messageNew(response.data.data.image_original_url)
          })
        return
      }
      store.messageNew(text)
    },
    onTyping () {
      console.log('typing')
      store.userTyping()
    },
    logout () {
      store.logout()
    }
  },
  components: {
    MessageBox,
    MessageList,
    UsersList
  }
}
</script>
