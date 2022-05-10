<template>
  <nav>
    <div class="nav-wrapper mint lighten-1">
      <span class="brand-logo">Anime Type Test</span>
    </div>
  </nav>
</template>

<script>
    export default {
        name: "top-nav"
    }
</script>

<style scoped>
nav .brand-logo{
    left: 15%;
}
  @media only screen and (max-width: 300px){
nav .brand-logo{
    left: 50%;
}
  }

</style>
