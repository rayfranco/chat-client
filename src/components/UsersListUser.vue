<template>
  <li><img :src="avatar">{{ user.username }}</li>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    avatar: {
      type: String
    }
  }
}
</script>
