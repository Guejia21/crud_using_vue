<script>
//Se importa la api
import api from '../api'
//Se importa ref para manejar variables reactivas y onMounted para ejecutar una función al montar el componente
import { ref, onMounted } from 'vue'

export default{
    emits: ['prenda-seleccionada'], //Declara los eventos emitidos
    setup(_, { emit }) { // Recibe `emit` correctamente
        const prendas = ref([]); //Variables reactivas: Cambian su valor y se actualiza la vista
        //Variables donde se almacenan los datos de los usuarios
        const nombre = ref("");
        const precio = ref("");          
        const prendaSeleccionada = ref(null);
        const prendaId = ref(null); //Variable reactiva para almacenar el id de la prenda seleccionada

        const cargarPrendas = async()=>{
            //Se hace la petición a la api
            const response = await api.get('/prendas');
            //Se asigna el valor de la respuesta a la variable reactiva
            prendas.value = response.data;
        };
        // Agregar o actualizar prenda
        const guardarPrendas = async()=>{
            if (!nombre.value || !precio.value) {
                alert("Debe ingresar un nombre y un precio.");
                return;
            }
            //Si algun id de prenda está seleccionado entonces se actualiza
            if (prendaId.value) {
                // Actualizar prenda existente
                await api.put(`/prendas/${prendaId.value}`, {
                    nombre: nombre.value,
                    precio: precio.value
                });
            } else {
                // Agregar nueva prenda
                await api.post('/prendas', {
                    nombre: nombre.value,
                    precio: precio.value
                });
            }
            //Se limpian los campos
            nombre.value = "";
            precio.value = "";
            prendaId.value = null;
            //Se recargan los prendas
            cargarPrendas();
        };
        //El parametro prenda viene de la tabla de prendas, de ahí se usa el efecto del v-model para actualizar los campos del formulario
        const editarPrenda = (prenda) =>{
            prendaId.value = prenda.id;
            nombre.value = prenda.nombre;
            precio.value = prenda.precio;
        }
        const eliminarPrenda = async(id)=>{
            //Se hace la petición a la api
            await api.delete(`/prendas/${id}`);
            //Se recargan los prendas
            cargarPrendas();
        };
        const seleccionarPrenda=(id)=>{
            prendaSeleccionada.value = id;
            //Lanzamos el evento
            emit('prenda-seleccionada', prendaSeleccionada);
        }
        onMounted(cargarPrendas); //Se ejecuta la función al montar el componente
        return{
            prendas,
            nombre,
            precio,
            prendaId,
            guardarPrendas,
            editarPrenda,                        
            eliminarPrenda,
            seleccionarPrenda
        }

    }
}
</script>
<template>
    <!--Se crea un formulario para agregar prendas-->
    <div class="container-fluid border p-3">
        <h2>Prendas</h2>
        <div class="row">
            <div class="form-group col-6 p-3 d-flex align-items-center flex-column">
                <!--Se enlazan los campos del formulario a las variables reactivas usando v-model-->
                <div class="row w-50 mt-3">
                    <input type="text" v-model="nombre" placeholder="Nombre">
                </div>
                <div class="row w-50 mt-3">
                    <input type="number" v-model="precio" placeholder="Precio">
                </div>                
                <!--Se llama a la función agregarUsuarios al hacer click en el botón-->
                <div class="row w-50 mt-3">
                    <!-- Cambia el texto del botón dependiendo de si se edita o crea -->
                    <button @click="guardarPrendas" class="btn btn-success">
                        {{ prendaId ? "Actualizar" : "Agregar" }}
                    </button>
                    <!-- Mostrar botón "Cancelar" cuando se edita un usuario (usuarioId!=null) -->
                    <button v-if="prendaId" @click="prendaId = null; nombre=''; precio='';" class="btn btn-danger mt-3">
                        Cancelar
                    </button>
                </div>                
            </div>
            <div class="col-6">                
                <table class="table">
                    <thead class="table-light">
                        <tr>
                        <th>Seleccionar</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th class ="text-center" colspan="2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prenda in prendas" :key="prenda.id">
                        <td><input type="radio" name="prendaSeleccionado" :value="prenda.id" v-model="prendaSeleccionada" @change=seleccionarPrenda(prenda.id) /></td>
                        <td>{{ prenda.nombre }}</td>
                        <td>{{ prenda.precio }}</td>
                        <td class="text-center"><button @click="editarPrenda(prenda)" class="btn btn-warning">Editar</button></td>
                        <td class="text-center"><button @click="eliminarPrenda(prenda.id)" class="btn btn-danger">Eliminar</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>        
    </div>
</template>