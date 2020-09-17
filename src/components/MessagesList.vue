<template>
  <div class="MessagesList">
    <CliCommand
      value="cmd list --all"
      :disabled="true"
      :quoted="false">
      <ul ref="list" @mousewheel="onScroll">
        <MessagesListMessage
          v-for="(message, i) in messages"
          :key="i"
          :message="message"/>
      </ul>
    </CliCommand>
  </div>
</template>

<script>
import CliCommand from './CliCommand'
import MessagesListMessage from './MessagesListMessage'
export default {
  props: {
    messages: {
      type: Array
    }
  },
  data () {
    return {
      userControlScroll: false
    }
  },
  watch: {
    messages () {
      this.scrollDown()
    }
  },
  methods: {
    scrollDown () {
      const list = this.$refs.list
      this.$nextTick(() => {
        if (!this.userControlScroll) {
          list.scrollTop = list.scrollHeight
        }
      })
    },
    onScroll () {
      const list = this.$refs.list
      this.userControlScroll =
        list.scrollTop + list.clientHeight < list.scrollHeight
    }
  },
  components: {
    CliCommand,
    MessagesListMessage
  }
}
</script>

<style lang="stylus" scoped>
ul
  height 20rem
  overflow scroll
</style>
