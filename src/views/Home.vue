<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <component :is="teste('HelloWorld')" />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, h, VNodeTypes } from "vue";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    HelloWorld: defineAsyncComponent(
      () => import(/* webpackPrefetch: true */ "@/components/HelloWorld.vue")
    ),
  },
})
export default class Home extends Vue {
  teste(nome: string): VNodeTypes {
    this.$refs.input;
    return h(
      defineAsyncComponent(
        () =>
          import(/* webpackPrefetch: true */ "@/components/" + nome + ".vue")
      )
    );
  }
}
</script>
