<template>
  <div :class="theme" class="principal">
    <h1>Calculadora de IMC</h1>
    <h2>Ingresa tu peso</h2>

    <input type="number" v-model="numero" placeholder="Peso en kg" />

    <div class="number-grid">
      <div
        class="number"
        v-for="n in numbers"
        :key="n"
        @click="updateInput(n)"
      >
        {{ n }}
      </div>
      <button @click="deleteLastDigit" class="action-button">
        <v-icon name="ri-delete-back-2-line" scale="2" /> 
      </button>
      <button @click="evaluarPeso" class="action-button">
        <v-icon name="md-send-twotone" scale="2" animation="pulse"/> 
      </button>
    </div>

    <!-- Botón flotante para cambiar de tema -->
    <button @click="toggleTheme" class="theme-toggle-button">
      <v-icon :name="themeIcon" scale="2" animation="pulse"/>
    </button>

    <!-- Modal para mostrar la imagen según el peso -->
    <modal
      :isVisible="showModal"
      :peso="numero"
      @update:isVisible="showModal = $event"
    />
  </div>
</template>

<script>
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { RiDeleteBack2Line, MdSendTwotone, GiSunPriest, GiEvilMoon } from "oh-vue-icons/icons";
import modal from "./components/modal.vue";

addIcons(RiDeleteBack2Line, MdSendTwotone, GiSunPriest, GiEvilMoon);

export default {
  components: {
    "v-icon": OhVueIcon,
    modal,
  },
  data() {
    return {
      theme: "dark-theme",
      numero: "",
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      showModal: false,
      themeIcon: "gi-sun-priest", // Ícono de sol para tema oscuro
     
      
    };
  },
  methods: {
    updateInput(value) {
      this.numero += value; // Agregar el valor al campo de texto
    },
    deleteLastDigit() {
      this.numero = this.numero.slice(0, -1); // Eliminar el último dígito
    },
    // saveInput() {
    //   if (this.numero === "") {
    //     alert("No has ingresado un valor.");
    //   } else {
    //     alert(`Valor guardado: ${this.numero}`);
    //   }
    // },
    toggleTheme() {
      // Cambiar el tema y el ícono de acuerdo al estado actual
      if (this.theme === "dark-theme") {
        this.theme = "light-theme";
        this.themeIcon = "gi-evil-moon"; // Cambiar ícono a luna cuando el tema es claro
      } else {
        this.theme = "dark-theme";
        this.themeIcon = "gi-sun-priest"; // Cambiar ícono a sol cuando el tema es oscuro
      }
    },
    evaluarPeso() {
      if (this.numero) {
        this.showModal = true;
      } else {
        alert("Por favor ingresa un peso válido.");
      }
    },
  },
};

</script>

<style scoped src="./assets/main.css"></style>
