<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/abas">Abas</router-link> |
    <a href="javascript:void(0)" @click="contador">Contador</a>
  </div>
  <router-view />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "./store";
import { TipoAbaEnum } from "./store/modules/abas-principal/aba-model";
import { AbasPrincipalModule } from "./store/modules/abas-principal/abas-principal-module";
//import { ContadorModule } from "./store/modules/contador/contador-module";

@Options({})
export default class App extends Vue {
  contador(): void {
    AbasPrincipalModule.adicionarAba({
      nome: "Contador",
      nameRoute: "Contador",
      tipo: TipoAbaEnum.Vue,
      resetStore: () => store.commit("ContadorStoreModule/reset"),
    });
  }
  created(): void {
    AbasPrincipalModule.adicionarAba({
      nome: "aba 1",
      nameRoute: "Teste1",
      tipo: TipoAbaEnum.Vue,
      resetStore: () => console.log(),
    });
    
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
