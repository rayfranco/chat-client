<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
@import './theme/color.styl'

body, html
  padding 0
  margin 0
  background-color black

#app
  color white
  font-family Roboto Mono, Menlo, Monaco, 'Courier New', monospace
  font-size 14px
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  padding 10px

ul
  list-style-type none
  padding 0
  margin 0
</style>
