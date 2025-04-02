import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useExerciseStore } from '@/stores/exercise'

describe('Exercise Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('adds an exercise', () => {
    const store = useExerciseStore()
    const exercise = {
      workoutId: '123',
      name: 'Squats',
      sets: 3,
      reps: 10,
      weight: 100
    }

    const newExercise = store.addExercise(exercise)

    expect(newExercise.id).toBeDefined()
    expect(newExercise.name).toBe(exercise.name)
    expect(newExercise.completed).toBe(false)
    expect(store.exercises.length).toBe(1)
  })

  it('toggles exercise completion', () => {
    const store = useExerciseStore()
    const exercise = store.addExercise({
      workoutId: '123',
      name: 'Squats',
      sets: 3,
      reps: 10,
      weight: 100
    })

    store.toggleExerciseCompletion(exercise.id)

    expect(store.exercises[0].completed).toBe(true)
  })

  it('deletes an exercise', () => {
    const store = useExerciseStore()
    const exercise = store.addExercise({
      workoutId: '123',
      name: 'Squats',
      sets: 3,
      reps: 10,
      weight: 100
    })

    store.deleteExercise(exercise.id)

    expect(store.exercises.length).toBe(0)
  })
})
