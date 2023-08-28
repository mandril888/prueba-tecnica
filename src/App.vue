<template>
  <h1>Prueba técnica</h1>
  <header>
    <button @click="colorRows()">Colorear filas</button>
  </header>

  <main>
    <UsersList :class="coloredRows ? 'colored-rows' : ''" :users="users" />
  </main>
</template>

<script setup>
import getUsers from "./services/UsersRepository";
import UsersList from "./components/UsersList.vue";
import { ref } from "vue";

const users = ref([]);
let coloredRows = ref(false);

getUsers().then((response) => {
  users.value = response.results;
})

function colorRows() {
  coloredRows.value = !coloredRows.value;
}
</script>

<style scoped>
header {
  margin-bottom: 2rem;
}
</style>