<template>
  <div id="app">
    <TopNav />
    <Index />
    <BottomNav />
  </div>
</template>

<script>
import TopNav from "@/components/includes/TopNav";
import BottomNav from "@/components/includes/BottomNav";
import Index from "@/views/Home";

export default {
  name: "App",
  components: {
    TopNav,
    BottomNav,
    Index,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Raleway");
body {
  padding: 0;
  margin: 0;
}
body {
  background-color: #343a40;
}
#app {
  font-family: "Raleway", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  font-size: 100%;
}
.mint {
  background-color: #00ccc2 !important;
}
</style>
