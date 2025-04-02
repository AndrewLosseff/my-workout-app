<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWorkoutStore } from '../stores/workout'

const router = useRouter()
const workoutStore = useWorkoutStore()
const form = ref(null)

const workout = ref({
  name: '',
  description: '',
  date: null,
})

const formattedDate = ref(workout.value.date)

const saveWorkout = () => {
  // @ts-ignore - form validation
  if (!form.value.validate()) return

  workout.value.date = formattedDate.value

  const newWorkout = workoutStore.addWorkout(workout.value)
  router.push(`/workout/${newWorkout.id}`)
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <h1 class="text-h4 mb-4">Add New Workout</h1>

    <v-form @submit.prevent="saveWorkout" ref="form">
      <v-card class="pa-4">
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="workout.name"
              label="Workout Name"
              :rules="[(v) => !!v || 'Name is required']"
              required
            ></v-text-field>

            <v-textarea
              v-model="workout.description"
              label="Description"
              :rules="[(v) => !!v || 'Description is required']"
              required
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="4">
            <v-date-picker
              v-model="workout.date"
              label="Workout Date"
              :rules="[(v) => !!v || 'Date is required']"
              required
            ></v-date-picker>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit">Save Workout</v-btn>
          <v-btn color="error" @click="goBack">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>
