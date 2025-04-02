<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWorkoutStore } from '../stores/workout'
import { useExerciseStore } from '../stores/exercise'

const router = useRouter()
const route = useRoute()
const workoutStore = useWorkoutStore()
const exerciseStore = useExerciseStore()
const form = ref(null)

const workoutId = computed(() => route.params.id as string)

onMounted(() => {
  workoutStore.loadFromLocalStorage()
})

const workout = computed(() => workoutStore.getWorkoutById(workoutId.value))

const exercise = ref({
  workoutId: workoutId.value,
  name: '',
  sets: 3,
  reps: 10,
  weight: 0,
})

const saveExercise = () => {
  // @ts-ignore - form validation
  if (!form.value.validate()) return

  exerciseStore.addExercise(exercise.value)
  router.push(`/workout/${workoutId.value}`)
}

const goBack = () => {
  router.push(`/workout/${workoutId.value}`)
}
</script>

<template>
  <div v-if="workout">
    <div class="d-flex align-center mb-4">
      <v-btn icon @click="goBack" class="mr-2">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="text-h4">Add Exercise to {{ workout.name }}</h1>
    </div>

    <v-form @submit.prevent="saveExercise" ref="form">
      <v-card class="pa-4">
        <v-text-field
          v-model="exercise.name"
          label="Exercise Name"
          :rules="[(v) => !!v || 'Name is required']"
          required
        ></v-text-field>

        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model.number="exercise.sets"
              label="Sets"
              type="number"
              min="1"
              :rules="[
                (v) => !!v || 'Sets is required',
                (v) => v > 0 || 'Sets must be greater than 0',
              ]"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              v-model.number="exercise.reps"
              label="Reps"
              type="number"
              min="1"
              :rules="[
                (v) => !!v || 'Reps is required',
                (v) => v > 0 || 'Reps must be greater than 0',
              ]"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              v-model.number="exercise.weight"
              label="Weight (kg)"
              type="number"
              min="0"
              :rules="[
                (v) => !!v || 'Weight is required',
                (v) => v >= 0 || 'Weight must be 0 or greater',
              ]"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit">Save Exercise</v-btn>
          <v-btn color="error" @click="goBack">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
  <div v-else>
    <v-alert type="error">Workout not found</v-alert>
    <v-btn color="primary" to="/">Back to Dashboard</v-btn>
  </div>
</template>
