<template>
  <div @click="onSelect" @select="onSelect">
    <p>
      <span class="url">~/Sites/gobelins/2020/chat-client </span>
      <span class="git">master*</span>
    </p>
    <p>
      <span class="arrow">❯ </span>
      <span v-if="cmd" class="cmd">{{cmd}}</span>
      <span v-if="action" class="action">&nbsp;{{action}}&nbsp;</span>
      <span v-if="text && quoted" class="text">"</span>
      <span v-if="text" class="text">{{text}}</span>
      <span v-if="text && quoted" class="text">"</span>
    </p>
    <form @submit.prevent="onSubmit">
      <input
        ref="input"
        type="text"
        :disabled="disabled"
        v-model="command"
        @keydown="$emit('typing')">
    </form>
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      command: ''
    }
  },
  props: {
    value: {
      type: String,
      required: true
    },
    // Disabled interaction with input
    disabled: {
      type: Boolean,
      default: false
    },
    // Display quote on text
    quoted: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onSelect () {
      if (!this.disabled) this.$refs.input.focus()
    },
    onSubmit () {
      if (this.disabled) return
      if (this.cmd) {
        this.$emit('command', {
          cmd: this.cmd,
          action: this.action,
          text: this.text
        })
      }
    }
  },
  computed: {
    split () {
      return this.command.split(' ')
    },
    cmd () {
      return this.split[0]
    },
    action () {
      return this.split[1]
    },
    text () {
      return this.split.slice(0).splice(2).join(' ')
    }
  },
  created () {
    this.command = this.value
  },
  mounted () {
    this.$refs.input.focus()
  },
  watch: {
    value (val) {
      this.command = val
    }
  }
}
</script>

<style lang="stylus" scoped>
input
  opacity 0
  width 0
</style>

<style lang="stylus">
@import '../theme/color.styl'

.url
  color blue
.git
  color grey
.arrow
  color pink
.cmd
  color green
.action
  color white
.text
  color yellow

input, form
  height 0
  opacity 0

// em.cursor
//   display inline-block
//   width 2px
//   height 14px
//   background yellow
</style>
