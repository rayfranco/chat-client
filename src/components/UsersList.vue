<template>
  <CliCommand cmd="ls">
    <div class="usersJoined" v-html="usersJoined"></div>
  </CliCommand>
</template>

<script>
import CliCommand from './CliCommand'
import store from '../store'

export default {
  props: {
    users: {
      type: Array
    }
  },
  components: {
    CliCommand
  },
  methods: {
    isCurrentUser (username) {
      return username === store.user.username
    }
  },
  computed: {
    usersJoined () {
      return this.users.map((user) => {
        return this.isCurrentUser(user.username) ? `<strong>${user.username}*</strong>` : user.username
      }).join(', ')
    }
  }
}
</script>

<style lang="stylus">
@import '../theme/color.styl'

div.usersJoined strong
  color pink
</style>
