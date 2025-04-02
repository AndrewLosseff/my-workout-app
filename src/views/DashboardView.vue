<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useWorkoutStore } from '@/stores/workout'
import { useExerciseStore } from '@/stores/exercise'
import WorkoutCard from '../components/WorkoutCard/index.vue'

const ZERO_WORKOUTS = 0

const workoutStore = useWorkoutStore()
const exerciseStore = useExerciseStore()

onMounted(() => {
  workoutStore.loadFromLocalStorage()
  exerciseStore.loadFromLocalStorage()
})

const workouts = computed(() => workoutStore.getWorkouts)

const deleteWorkout = (id: string) => {
  workoutStore.deleteWorkout(id)
}
</script>

<template>
  <div>
    <h1 class="text-h4 mb-4">Your Workouts</h1>

    <v-alert
      v-if="workouts.length === ZERO_WORKOUTS"
      class="mb-4"
      type="info"
      text="You don't have any workouts yet. Add your first workout to get started!"
    ></v-alert>

    <v-row>
      <v-col v-for="workout in workouts" :key="workout.id" cols="12" sm="6" md="4">
        <workout-card :workout="workout" @delete="deleteWorkout" />
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card elevation="2" class="custom-card">
          <v-card-title> Add New Workout </v-card-title>
          <div class="button-container">
            <v-btn color="primary" fab to="/add-workout">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.custom-card {
  height: 100%;
  min-height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
</style>
