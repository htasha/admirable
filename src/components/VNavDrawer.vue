<template>
  <v-navigation-drawer :mini-variant="mini" app clipped permanent>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    items: [
      { title: "Clientes", icon: "mdi-home-outline", to: "/clients" },
      { title: "Mi empresa", icon: "mdi-domain", to: "/company" },
      {
        title: "Configuraciones",
        icon: "mdi-settings-outline",
        to: "/settings"
      }
    ]
  }),
  computed: {
    ...mapState("clients", ["mini"])
  },
  mounted() {
    this.$router.push("/clients");
  }
};
</script>
