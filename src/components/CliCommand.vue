<template>
  <div>
    <p>
      <span class="url">~/Sites/gobelins/2020/chat-client </span>
      <span class="git">master*</span>
    </p>
    <p>
      <span class="arrow">❯ </span>
      <span class="cmd">{{ cmd }} </span>
      <span class="param1" v-if="param1">{{ param1 }} </span>
      <span class="param2" v-if="param2">
        <template v-if="quoted">"</template>
        <template v-if="cursor"><em class="cursor"></em></template>{{ param2 }}<template v-if="quoted">"</template>
      </span>
    </p>
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    cmd: {
      type: String,
      required: true
    },
    param1: {
      type: String
    },
    param2: {
      type: String
    },
    quoted: {
      type: Boolean,
      default: false
    },
    cursor: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../theme/color.styl'

.url
  color blue
.git
  color grey
.arrow
  color pink
.cmd
  color green
.param1
  color white
.param2
  color yellow

// em.cursor
//   display inline-block
//   width 2px
//   height 14px
//   background yellow
</style>
