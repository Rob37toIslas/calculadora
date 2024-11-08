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
  import soundFile from '@/assets/oyegelda.MP3'; 
  
  export default {
    data() {
      return {
        img: '',
        sound: null, 
      };
    },
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      peso: {
        type: Number,
        required: true, 
      },
    },
    computed: {
      imageSrc() {
        if (this.peso <= 50) {
          this.img = bajoPesoImg;
        } else if (this.peso >= 60 && this.peso <= 75) {
          this.img = normalPesoImg;
        } else if (this.peso > 75) {
          this.img = sobrepesoImg;
          this.playSound();
        }
        return this.img; 
      },
      imageClass() {
        if (this.peso > 75) {
          return 'rotate-image';
        
        }
        return '';
      }
    },
    methods: {
      playSound() {
        if (!this.sound) {

          this.sound = new Audio(soundFile);
          this.sound.load(); 
          this.sound.oncanplaythrough = () => {
            this.sound.play(); 
          };
          this.sound.onerror = (error) => {
            console.error('Error al cargar el sonido:', error); 
          };
        } else {
          this.sound.play();
        }
      },
      closeModal() {
        if (this.sound) {
          this.sound.pause(); 
          this.sound.currentTime = 0; 
          this.sound = null;
        }
        this.$emit('update:isVisible', false); 
      },
    },
    mounted() {
 
      if (this.sound){
        this.sound.load(); 
      }
    },
  };
  </script>
  
  <style scoped>

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
  

  .rotate-image {
    animation: spin 2s linear infinite; 
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg); 
    }
    100% {
      transform: rotate(360deg); 
    }
  }
  </style>
  