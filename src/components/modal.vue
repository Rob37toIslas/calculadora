<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <img :src="imageSrc" :class="imageClass" alt="Peso Result" class="modal-image" />
        <button @click="closeModal" class="close-button">X</button>
      </div>
    </div>
  </template>
  
  <script>
  import bajoPesoImg from '@/assets/images.jpeg';
  import normalPesoImg from '@/assets/chido.jpg';
  import sobrepesoImg from '@/assets/12482.png';
  import obesidadImg from '@/assets/12482.png';
  import soundFile from '@/assets/oyegelda.MP3'; // Importar el archivo de sonido
  
  export default {
    data() {
      return {
        img: '',
        sound: null, // Propiedad para almacenar la instancia de Audio
      };
    },
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      peso: {
        type: Number,
        required: true,  // Asegúrate de que 'peso' esté marcado como requerido
      },
    },
    computed: {
      imageSrc() {
        console.log('Peso:', this.peso);  // Verifica que el valor de 'peso' es correcto
        if (this.peso <= 50) {
          this.img = bajoPesoImg;
        } else if (this.peso >= 60 && this.peso <= 75) {
          this.img = normalPesoImg;
        } else if (this.peso > 75 && this.peso <= 90) {
          this.img = sobrepesoImg;
          this.playSound();
        }
        return this.img; // Devuelve la imagen correspondiente
      },
      imageClass() {
        if (this.peso > 75) {
          return 'rotate-image'; // Clase para aplicar la animación de giro
        }
        return '';
      }
    },
    methods: {
      playSound() {
        if (!this.sound) {
          // Solo crear una nueva instancia si no existe
          this.sound = new Audio(soundFile); // Crear una nueva instancia de Audio
          this.sound.load(); // Cargar el sonido
          this.sound.oncanplaythrough = () => {
            this.sound.play(); // Reproducir sonido solo cuando el archivo esté listo para reproducirse
          };
          this.sound.onerror = (error) => {
            console.error('Error al cargar el sonido:', error); // Manejo de errores
          };
        } else {
          this.sound.play(); // Si el audio ya está cargado, solo reproducirlo
        }
      },
      closeModal() {
        if (this.sound) {
          this.sound.pause(); // Detener el sonido
          this.sound.currentTime = 0; // Reiniciar el sonido para que empiece desde el inicio la próxima vez
          this.sound = null; // Eliminar la instancia del sonido cuando se cierre el modal
        }
        this.$emit('update:isVisible', false); // Emitir el evento para cerrar el modal
      },
    },
    mounted() {
      // Si ya tienes un sonido cargado, no lo cargas otra vez
      if (this.sound) {
        this.sound.load(); // Cargar el sonido al montar el componente
      }
    },
  };
  </script>
  
  <style scoped>
  /* Estilos del modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    position: relative;
  }
  
  .modal-image {
    max-width: 60%;
    height: auto;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  
  /* Animación de giro */
  .rotate-image {
    animation: spin 2s linear infinite; /* Aplicar la animación de giro */
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg); /* Comienza desde 0 grados */
    }
    100% {
      transform: rotate(360deg); /* Termina en 360 grados */
    }
  }
  </style>
  