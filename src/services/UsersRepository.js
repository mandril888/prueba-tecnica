export default function getUsers() {
  return fetch('https://randomuser.me/api/?results=100')
    .then(response => response.json())
    .then(data => data);
}