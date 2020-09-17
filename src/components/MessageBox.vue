<template>
  <CliCommand
    ref="cli"
    :value="cliValue"
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
      selection: {},
      cliValue: 'send msg '
    }
  },
  methods: {
    onTyping () {
      this.$emit('typing')
    },
    resetValue () {
      this.cliValue = 'send msg '
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
      switch (action) {
        case 'msg':
          this.$emit('sendMessage', text)
          console.log('reset?')
          this.resetValue()
          break
        case 'cmd':
          this.$emit('sendMessage', '/' + text)
          this.resetValue()
          break
        case 'gif':
          this.$emit('sendMessage', '/gif ' + text)
          this.resetValue()
          break
        default:
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
