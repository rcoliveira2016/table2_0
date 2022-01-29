import { Options, Vue } from "vue-class-component";

@Options({
  name: "contador",
})
export class PaginaAba extends Vue {
  unmounted(): void {
    //console.log(this.$options.name);
  }
}
