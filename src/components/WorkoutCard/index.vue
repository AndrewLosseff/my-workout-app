<script setup lang="ts">
import { computed, ref } from 'vue'
import { useExerciseStore } from '../../stores/exercise'
import type { Workout } from '../../stores/workout'

defineOptions({
  name: 'WorkoutCard',
})

const props = defineProps<{
  workout: Workout
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
}>()

const exerciseStore = useExerciseStore()
const deleteDialog = ref(false)

const exerciseCount = computed(() => {
  return exerciseStore.getExercisesByWorkoutId(props.workout.id).length
})

const formattedDate = computed(() => {
  return new Date(props.workout.date).toLocaleDateString()
})

const confirmDelete = () => {
  deleteDialog.value = true
}

const deleteWorkout = () => {
  emit('delete', props.workout.id)
  deleteDialog.value = false
}
</script>

<template>
  <v-card :class="{ 'completed-workout': workout.completed }" elevation="2" class="workout-card">
    <v-card-title>
      {{ workout.name }}
      <v-chip v-if="workout.completed" color="success" size="small" class="ml-2">
        Completed
      </v-chip>
    </v-card-title>

    <v-card-subtitle>{{ formattedDate }}</v-card-subtitle>

    <v-card-text>
      <p>{{ workout.description }}</p>
      <p class="text-caption mt-2">{{ exerciseCount }} exercises</p>
    </v-card-text>

    <v-card-actions>
      <v-btn variant="text" color="primary" :to="`/workout/${workout.id}`"> View Details </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon color="error" @click.stop="confirmDelete">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete Workout</v-card-title>
        <v-card-text>
          Are you sure you want to delete this workout? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" text @click="deleteWorkout">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style scoped>
.workout-card {
  transition: all 0.3s ease;
}

.completed-workout {
  border-left: 4px solid #4caf50;
}
</style>
