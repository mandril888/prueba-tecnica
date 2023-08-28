<template>
  <table width="100%">
    <thead>
      <tr>
        <th>Foto</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>País</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td><img :src="user.picture.thumbnail" :alt="user.name.first" /></td>
        <td>{{ user.name.first }}</td>
        <td>{{ user.name.last }}</td>
        <td>{{ user.location.country }}</td>
        <td><button>Borrar</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  users: Object
})
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