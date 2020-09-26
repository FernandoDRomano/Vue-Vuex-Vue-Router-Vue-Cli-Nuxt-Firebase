<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn class="mr-4" color="info" dark @click="modalAgregar = true">
            Agregar
          </v-btn>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Hoy
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon>fas fa-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon>fas fa-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Día</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mes</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 días</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="eventos"
          :event-color="getEventColor"
          :type="type"
          :short-months="false"
          :short-weekdays="false"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>

        <!-- MODAL AL HACER CLICK EN LOS EVENTOS -->
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <!-- BOTON ELIMINAR -->
              <v-btn icon @click="eliminarEvento(selectedEvent)">
                <v-icon>fas fa-trash</v-icon>
              </v-btn>

              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text v-if="!editarEvento">
              <span v-html="selectedEvent.details"></span>
            </v-card-text>

            <form @submit.prevent="actualizarEvento" v-if="editarEvento">
              <v-card-text>
                <v-text-field
                  v-model.trim="$v.selectedEvent.name.$model"
                  :error-messages="nameEditandoErrores"
                  :counter="$v.selectedEvent.name.$params.maxLength.max"
                  @input="$v.selectedEvent.name.$touch()"
                  @blur="$v.selectedEvent.name.$touch()"
                  type="text"
                  label="Nombre del evento"
                ></v-text-field>
                <v-textarea
                  v-model.trim="$v.selectedEvent.details.$model"
                  :error-messages="detailsEditandoErrores"
                  @input="$v.selectedEvent.details.$touch()"
                  @blur="$v.selectedEvent.details.$touch()"
                  label="Detalles del evento"
                  rows="1"
                  row-height="15"
                  auto-grow
                ></v-textarea>
              </v-card-text>

              <v-card-actions>
                <v-btn type="submit" dark color="warning"> Actualizar </v-btn>

                <v-btn text color="secondary" @click="reiniciarModal">
                  Cancel
                </v-btn>
              </v-card-actions>
            </form>

            <v-card-actions v-if="!editarEvento">
              <v-btn @click="editarEvento = true" dark color="warning">
                Editar
              </v-btn>

              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>

      <!-- VENTANA MODAL PARA AGREGAR -->
      <v-dialog v-model="modalAgregar" persistent max-width="600px">
        <form @submit.prevent="agregarEvento">
          <v-card>
            <v-card-title>
              <span class="headline text-center">Nuevo Evento</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model.trim="$v.name.$model"
                      :error-messages="nameErrores"
                      :counter="$v.name.$params.maxLength.max"
                      @input="$v.name.$touch()"
                      @blur="$v.name.$touch()"
                      type="text"
                      label="Nombre del evento"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model.trim="$v.details.$model"
                      :error-messages="detailsErrores"
                      @input="$v.details.$touch()"
                      @blur="$v.details.$touch()"
                      label="Detalles del evento"
                      rows="1"
                      row-height="15"
                      auto-grow
                    ></v-textarea>
                  </v-col>

                  <v-col cols="6">
                    <v-dialog
                      ref="dialog"
                      v-model="modalStart"
                      :return-value.sync="start"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="start"
                          :error-messages="startErrores"
                          label="Fecha de inicio"
                          prepend-icon="fas fa-calendar-alt"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="start" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modalStart = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog.save(start)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-dialog>
                  </v-col>

                  <v-col cols="6">
                    <v-dialog
                      ref="dialog2"
                      v-model="modalEnd"
                      :return-value.sync="end"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="end"
                          :error-messages="endErrores"
                          label="Fecha de fin"
                          prepend-icon="fas fa-calendar-alt"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :disabled="start === '' || start === null"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="end" scrollable :min="start">
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modalEnd = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog2.save(end)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-dialog>
                  </v-col>

                  <v-col cols="12">
                    <p class="text-body-1">Seleccionar el color</p>
                    <v-color-picker
                      v-model="color"
                      elevation="15"
                      show-swatches
                    ></v-color-picker>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="limpiarCamposModalAgregar"
                >Cerrar</v-btn
              >
              <v-btn color="blue darken-1" type="submit" text>Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-dialog>

      <!-- VENTANA MODAL QUE MUESTRA EL LOADING DE CARGA DE DATOS-->
      <v-dialog v-model="cargandoDatos" hide-overlay persistent width="300">
        <v-card color="info" dark>
          <v-card-text>
            <p class="text-center white--text font-weight-bold pt-4">
              Cargando...
            </p>
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Mes",
      week: "Semana",
      day: "Día",
      "4day": "4 Días",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    color: "#4dd0e1",
    name: null,
    details: null,
    start: null,
    end: null,
    modalAgregar: false,
    modalStart: false,
    modalEnd: false,
    editarEvento: false,
  }),
  validations: {
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(20),
      caracteresPermitidos(descripcion) {
        const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9!@#$%^&*)(:+=.,_-\s]+$/g;
        return regex.test(descripcion);
      },
    },
    details: {
      required,
      minLength: minLength(3),
      caracteresPermitidos(descripcion) {
        const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9!@#$%^&*)(:+=.,_-\s]+$/g;
        return regex.test(descripcion);
      },
    },
    start: {
      required,
    },
    end: {
      required,
    },

    selectedEvent: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        caracteresPermitidos(descripcion) {
          const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9!@#$%^&*)(:+=.,_-\s]+$/g;
          return regex.test(descripcion);
        },
      },
      details: {
        required,
        minLength: minLength(3),
        caracteresPermitidos(descripcion) {
          const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9!@#$%^&*)(:+=.,_-\s]+$/g;
          return regex.test(descripcion);
        },
      },
    },
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  created() {
    this.getEventos();
  },
  computed: {
    ...mapState(["eventos", "cargandoDatos"]),

    nameErrores() {
      const errors = [];

      if (!this.$v.name.required && this.$v.name.$dirty) {
        errors.push("Este campo es requerido");
      }

      if (!this.$v.name.minLength || !this.$v.name.maxLength) {
        const msj = `El campo debe tener entre ${this.$v.name.$params.minLength.min} y 
                        ${this.$v.name.$params.maxLength.max} caracteres`;
        errors.push(msj);
      }

      if (!this.$v.name.caracteresPermitidos && this.$v.name.$dirty) {
        const msj =
          "Solo se permiten números [0-9], letras [a-z] y los siguientes caracteres especiales !@#$%^&*():+=.,_-";
        errors.push(msj);
      }

      return errors;
    },

    detailsErrores() {
      const errors = [];

      if (!this.$v.details.required && this.$v.details.$dirty) {
        errors.push("Este campo es requerido");
      }

      if (!this.$v.details.minLength) {
        const msj = `El campo debe tener más de ${this.$v.details.$params.minLength.min} caracteres`;
        errors.push(msj);
      }

      if (!this.$v.details.caracteresPermitidos && this.$v.details.$dirty) {
        const msj =
          "Solo se permiten números [0-9], letras [a-z] y los siguientes caracteres especiales !@#$%^&*():+=.,_-";
        errors.push(msj);
      }

      return errors;
    },

    startErrores() {
      const errors = [];

      if (!this.$v.start.required && this.$v.start.$dirty) {
        errors.push("Este campo es requerido");
      }

      return errors;
    },

    endErrores() {
      const errors = [];

      if (!this.$v.end.required && this.$v.end.$dirty) {
        errors.push("Este campo es requerido");
      }

      return errors;
    },

    nameEditandoErrores() {
      const errors = [];

      if (
        !this.$v.selectedEvent.name.required &&
        this.$v.selectedEvent.name.$dirty
      ) {
        errors.push("Este campo es requerido");
      }

      if (
        !this.$v.selectedEvent.name.minLength ||
        !this.$v.selectedEvent.name.maxLength
      ) {
        const msj = `El campo debe tener entre ${this.$v.selectedEvent.name.$params.minLength.min} y 
                        ${this.$v.selectedEvent.name.$params.maxLength.max} caracteres`;
        errors.push(msj);
      }

      if (
        !this.$v.selectedEvent.name.caracteresPermitidos &&
        this.$v.selectedEvent.name.$dirty
      ) {
        const msj =
          "Solo se permiten números [0-9], letras [a-z] y los siguientes caracteres especiales !@#$%^&*():+=.,_-";
        errors.push(msj);
      }

      return errors;
    },

    detailsEditandoErrores() {
      const errors = [];

      if (
        !this.$v.selectedEvent.details.required &&
        this.$v.selectedEvent.details.$dirty
      ) {
        errors.push("Este campo es requerido");
      }

      if (!this.$v.selectedEvent.details.minLength) {
        const msj = `El campo debe tener más de ${this.$v.selectedEvent.details.$params.minLength.min} caracteres`;
        errors.push(msj);
      }

      if (
        !this.$v.selectedEvent.details.caracteresPermitidos &&
        this.$v.selectedEvent.details.$dirty
      ) {
        const msj =
          "Solo se permiten números [0-9], letras [a-z] y los siguientes caracteres especiales !@#$%^&*():+=.,_-";
        errors.push(msj);
      }

      return errors;
    },
  },
  methods: {
    ...mapActions(["getEventos", "addEvento", "deleteEvento", "updateEvento"]),

    limpiarCamposModalAgregar() {
      this.$v.$reset();
      this.name = this.details = this.start = this.end = null;
      this.color = "#4dd0e1";
      this.modalAgregar = false;
    },

    agregarEvento() {
      /* PARA QUE VALIDE TODOS LOS CAMPOS */
      this.$v.$touch();
      /* SI NO EXISTEN ERRORES */
      if (!this.$v.$invalid) {
        /* AGREGO LA TAREA Y EVITO QUE PULSEN MAS DE UNA VEZ EL BOTÓN DE ENVIAR */
        const evento = {
          name: this.name,
          details: this.details,
          color: this.color,
          start: this.start,
          end: this.end,
        };

        this.addEvento(evento);

        this.limpiarCamposModalAgregar();
      } else {
        //NO PASA LAS VALIDACIONES
        console.log("Existe errores no se puede enviar");
      }
    },

    eliminarEvento(evento) {
      this.deleteEvento(evento.id);
      //PARA CERRAR LA VENTANA MODAL QUE SE ABRE CON EL EVENTO
      this.selectedOpen = false;
    },

    actualizarEvento() {
      /* PARA QUE VALIDE TODOS LOS CAMPOS */
      this.$v.$touch();
      /* SI NO EXISTEN ERRORES */
      if (!this.$v.selectedEvent.$invalid) {
        /* AGREGO LA TAREA Y EVITO QUE PULSEN MAS DE UNA VEZ EL BOTÓN DE ENVIAR */
        const evento = {
          id: this.selectedEvent.id,
          name: this.selectedEvent.name,
          details: this.selectedEvent.details,
        };

        this.updateEvento(evento);

        this.reiniciarModal();
      } else {
        //NO PASA LAS VALIDACIONES
        console.log("Existe errores no se puede enviar");
      }
    },

    reiniciarModal() {
      this.$v.$reset();
      this.selectedOpen = false;
      this.editarEvento = false;
    },

    /* METODOS POR DEFECTO */
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange() {},
  },
};
</script>