<template>
  <table width="100%">
    <thead>
      <tr>
        <th>Foto</th>
        <th class="pointer" @click="sortBy('name')">Nombre</th>
        <th class="pointer" @click="sortBy('surname')">Apellido</th>
        <th class="pointer" @click="sortBy('country')">País</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="users.length === 0">
        <td colspan="5" class="alert">No existen usuarios</td>
      </tr>
      <tr v-for="user in users" :key="user.email">
        <td><img :src="user.picture.thumbnail" :alt="user.name.first" /></td>
        <td>{{ user.name.first }}</td>
        <td>{{ user.name.last }}</td>
        <td>{{ user.location.country }}</td>
        <td><button @click="removeUser(user.email)">Borrar</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  users: Object
})

const emit = defineEmits(['removeUser', 'sortBy'])
const removeUser = (email) => {
  emit('removeUser', email)
}
const sortBy = (type) => {
  emit('sortBy', type)
}
</script>

<style scoped>
th {
  font-weight: 800;
}

.colored-rows tbody tr:nth-child(odd) {
  background-color: #333;
}

.colored-rows tbody tr:nth-child(even) {
  background-color: #555;
}
</style>
