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
              @keydown.enter="create"
            ></v-text-field>
          </v-card-text>

          <v-list v-if="technicians.length > 0">
            <template v-for="(item, i) in technicians">
              <v-hover :key="i">
                <v-list-tile avatar :key="i" @click slot-scope="{ hover }">
                  <v-list-tile-avatar size="40">
                    <v-avatar :color="item.color" size="40">
                      <span class="white--text subheading">{{item.initials}}</span>
                    </v-avatar>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{item.name}}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon v-if="hover" @click="remove(item)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-hover>
            </template>
          </v-list>

          <v-card-text v-else>
            <div class="body-1 font-italic">Aun no tienes técnicos para mostrar, agrega uno nuevo.</div>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" width="300" @keydown.esc="dialog = !dialog">
      <v-card>
        <v-card-title>
          <h5 class="headline">Seguro que quieres eliminar a este técnico?</h5>
        </v-card-title>
        <v-card-text class="body-1">
          <strong>{{technician}}</strong> tiene asociado(s)
          <strong>{{count}}</strong> equipo(s), si lo eliminas ya no podras filtrar por este nombre en la tabla de clientes.
          <br>
          <br>
          <div
            class="caption font-italic"
          >Nota: Puedes agregarlo nuevamente si necesitas saber a que técnico pertenece un equipo.</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn flat @click="dialog = !dialog">cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat @click="confirmDeletion">eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    name: "",
    technicians: [],
    dialog: false,
    item: null,
    technician: null,
    count: null
  }),
  computed: {
    ...mapGetters("technicians", ["getTechnicians"])
  },
  methods: {
    ...mapActions("technicians", [
      "TECHNICIAN_EXIST",
      "ADD_NEW_TECHNICIAN",
      "DELETE_TECHNICIAN"
    ]),
    ...mapMutations("technicians", ["REMOVE_TECHNICIAN"]),
    ...mapMutations("clients", ["ENABLE_SNACKBAR"]),
    async create() {
      this.name = this.name.trim();
      if (this.name) {
        let longInitials = "";
        let name = this.name.replace(/\b\w/g, l => {
          longInitials += l.toUpperCase();
          return l.toUpperCase();
        });
        try {
          let technician = {
            _id: this.$dayjs().format(),
            name,
            initials: longInitials.substring(0, 2),
            color: this.$randomColor({ luminosity: "dark" })
          };
          let response = await this.ADD_NEW_TECHNICIAN(technician);
          if (response.created) {
            this.technicians.push(response.doc);
            this.name = "";
            this.ENABLE_SNACKBAR("Técnico creado exitosamente");
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    async remove(item) {
      this.item = item;
      try {
        let result = await this.TECHNICIAN_EXIST(this.item.name);
        if (result.found) {
          this.technician = result.name;
          this.count = result.count;
          this.dialog = true;
          return;
        }
        await this.confirmDeletion();
      } catch (error) {
        console.log(error);
      }
    },
    async confirmDeletion() {
      try {
        let response = await this.DELETE_TECHNICIAN(this.item);
        this.REMOVE_TECHNICIAN(this.item);
        this.dialog = false;
        this.ENABLE_SNACKBAR("Técnico eliminado exitosamente");
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.technicians = this.getTechnicians;
  }
};
</script>
