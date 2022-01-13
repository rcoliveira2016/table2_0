<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from "vue";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    HelloWorld: defineAsyncComponent(
      () => import(/* webpackPrefetch: true */ "@/components/HelloWorld.vue")
    ),
  },
})
export default class Home extends Vue {}
</script>
