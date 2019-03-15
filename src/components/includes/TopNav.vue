<template>
  <nav>
    <div class="nav-wrapper teal lighten-1">
      <a href="#" class="brand-logo">TypeTest</a>
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
    left: 25%;
}
  @media only screen and (max-width: 300px){
nav .brand-logo{
    left: 50%;
}
  }

</style>
