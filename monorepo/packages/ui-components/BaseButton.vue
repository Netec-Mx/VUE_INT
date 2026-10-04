<template>
  <button :class="['btn', variant]" @click="$emit('click')">
    <slot />
  </button>
</template>
<script setup>
defineProps({ variant: { type: String, default: 'primary' } })
defineEmits(['click'])
</script>
<style scoped>
.btn { padding: 0.5rem 1rem; border-radius: 6px; border: none; cursor: pointer; font-weight: 500; }
.primary { background: #0284c7; color: white; }
.secondary { background: #e2e8f0; color: #1e293b; }
</style>
