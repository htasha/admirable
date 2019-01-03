<template>
  <v-container>
    <v-layout>
      <v-flex justify-center layout>
        <v-card width="600">
          <v-card-title>
            <div class="subheading">Agregar nuevo técnico</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pb-0">
            <v-text-field
              label="Nombre del técnico"
              placeholder="p.ej. The Rock"
              v-model="name"
              @change="change"
            ></v-text-field>
          </v-card-text>
          <v-list>
            <template v-for="(item, i) in technicians">
              <v-list-tile avatar ripple :key="i">
                <v-list-tile-avatar size="40">
                  <v-avatar :color="item.color" size="40">
                    <span
                      class="white--text headline text-uppercase"
                    >{{item.name | firstLetterOfName}}</span>
                  </v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{item.name}}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-checkbox multiple v-model="selected" :value="item.name"></v-checkbox>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat :disabled="!selected.length > 0" @click="remove">eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: "",
    technicians: [
      {
        name: "Miguel",
        color: "green"
      },
      {
        name: "Johan",
        color: "green"
      },
      {
        name: "Marcano",
        color: "green"
      }
    ],
    selected: []
  }),
  methods: {
    change(name) {
      if (name.trim()) this.technicians.push({ color: "pink", name });
      this.name = "";
    },
    remove() {
      this.selected.forEach(item => console.log(item));
    }
  },
  filters: {
    firstLetterOfName: name => name.charAt(0)
  }
};
</script>
