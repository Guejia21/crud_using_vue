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
    <div class="container-fluid">
      <div class="header row align-items-center">
        <img class = "col-1" src="https://cdn-icons-png.freepik.com/512/10800/10800836.png" alt="Logo">
        <h1 class="col-11">Registrar Compra</h1>  
      </div>      
      <UsuarioList @usuario-seleccionado="actualizarUsuario" />
      <PrendaList @prenda-seleccionada="actualizarPrenda" />
      <CompraList :usuarioSeleccionado="usuarioSeleccionado" :prendaSeleccionada="prendaSeleccionada" />
    </div>
</template>
<style>
  .header{
    background-color: rgb(57, 143, 219);
    padding: 20px;
    color: white;
    margin-top: 10px;
    border-radius: 5px;
    margin: 5px;
  }
</style>
  
  