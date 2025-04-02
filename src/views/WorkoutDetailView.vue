<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWorkoutStore } from '../stores/workout'
import { useExerciseStore } from '../stores/exercise'
import ExerciseItem from '../components/ExerciseItem/index.vue'

const router = useRouter()
const route = useRoute()
const workoutStore = useWorkoutStore()
const exerciseStore = useExerciseStore()

const workoutId = computed(() => route.params.id as string)

onMounted(() => {
  workoutStore.loadFromLocalStorage()
  exerciseStore.loadFromLocalStorage()
})

const workout = computed(() => workoutStore.getWorkoutById(workoutId.value))
const exercises = computed(() => exerciseStore.getExercisesByWorkoutId(workoutId.value))

const formattedDate = computed(() => {
  if (!workout.value) return ''
  return new Date(workout.value.date).toLocaleDateString()
})

const toggleExerciseCompletion = (id: string) => {
  exerciseStore.toggleExerciseCompletion(id)
}

const deleteExercise = (id: string) => {
  exerciseStore.deleteExercise(id)
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div v-if="workout">
    <div class="d-flex align-center mb-4">
      <v-btn icon @click="goBack" class="mr-2">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="text-h4">{{ workout.name }}</h1>
      <v-chip v-if="workout.completed" color="success" size="small" class="ml-2">
        Completed
      </v-chip>
    </div>

    <v-card class="mb-4">
      <v-card-text>
        <p class="text-subtitle-1">{{ formattedDate }}</p>
        <p>{{ workout.description }}</p>
      </v-card-text>
    </v-card>

    <div class="d-flex justify-space-between align-center mb-4">
      <h2 class="text-h5">Exercises</h2>
      <v-btn color="primary" :to="`/workout/${workout.id}/add-exercise`"> Add Exercise </v-btn>
    </div>

    <v-alert
      v-if="exercises.length === 0"
      type="info"
      text="No exercises added yet. Add your first exercise to get started!"
    ></v-alert>

    <transition-group name="exercise-list" tag="div">
      <exercise-item
        v-for="exercise in exercises"
        :key="exercise.id"
        :exercise="exercise"
        @toggle-completion="toggleExerciseCompletion"
        @delete="deleteExercise"
      />
    </transition-group>
  </div>
  <div v-else>
    <v-alert type="error">Workout not found</v-alert>
    <v-btn color="primary" to="/">Back to Dashboard</v-btn>
  </div>
</template>

<style scoped>
.exercise-list-enter-active,
.exercise-list-leave-active {
  transition: all 0.5s ease;
}
.exercise-list-enter-from,
.exercise-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
