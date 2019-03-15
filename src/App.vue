<template>
  <div id="app">
    <TopNav/>
    <Index/>
  </div>
</template>

<script>
  import TopNav from '@/components/includes/TopNav'
  import Index from '@/views/Home'

export default {
  name: 'App',
  components: {
    TopNav,
    Index
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway');
body{
  padding: 0;
  margin: 0;
}
body{
    background-color: #343a40;
}
#app {
font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  font-size: 100%;
}
</style>
