import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useWorkoutStore } from '@/stores/workout'


const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    clear: () => {
      store = {}
    }
  }
})()

vi.stubGlobal('localStorage', localStorageMock)

vi.mock('@/stores/exercise', () => ({
  useExerciseStore: vi.fn(() => ({
    deleteExercisesByWorkoutId: vi.fn(),
    getExercisesByWorkoutId: vi.fn().mockReturnValue([])
  }))
}))

describe('Workout Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  it('adds a workout', () => {
    const store = useWorkoutStore()
    const workout = {
      name: 'Test Workout',
      description: 'Description',
      date: '2023-11-01'
    }

    const newWorkout = store.addWorkout(workout)

    expect(newWorkout.id).toBeDefined()
    expect(newWorkout.name).toBe(workout.name)
    expect(newWorkout.completed).toBe(false)
    expect(store.workouts.length).toBe(1)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('workouts', expect.any(String))
  })

  it('deletes a workout', () => {
    const store = useWorkoutStore()
    const workout = store.addWorkout({
      name: 'Test Workout',
      description: 'Description',
      date: '2023-11-01'
    })

   store.deleteWorkout(workout.id)

    expect(store.workouts.length).toBe(0)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('workouts', expect.any(String))
  })

  it('gets a workout by id', () => {
    const store = useWorkoutStore()
    const workout = store.addWorkout({
      name: 'Test Workout',
      description: 'Description',
      date: '2023-11-01'
    })

    const foundWorkout = store.getWorkoutById(workout.id)

    expect(foundWorkout).toEqual(workout)
  })
})
