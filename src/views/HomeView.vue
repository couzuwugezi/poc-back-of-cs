<template>
  <div class="home">
    <HelloWorld msg="PoC for the Bank of ChangSha" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld
  }
};
</script>
