<template>
  <v-app :dark="dark">
    <v-nav-drawer/>
    <v-toolbar-search/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import VToolbarSearch from "@/components/VToolbarSearch.vue";
import VNavDrawer from "@/components/VNavDrawer.vue";

export default {
  components: {
    VToolbarSearch,
    VNavDrawer
  },
  methods: {
    ...mapActions("technicians", ["GET_ALL_TECHNICIANS"]),
    ...mapMutations("technicians", ["LOAD_TECHNICIANS_STATE"])
  },
  computed: {
    ...mapGetters("clients", ["dark"])
  },
  async created() {
    try {
      let technicians = await this.GET_ALL_TECHNICIANS();
      if (technicians) {
        this.LOAD_TECHNICIANS_STATE(technicians);
      }
      this.$router.push("/clients");
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
