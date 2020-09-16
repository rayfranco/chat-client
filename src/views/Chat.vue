<template>
  <div>
    <UsersList :users="store.users"/>
    <MessageList :messages="store.messages"/>
    <MessageBox @sendMessage="onSendMessage"/>
  </div>
</template>

<script>
import MessageBox from '../components/MessageBox.vue'
import MessageList from '../components/MessagesList.vue'
import UsersList from '../components/UsersList.vue'

import store from '../store'

export default {
  data () {
    return {
      store
    }
  },
  methods: {
    onSendMessage (text) {
      store.messages.push({
        user: { name: 'Franco' },
        text
      })
    }
  },
  components: {
    MessageBox,
    MessageList,
    UsersList
  }
}
</script>
