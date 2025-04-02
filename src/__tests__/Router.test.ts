import { describe, it, expect } from 'vitest'
import router from '@/router'

describe('Router', () => {
  it('has the correct routes', () => {
    const routes = router.getRoutes()

    const routeNames = routes.map(route => route.name)
    expect(routeNames).toContain('Dashboard')
    expect(routeNames).toContain('AddWorkout')
    expect(routeNames).toContain('WorkoutDetail')
    expect(routeNames).toContain('AddExercise')

    const paths = routes.map(route => route.path)
    expect(paths).toContain('/')
    expect(paths).toContain('/add-workout')
    expect(paths).toContain('/workout/:id')
    expect(paths).toContain('/workout/:id/add-exercise')
  })
})
