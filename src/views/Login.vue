<template>
  <div>
    <CliCommand
      value="login as "
      @command="onCommand">
      <div class="error" v-if="error">
        {{ error.message }}
      </div>
    </CliCommand>
  </div>
</template>

<script>
import store from '../store'
import CliCommand from '../components/CliCommand'

export default {
  data () {
    return {
      username: '',
      error: store.error
    }
  },
  methods: {
    onSubmit () {
      store.userRegister(this.username)
    },
    onCommand (input) {
      if (input.cmd === 'login' && input.action === 'as') {
        store.userRegister(input.text)
        this.error = { message: `Loggin in as "${input.text}". Please wait...` }
      } else {
        this.error = { message: `Unknown command "${input.cmd}". Try again.` }
      }
    }
  },
  components: {
    CliCommand
  }
}
</script>
