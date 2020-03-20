<template>
  <div class="navbar">
            <router-link to="/artwork" exact>
                Home
            </router-link>
            |
            <router-link to="admin">
                admin
            </router-link>
        </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar{
    background-color: rgb(168, 161, 161);
    padding: 10px;
}
</style>
