<script setup>
import getUsers from "./services/UsersRepository";
import UsersList from "./components/UsersList.vue";
import { ref } from "vue";

const users = ref([]);
getUsers().then((response) => {
  users.value = response.results;
})
</script>

<template>
  <h1>Prueba técnica</h1>
  <!-- <header>
  </header> -->

  <main>
    <UsersList :users="users" />
  </main>
</template>
