import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from '@/stores/tasks'
import { useAuthStore } from '@/stores/auth'

describe('Pinia Stores', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('inicia con tareas predefinidas y filtra correctamente', () => {
    const taskStore = useTaskStore()
    expect(taskStore.tasks.length).toBeGreaterThan(0)
    taskStore.addTask('Nueva tarea de prueba', 'alta')
    expect(taskStore.tasks.some(t => t.title === 'Nueva tarea de prueba')).toBe(true)
  })

  it('gestiona la autenticacion y roles de usuario', () => {
    const auth = useAuthStore()
    expect(auth.isAuthenticated).toBe(false)
    auth.login('AdminUser', 'admin')
    expect(auth.isAuthenticated).toBe(true)
    expect(auth.isAdmin).toBe(true)
    auth.logout()
    expect(auth.isAuthenticated).toBe(false)
  })
})
