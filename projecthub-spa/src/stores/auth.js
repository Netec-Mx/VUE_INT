import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user') || '{"name":"Invitado","role":"guest"}'))

  const isAuthenticated = computed(() => !!token.value && user.value.role !== 'guest')
  const isAdmin = computed(() => user.value.role === 'admin')

  function login(username, role = 'user') {
    token.value = 'fake-jwt-token-' + Date.now()
    user.value = { name: username, role: role }
    localStorage.setItem('token', token.value)
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  function logout() {
    token.value = ''
    user.value = { name: 'Invitado', role: 'guest' }
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { token, user, isAuthenticated, isAdmin, login, logout }
})
