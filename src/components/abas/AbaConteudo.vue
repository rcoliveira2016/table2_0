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
  </template>
  <router-view v-if="mostraRouterView" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { AbasPrincipalModule } from "@/store/modules/abas-principal/abas-principal-module";
import {
  IAbaPrincipalModel,
  IAbaPrincipalVueModel,
  TipoAbaEnum,
} from "@/store/modules/abas-principal/aba-model";
import { defineAsyncComponent, h, VNodeTypes } from "vue";
@Options({
  name: "aba-conteudo",
})
export default class AbaConteudo extends Vue {
  get mostraRouterView(): boolean {
    return AbasPrincipalModule.abaSelecionadaAtualHeVue;
  }
  get listaAbas(): IAbaPrincipalModel[] {
    return AbasPrincipalModule.abas.filter((x) => x.tipo == TipoAbaEnum.Iframe);
  }
  componentVue(aba: IAbaPrincipalVueModel): VNodeTypes {
    return h(
      defineAsyncComponent(
        () => import(/* webpackPrefetch: true */ "@/".concat(aba.nameRoute))
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
