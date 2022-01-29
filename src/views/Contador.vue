<template>
  <div class="contador">
    <button @click="valor++">+</button>
    <span>{{ valor }}</span>
    <button @click="valor--">-</button>
  </div>
</template>
<script lang="ts">
import { mixins, Options } from "vue-class-component";
import {
  /* webpackChunkName: "ContadorModule" */ ContadorModule,
} from "@/store/modules/contador/contador-module";
import { PaginaAba } from "@/views/pagina-aba";

@Options({
  name: "contador",
})
export default class Contador extends mixins(PaginaAba) {
  get valor(): number {
    return ContadorModule.valor;
  }
  set valor(valor: number) {
    ContadorModule.alterarValor(valor);
  }
}
</script>
