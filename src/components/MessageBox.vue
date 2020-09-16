<template>
  <div @click="focusInput">
    <CliCommand
      cmd="send"
      param1="msg"
      :param2="message"
      :quoted="true"
      :cursor="true">
        <form @submit.prevent="onSubmit">
          <input
            v-model="message"
            type="text"
            ref="input">
        </form>
    </CliCommand>
  </div>
</template>

<script>
import CliCommand from './CliCommand'

export default {
  data () {
    return {
      message: '',
      selection: {}
    }
  },
  methods: {
    focusInput () {
      this.$refs.input.focus()
    },
    onSubmit () {
      this.$emit('sendMessage', this.message)
      this.message = ''
    }
  },
  components: {
    CliCommand
  }
}
</script>

<style lang="stylus" scoped>
form, input
  opacity 0
  height 0
</style>
