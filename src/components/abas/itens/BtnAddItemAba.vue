<template>
  <div class="aba-container-add" @click="adiconar">
    <div class="aba-btn-add">+</div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { AbasPrincipalModule } from "@/store/modules/abas-principal/abas-principal-module";
import { TipoAbaEnum } from "@/store/modules/abas-principal/aba-model";
import ItensAba from "@/components/abas/itens/ItensAba.vue";
@Options({
  name: "btn-add-item-aba",
  components: {
    ItensAba,
  },
})
export default class BtnAddItemAba extends Vue {
  adiconar(): void {
    const idAtual = AbasPrincipalModule.idAbaSequencial + 1;
    AbasPrincipalModule.adicionarAba({
      nome: "aba " + idAtual,
      url: `iframes/iframe-teste.html?id=${idAtual}`,
      tipo: TipoAbaEnum.Iframe,
    });
  }
}
</script>
<style scoped>
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
</style>
