<template>
  <draggable
    :list="listaAbas"
    item-key="id"
    class="aba-container"
    tag="transition-group"
    :component-data="{ name: 'list', type: 'transition', tag: 'div' }"
    name="list"
  >
    <template #item="{ element }">
      <item-aba :itemAba="element" />
    </template>
  </draggable>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import draggable from "vuedraggable";
import { AbasPrincipalModule } from "@/store/modules/abas-principal/abas-principal-module";
import { IAbaPrincipalModel } from "@/store/modules/abas-principal/aba-model";
import ItemAba from "@/components/abas/itens/ItemAba.vue";
@Options({
  name: "itens-aba",
  components: {
    draggable,
    ItemAba,
  },
})
export default class ItensAba extends Vue {
  get listaAbas(): IAbaPrincipalModel[] {
    return AbasPrincipalModule.abas;
  }
  set listaAbas(valor: IAbaPrincipalModel[]) {
    AbasPrincipalModule.adicionarAbas(valor);
  }
}
</script>
<style scoped>
.aba-container {
  display: flex;
  max-width: calc(100% - 2rem);
  overflow: hidden;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-in-out;
  z-index: -1;
}
.list-enter,
.list-enter-from,
.list-leave-to,
.list-leave-active {
  transform: translateX(-100%);
}
</style>
