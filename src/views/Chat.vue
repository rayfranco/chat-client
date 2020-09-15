<template>
  <div>
    <UsersList :users="users"/>
    <MessageList :messages="messages"/>
    <MessageBox @sendMessage="onSendMessage"/>
  </div>
</template>

<script>
import MessageBox from '../components/MessageBox.vue'
import MessageList from '../components/MessagesList.vue'
import UsersList from '../components/UsersList.vue'

export default {
  data () {
    return {
      users: [
        { name: 'Pierre' },
        { name: 'Paul' },
        { name: 'Jack' }
      ],
      messages: [
        { user: { name: 'Pierre' }, text: 'Hey salut les nazes' },
        { user: { name: 'Paul' }, text: 'slt' }
      ]
    }
  },
  methods: {
    onSendMessage (text) {
      this.messages.push({
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
