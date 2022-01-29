<template>
  <div class="aba">
    <div class="aba-itens">
      <itens-aba />
      <btn-add-item-aba />
    </div>
    <div class="aba-conteudo">
      <aba-conteudo />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

import ItensAba from "@/components/abas/itens/ItensAba.vue";
import BtnAddItemAba from "@/components/abas/itens/BtnAddItemAba.vue";
import AbaConteudo from "@/components/abas/AbaConteudo.vue";
import { AbasPrincipalModule } from "@/store/modules/abas-principal/abas-principal-module";
import { TipoAbaEnum } from "@/store/modules/abas-principal/aba-model";
@Options({
  name: "aba-rotas",
  components: {
    ItensAba,
    BtnAddItemAba,
    AbaConteudo,
  },
})
export default class AbaRotas extends Vue {
  trocarAba(): void {
    const abaSelcionado = AbasPrincipalModule.abaSelecionadaAtual;

    if (abaSelcionado?.tipo == TipoAbaEnum.Vue)
      this.$router.push({ name: abaSelcionado.nameRoute });
    else this.$router.push({ name: "Abas" });
  }
  mounted(): void {
    this.$watch(() => AbasPrincipalModule.idAbaAtual, this.trocarAba);
    this.trocarAba();
  }
}
</script>
<style scoped>
.aba {
  width: 100%;
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
</style>
