<template>
  <li>
    <strong v-if="message.user.name === 'Franco'">{{ message.user.name }}</strong>
    <em v-else>{{ message.user.name }}</em>
    : {{ message.text }}</li>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>
