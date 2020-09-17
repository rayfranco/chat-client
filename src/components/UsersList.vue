<template>
  <CliCommand value="ls -a">
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
        const color = store.colors[user.username]
        return (user.avatar ? `<a href="${user.avatar}"><img src="${user.avatar}" height="14" width="14"></a> ` : '') +
          (this.isCurrentUser(user.username) ? `<strong style="color: ${color}">${user.username}*</strong>` : `<span style="color: ${color}">${user.username}</span>`)
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
