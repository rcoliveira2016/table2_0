<template>
  <template v-for="(item, index) in listaAbas" :key="index">
    <iframe
      v-if="heTipoIframe(item)"
      v-show="estaSelecionado(item.id)"
      :src="item.url"
      :name="item.id"
      :title="item.nome"
      frameborder="0"
    />
    <component
      v-else
      :is="componentVue(item)"
      v-show="estaSelecionado(item.id)"
    />
  </template>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { AbasPrincipalModule } from "@/store/modules/abas-principal/abas-principal-module";
import {
  IAbaPrincipalModel,
  TipoAbaEnum,
} from "@/store/modules/abas-principal/aba-model";
import { defineAsyncComponent, h, VNodeTypes } from "vue";
@Options({
  name: "aba-conteudo",
})
export default class AbaConteudo extends Vue {
  get listaAbas(): IAbaPrincipalModel[] {
    return AbasPrincipalModule.abas;
  }
  set listaAbas(valor: IAbaPrincipalModel[]) {
    AbasPrincipalModule.adicionarAbas(valor);
  }
  componentVue(aba: IAbaPrincipalModel): VNodeTypes {
    return h(
      defineAsyncComponent(
        () => import(/* webpackPrefetch: true */ "@/".concat(aba.url))
      )
    );
  }
  heTipoIframe(aba: IAbaPrincipalModel): boolean {
    return aba.tipo == TipoAbaEnum.Iframe;
  }
  estaSelecionado(id: number): boolean {
    return AbasPrincipalModule.idAbaAtual == id;
  }
}
</script>
<style scoped>
.aba-conteudo iframe {
  width: 100%;
}
</style>
