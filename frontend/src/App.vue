\<template>
  <v-app class="bg-grey-lighten-4">
    <v-app-bar color="white" elevation="0" class="border-b">
      <template v-slot:prepend>
        <v-icon color="success" size="32" class="ml-4">mdi-owl</v-icon>
      </template>

      <v-app-bar-title class="text-success font-weight-black text-uppercase" style="letter-spacing: 1px;">
        LingoBuilder
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="d-none d-md-flex mr-4">
        <v-btn to="/" color="grey-darken-1" variant="text" class="font-weight-bold mx-1">
          <v-icon start>mdi-home-variant</v-icon> Home
        </v-btn>
        <v-btn to="/posts/new" color="grey-darken-1" variant="text" class="font-weight-bold mx-1">
          <v-icon start>mdi-plus-circle-outline</v-icon> Learn
        </v-btn>
        <v-btn to="/test" color="grey-darken-1" variant="text" class="font-weight-bold mx-1">
          <v-icon start>mdi-dumbbell</v-icon> Practice
        </v-btn>
      </div>
    </v-app-bar>

   <v-main class="bg-grey-lighten-4">
      <v-container class="mt-16 pt-10">
        <router-view/>
      </v-container>
    </v-main>

   <v-footer color="white" class="border-t d-flex justify-center align-center py-1" height="40">
      <div class="text-caption text-grey">
        <strong>Language learner made by Le Long, COMP1842</strong> &copy; {{ new Date().getFullYear() }}
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.v-btn { text-transform: none !important; letter-spacing: 0 !important; }
</style>