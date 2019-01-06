<template>
  <v-container>
    <v-layout>
      <v-flex justify-center layout>
        <v-card width="600">
          <v-list dense>
            <v-list-tile>
              <v-list-tile-avatar>
                <v-icon>mdi-power-sleep</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="subheading">Modo oscuro</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-switch v-model="mode" hide-details></v-switch>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  methods: {
    ...mapMutations("clients", ["ENABLE_DARK"])
  },
  computed: {
    ...mapGetters("clients", ["dark"]),
    mode: {
      get: function() {
        return this.dark;
      },
      set: function(val) {
        this.ENABLE_DARK(val);
      }
    }
  }
};
</script>
