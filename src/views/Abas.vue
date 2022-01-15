<template>
  <div class="about">
    <aba-rotas />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

import AbaRotas from "@/components/abas/AbaRotas.vue";
@Options({
  name: "abas",
  components: {
    AbaRotas,
  },
})
export default class Abas extends Vue {}
</script>
