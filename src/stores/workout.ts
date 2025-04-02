import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { useExerciseStore } from './exercise'
import { STORE_NAME } from '@/constants/stores'

export interface Workout {
  id: string
  name: string
  description: string
  date: string
  completed: boolean
}

export const useWorkoutStore = defineStore(STORE_NAME.WORKOUT, {
  state: () => ({
    workouts: [] as Workout[],
  }),

  getters: {
    getWorkoutById: (state) => (id: string) => {
      return state.workouts.find((workout) => workout.id === id)
    },

    getWorkouts: (state) => {
      return state.workouts
    },
  },

  actions: {
    addWorkout(workout: Omit<Workout, 'id' | 'completed'>) {
      const newWorkout: Workout = {
        ...workout,
        id: uuidv4(),
        completed: false,
      }

      this.workouts.push(newWorkout)
      this.saveToLocalStorage()
      return newWorkout
    },

    deleteWorkout(id: string) {
      const exerciseStore = useExerciseStore()
      exerciseStore.deleteExercisesByWorkoutId(id)

      this.workouts = this.workouts.filter((workout) => workout.id !== id)
      this.saveToLocalStorage()
    },

    updateWorkoutStatus(id: string) {
      const exerciseStore = useExerciseStore()
      const exercises = exerciseStore.getExercisesByWorkoutId(id)

      const allCompleted = exercises.length > 0 && exercises.every((exercise) => exercise.completed)

      const workout = this.workouts.find((w) => w.id === id)
      if (workout) {
        workout.completed = allCompleted
        this.saveToLocalStorage()
      }
    },

    loadFromLocalStorage() {
      const storedWorkouts = localStorage.getItem('workouts')
      if (storedWorkouts) {
        this.workouts = JSON.parse(storedWorkouts)
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('workouts', JSON.stringify(this.workouts))
    },
  },
})
