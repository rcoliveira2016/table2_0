<template>
  <div class="about">
    <div class="aba">
      <div class="aba-itens">
        <draggable
          :list="listaAbas"
          item-key="id"
          class="aba-container"
          tag="transition-group"
          :component-data="{ name: 'list', type: 'transition', tag: 'div' }"
          name="list"
        >
          <template #item="{ element }">
            <div
              class="elemento"
              :class="selecionadoElemento(element.id)"
              @click.capture="selecionarAba(element.id)"
              @click.middle="remover(element.id)"
            >
              <span>{{ element.nome }}</span>
              <a><span @click="remover(element.id)">X</span></a>
            </div>
          </template>
        </draggable>
        <div class="aba-container-add" @click="adiconar">
          <div class="aba-btn-add">+</div>
        </div>
      </div>
      <div class="aba-conteudo">
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
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import draggable from "vuedraggable";
import { AbasPrincipalModule } from "@/store/modules/abas-principal/abas-principal-module";
import {
  IAbaPrincipalModel,
  TipoAbaEnum,
} from "@/store/modules/abas-principal/aba-model";
import { defineAsyncComponent, h, VNodeTypes } from "vue";

@Options({
  name: "abas",
  components: {
    draggable,
  },
})
export default class Abas extends Vue {
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
  selecionadoElemento(id: number): Record<string, boolean> {
    return { selecionado: this.estaSelecionado(id) };
  }
  selecionarAba(id: number): void {
    AbasPrincipalModule.setarAba(id);
  }
  adiconar(): void {
    const idAtual = AbasPrincipalModule.idAbaSequencial + 1;
    AbasPrincipalModule.adicionarAba({
      nome: "aba " + idAtual,
      url: `iframes/iframe-teste.html?id=${idAtual}`,
      tipo: TipoAbaEnum.Iframe,
    });
  }
  remover(id: number): void {
    AbasPrincipalModule.removerAba(id);
  }
}
</script>
<style scoped>
.aba {
  width: 100%;
}
.aba-container-add {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
}
.aba-btn-add {
  border-radius: 50%;
  height: 1.5rem;
  width: 1.5rem;
  line-height: 1.5rem;
  cursor: pointer;
  transition: background 200ms ease-in;
}
.aba-btn-add:hover {
  background: #f1f1f1;
}
div.elemento {
  background: #f1f1f1;
  border-bottom: none;
  padding: 0.5rem 0.8rem;
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  cursor: pointer;
  margin-right: 0.1rem;
}
div.elemento a {
  color: #000;
  text-decoration: none;
  font-size: 0.7em;
  font-weight: 900;
  margin-left: 1.25em;
  z-index: 999;
}
div.elemento a,
div.elemento > span {
  vertical-align: middle;
}
div.elemento.selecionado {
  background: #cccccc;
}
.aba-container {
  display: flex;
  max-width: calc(100% - 2rem);
  overflow: hidden;
}
.aba-itens {
  display: flex;
  max-width: 100%;
  overflow: hidden;
}
.aba-conteudo iframe {
  width: 100%;
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
