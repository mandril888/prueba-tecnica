<template>
  <h1>Prueba técnica</h1>
  <header>
    <button @click="coloredRows = !coloredRows">Colorear filas</button>
    <button @click="sortedUsersByCountry = !sortedUsersByCountry;">Ordenar por país</button>
    <button @click="restoreUsers">Restablecer usuarios</button>
  </header>

  <main>
    <UsersList
      :class="coloredRows ? 'colored-rows' : ''"
      :users="sortUsersByCountry" 
      @remove-user="removeUser"
      />
  </main>
</template>

<script setup>
import getUsers from "./services/UsersRepository";
import UsersList from "./components/UsersList.vue";
import { computed, ref } from "vue";

const users = ref([]);
const usersOrginal = ref([]);
const coloredRows = ref(false);
const sortedUsersByCountry = ref(false);
const sortUsersByCountry = computed(() => {
  return sortedUsersByCountry.value ? 
    [...users.value].sort((a, b) => a.location.country.localeCompare(b.location.country))
    : users.value;
}); 

getUsers().then((response) => {
  users.value = response.results;
  usersOrginal.value = response.results;
})

function removeUser(email) {
  users.value = users.value.filter((user) => user.email !== email);
}

function restoreUsers() {
  users.value = usersOrginal.value
}
</script>

<style scoped>
header {
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  place-content: center;
  gap: 1rem;
}
</style>