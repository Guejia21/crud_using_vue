<script>
//Se importa la api
import api from '../api'
//Se importa ref para manejar variables reactivas y onMounted para ejecutar una función al montar el componente
import { ref, onMounted } from 'vue'

export default{
    emits: ['usuario-seleccionado'], //Declara los eventos emitidos
    setup(_, { emit }) { //Recibe `emit` correctamente
        const usuarios = ref([]); //Variables reactivas: Cambian su valor y se actualiza la vista
        //Variables donde se almacenan los datos de los usuarios
        const nombre = ref("");
        const email = ref("");          
        const usuarioSeleccionado = ref(null);
        const usuarioId = ref(null); //Variable reactiva para almacenar el id del usuario seleccionado

        const cargarUsuarios = async()=>{
            //Se hace la petición a la api
            const response = await api.get('/usuarios');
            //Se asigna el valor de la respuesta a la variable reactiva
            usuarios.value = response.data;
        };
        // Agregar o actualizar usuario
        const guardarUsuario = async () => {
            if (!nombre.value || !email.value) {
                alert("Debe ingresar un nombre y un email.");
                return;
            }
            //Si algun id de usuario está seleccionado entonces se actualiza
            if (usuarioId.value) {
                // Actualizar usuario existente
                await api.put(`/usuarios/${usuarioId.value}`, {
                    nombre: nombre.value,
                    email: email.value
                });
            } else {
                // Agregar nuevo usuario
                await api.post('/usuarios', {
                    nombre: nombre.value,
                    email: email.value
                });
            }
            //Se limpian los campos
            nombre.value = "";
            email.value = "";
            usuarioId.value = null;
            //Se recargan los usuarios
            cargarUsuarios();
        };
        //El parametro usuario viene de la tabla de usuarios, de ahí se usa el efecto del v-model para actualizar los campos del formulario
        const editarUsuario = (usuario) =>{
            usuarioId.value = usuario.id;
            nombre.value = usuario.nombre;
            email.value = usuario.email;
        }
        const eliminarUsuario = async(id)=>{
            //Se hace la petición a la api
            await api.delete(`/usuarios/${id}`);
            //Se recargan los usuarios
            cargarUsuarios();
        };
        const seleccionarUsuario=(id)=>{
            usuarioSeleccionado.value = id;
            //Lanzamos el evento
            emit('usuario-seleccionado', id);
        }
        onMounted(cargarUsuarios); //Se ejecuta la función al montar el componente
        return{
            usuarios,
            nombre,
            email,
            usuarioId,
            usuarioSeleccionado,
            guardarUsuario,
            editarUsuario,
            eliminarUsuario,
            seleccionarUsuario
        }

    }
}
</script>
<template>
    <!--Se crea un formulario para agregar usuarios-->
    <div class="container-fluid border p-3">
        <h2>Usuarios</h2>
        <div class="row">
            <div class="form-group col-6 p-3 d-flex align-items-center flex-column">
                <!--Se enlazan los campos del formulario a las variables reactivas usando v-model-->
                <div class="row w-50 mt-3">
                    <input type="text" v-model="nombre" placeholder="Nombre">
                </div>
                <div class="row w-50 mt-3">
                    <input type="email" v-model="email" placeholder="Email">
                </div>                                
                <div class="row w-50 mt-3">
                    <!-- Cambia el texto del botón dependiendo de si se edita o crea -->
                    <button @click="guardarUsuario" class="btn btn-success">
                        {{ usuarioId ? "Actualizar" : "Agregar" }}
                    </button>
                    <!-- Mostrar botón "Cancelar" cuando se edita un usuario (usuarioId!=null) -->
                    <button v-if="usuarioId" @click="usuarioId = null; nombre=''; email='';" class="btn btn-danger mt-3">
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
                        <th>Email</th>
                        <th class="text-center" colspan="2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="usuario in usuarios" :key="usuario.id">
                        <td><input type="radio" name="usuarioSeleccionado" :value="usuario.id" v-model="usuarioSeleccionado" @change=seleccionarUsuario(usuario.id) /></td>
                        <td>{{ usuario.nombre }}</td>
                        <td>{{ usuario.email }}</td>
                        <td class="text-center"><button @click="editarUsuario(usuario)" class="btn btn-warning">Editar</button></td>
                        <td class="text-center"><button @click="eliminarUsuario(usuario.id)" class="btn btn-danger">Eliminar</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>        
    </div>
</template>