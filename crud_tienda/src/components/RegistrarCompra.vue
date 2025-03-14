<script setup>
  import { ref } from "vue";
  import UsuarioList from "./UsuarioList.vue";
  import PrendaList from "./PrendaList.vue";
  import CompraList from "./CompraList.vue";
  
      const usuarioSeleccionado = ref(null);
      const prendaSeleccionada = ref(null);
      const actualizarUsuario = (id) => {
        usuarioSeleccionado.value = id;
      };
      const actualizarPrenda = (id) => {
        prendaSeleccionada.value = id;
      };      
</script>
  
<template>
    <div class="container">
      <h1>Registrar Compra</h1>  
      <UsuarioList @usuario-seleccionado="actualizarUsuario" />
      <PrendaList @prenda-seleccionada="actualizarPrenda" />
      <CompraList :usuarioSeleccionado="usuarioSeleccionado" :prendaSeleccionada="prendaSeleccionada" />
    </div>
</template>
  
  