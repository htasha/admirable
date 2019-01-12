<template>
  <v-app :dark="dark">
    <v-navigation-drawer :mini-variant="mini" app clipped permanent>
      <v-list>
        <v-list-tile v-for="item in listItems" :key="item.title" :to="item.to">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark clipped-left :color="color">
      <v-toolbar-side-icon @click="IS_MINI"></v-toolbar-side-icon>
      <v-toolbar-title>Admirable</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        flat
        solo-inverted
        hide-details
        append-icon="mdi-magnify"
        placeholder="Busqueda"
        color="blue"
        @input="UPDATE_SEARCH($event)"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-snackbar v-model="snackbar" :timeout="3000" bottom>{{snackbarMessage}}</v-snackbar>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      listItems: [
        { title: "Clientes", icon: "mdi-home-outline", to: "/" },
        { title: "Mi empresa", icon: "mdi-domain", to: "/company" },
        {
          title: "Configuraciones",
          icon: "mdi-settings-outline",
          to: "/settings"
        }
      ]
    };
  },
  methods: {
    ...mapMutations("clients", ["UPDATE_SEARCH", "IS_MINI"])
  },
  computed: {
    ...mapState("clients", ["mini"]),
    ...mapGetters("clients", ["dark", "snackbar", "snackbarMessage"]),
    color() {
      return this.dark ? "" : "primary";
    }
  },
  mounted() {
    this.$router.push("/");
  }
};
</script>
