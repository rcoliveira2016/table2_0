<template>
  <div
    class="elemento"
    :class="selecionadoElemento()"
    @click.capture="selecionarAba()"
    @click.middle="remover()"
  >
    <span>{{ itemAba.nome }}</span>
    <a><span @click="remover()">X</span></a>
  </div>
</template>

<script lang="ts">
import { IAbaPrincipalModel } from "@/store/modules/abas-principal/aba-model";
import { AbasPrincipalModule } from "@/store/modules/abas-principal/abas-principal-module";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "item-aba",
  props: {
    itemAba: Object,
  },
})
export default class ItemAba extends Vue {
  private itemAba!: IAbaPrincipalModel;
  remover(): void {
    AbasPrincipalModule.removerAba(this.itemAba.id);
  }
  estaSelecionado(): boolean {
    return AbasPrincipalModule.idAbaAtual == this.itemAba.id;
  }
  selecionadoElemento(): Record<string, boolean> {
    return { selecionado: this.estaSelecionado() };
  }

  selecionarAba(): void {
    AbasPrincipalModule.setarAba(this.itemAba.id);
  }
}
</script>
<style scoped>
div.elemento {
  background: #f1f1f1;
  border-bottom: none;
  padding: 0.5rem 0.8rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  cursor: pointer;
  margin-right: 0.1rem;
  min-width: 5em;
  text-align: start;
  position: relative;
}
div.elemento a {
  color: #000;
  text-decoration: none;
  font-size: 0.7em;
  font-weight: 900;
  margin-left: 1.25em;
  position: absolute;
  display: block;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 0.5rem;
  padding: 0 0.15rem;
  transition: 200ms ease-in;
}
div.elemento a:hover {
  background: rgba(0, 0, 0, 0.1);
}
div.elemento a,
div.elemento a > span {
  vertical-align: middle;
}
div.elemento.selecionado {
  background: #cccccc;
}
</style>
