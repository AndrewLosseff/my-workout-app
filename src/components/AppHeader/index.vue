<script setup lang="ts">
import { ROUTES } from './constants'
defineOptions({
  name: 'AppHeader',
})

</script>

<template>
  <v-app-bar app color="primary">
    <v-app-bar-title>Workout Tracker</v-app-bar-title>
    <v-spacer></v-spacer>
        <v-btn
        v-for="route in ROUTES"
        :key="route.path"
        :to="route.path"
        :prepend-icon="route.icon"
        class="mx-1"
        variant="text"
      >
        {{ route.title }}
      </v-btn>
  </v-app-bar>
</template>
