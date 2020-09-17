<template>
  <CliCommand
    ref="cli"
    value="send msg "
    @command="onCommand"
    @typing="onTyping">
      <p v-if="error && error.message">{{ error.message }}</p>
    </CliCommand>
</template>

<script>
import CliCommand from './CliCommand'

export default {
  data () {
    return {
      error: {},
      selection: {}
    }
  },
  methods: {
    onTyping () {
      this.$emit('typing')
    },
    // CLI Commands
    onCommand (command) {
      this.error = {}
      switch (command.cmd) {
        case 'send':
          this.onSend(command.action, command.text)
          break
        case 'logout':
        case 'exit':
        case 'quit':
          this.onLogout()
          break
        default:
          this.onUnknownCommand(command.cmd)
      }
    },
    onSend (action, text) {
      if (action === 'msg') {
        this.$emit('sendMessage', text)
      } else if (action === 'cmd') {
        this.$emit('sendMessage', '/' + text)
      } else {
        this.onUnknownAction(action)
      }
    },
    onLogout () {
      this.$emit('logoutRequest')
    },
    onUnknownCommand (cmd) {
      this.error = { message: `Unknown command ${cmd}. Please try again` }
    },
    onUnknownAction (action) {
      this.error = { message: `Unknown action ${action}. Please try again` }
    }
  },
  components: {
    CliCommand
  }
}
</script>
