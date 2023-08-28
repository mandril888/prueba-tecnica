<template>
  <h1>Prueba técnica</h1>
  <header>
    <button @click="coloredRows = !coloredRows">Colorear filas</button>
    <button @click="sortType = sortType && sortType === 'country' ? null : 'country'">
      <span v-if="sortType === 'country'">NO ordenar por país</span>
      <span v-else>Ordenar por país</span>
    </button>
    <button @click="restoreUsers">Restablecer usuarios</button>
    <input type="text" placeholder="Filtrar por país" v-model="searchCountry">
  </header>

  <main>
    <UsersList
      :class="coloredRows ? 'colored-rows' : ''"
      :users="usersSortedFiltered" 
      @remove-user="removeUser"
      @sort-by="sortBy"
    />
  </main>
</template>

<script setup>
import getUsers from "./services/UsersRepository";
import UsersList from "./components/UsersList.vue";
import { computed, ref } from "vue";

const searchCountry = ref(null);
const sortType = ref(null);
const users = ref([]);
const usersOrginal = ref([]);
const coloredRows = ref(false);
const usersSortedFiltered = computed(() => {
  let usersFiltered = [];
  
  if (sortType.value === 'name') {
    usersFiltered = [...users.value].sort((a, b) => a.name.first.localeCompare(b.name.first));
  }
  
  if (sortType.value === 'surname') {
    usersFiltered = [...users.value].sort((a, b) => a.name.last.localeCompare(b.name.last));
  }
  
  if (sortType.value === 'country') { 
    usersFiltered = [...users.value].sort((a, b) => a.location.country.localeCompare(b.location.country));
  }
  
  if (!sortType.value || usersFiltered.length === 0) usersFiltered = users.value;

  if(searchCountry.value) {
    usersFiltered = usersFiltered.filter(item => {
      return item.location.country.toLowerCase().indexOf(searchCountry.value.toLowerCase()) > -1
    })
  }

  return usersFiltered;
}); 

getUsers().then((response) => {
  users.value = usersOrginal.value = response.results;
})

function removeUser(email) {
  users.value = users.value.filter((user) => user.email !== email);
}

function restoreUsers() {
  users.value = usersOrginal.value
}

function sortBy(type) {
  sortType.value = type;
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