<script>
import api from '../api'
import { ref, onMounted, toRefs } from 'vue'

export default {    
    props: {
        usuarioSeleccionado: Number,
        prendaSeleccionada: Number
    },
    setup(props) {
        const compras = ref([]);
        const fecha = ref(new Date().toISOString().split('T')[0]);
        const compraEditando = ref(null);
        // Crear refs separados para edición
        const usuarioIdEdicion = ref(null);
        const prendaIdEdicion = ref(null);

        // Variables locales para usuario y prenda seleccionados
        //se usa props porque son variables que vienen de otro componente
        const { usuarioSeleccionado: usuarioId, prendaSeleccionada: prendaId } = toRefs(props);

        const cargarCompras = async () => {
            const response = await api.get('/compras');
            compras.value = response.data;
        };

        const agregarCompra = async () => {
            console.log("Antes de enviar:", {
                usuarioId: usuarioId.value,
                prendaId: prendaId.value,
                fecha: fecha.value
            });

            if (!usuarioId.value || !prendaId.value || !fecha.value) {
                alert("Debe seleccionar un usuario, una prenda y una fecha.");
                return;
            }
            const datosCompra = {
                usuarioId: Number(usuarioId.value),
                prendaId: Number(prendaId.value),
                fecha: String(fecha.value)
            };
            console.log(datosCompra);
            if (compraEditando.value) {
                // Actualizar compra existente
                await api.put(`/compras/${compraEditando.value.id}`, datosCompra);
                compraEditando.value = null;
            } else {
                // Agregar nueva compra
                let response = await api.post('/compras', datosCompra);
                //Si la respuesta es 500 entonces se muestra un mensaje de error
                if (response.status === 500) {
                    alert("Error al agregar compra");
                    console.log(response.data);
                }                
            }

            // Limpiar inputs
            fecha.value = "";
            usuarioId.value = null;
            prendaId.value = null;
            cargarCompras();
        };

        const eliminarCompra = async (id) => {
            await api.delete(`/compras/${id}`);
            cargarCompras();
        };              

        onMounted(cargarCompras);

        return {
            compras,
            fecha,
            usuarioId,
            prendaId,
            cargarCompras,
            usuarioIdEdicion,
            prendaIdEdicion,
            compraEditando,
            agregarCompra,
            eliminarCompra            
        };
    }
};
</script>

<template>
    <div class="container-fluid border p-3">
        <h2>Compras</h2>    
        <div class="row">
            <div class="form-group col-6 p-3 d-flex align-items-center flex-column">
                <div class="row w-50 mt-3">
                    <label>Usuario ID seleccionado: {{ compraEditando ? usuarioIdEdicion : usuarioId }}</label>
                </div>
                <div class="row w-50 mt-3">
                    <label>Prenda ID seleccionada: {{ compraEditando ? prendaIdEdicion : prendaId }}</label>
                </div>
                <div class="row w-50 mt-3">
                    <input  type="date" v-model="fecha" placeholder="Fecha de compra">
                </div>
                <div class="row w-50 mt-3">
                    <button @click="agregarCompra" class="btn btn-primary">
                        {{ compraEditando ? "Actualizar Compra" : "Agregar Compra" }}
                    </button>                    
                </div>
                <div class="row w-50 mt-3">
                    <button @click="cargarCompras" class="btn btn-secondary">Recargar Compras</button>
                </div>
            </div>
            <div class="col-6">
                <table class="table">
                    <thead class="table-light">
                        <tr>
                            <th>Usuario ID</th>
                            <th>Prenda ID</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="compra in compras" :key="compra.id">
                            <td>{{ compra.usuario }}</td>
                            <td>{{ compra.prenda }}</td>
                            <td>{{ compra.fecha }}</td>
                            <td>                                
                                <button @click="eliminarCompra(compra.id)" class="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
