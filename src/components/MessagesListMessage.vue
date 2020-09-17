<template>
  <li>
    <strong v-if="isCurrentUser">~{{ message.user.username }}*</strong>
    <em v-else>./user/{{ message.user.username }}</em>
    <em class="yellow"> > </em>
    <span v-if="message.html" v-html="message.text"></span>
    <span v-else>{{ message.text }}</span>
  </li>
</template>

<script>
import store from '../store'

export default {
  computed: {
    isCurrentUser () {
      return this.message.user.username ===
        store.$data.user.username
    }
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../theme/color.styl'
strong
  color pink
.yellow
  color yellow
</style>
