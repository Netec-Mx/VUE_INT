<template>
  <div class="container">
    <h1>Catalogo Pro (2.000 Items Virtualizados)</h1>
    <p>Demostración de renderizado eficiente y medición de rendimiento (Core Web Vitals).</p>
    
    <div style="margin-bottom: 1rem; display: flex; gap: 1rem; align-items: center;">
      <input v-model="search" placeholder="Filtrar por nombre..." style="padding: 0.5rem; flex: 1; border: 1px solid #cbd5e1; border-radius: 6px;" />
      <span>Total cargados: <strong>{{ products.length }}</strong></span>
    </div>

    <!-- Lista virtualizada -->
    <div class="virtual-list" @scroll="handleScroll">
      <div :style="{ height: totalHeight + 'px', position: 'relative' }">
        <div
          v-for="item in visibleProducts"
          :key="item.id"
          class="item-row"
          :style="{ position: 'absolute', top: item.top + 'px', left: 0, right: 0, height: rowHeight + 'px' }"
        >
          <div>
            <strong>{{ item.name }}</strong>
            <span style="color: #64748b; font-size: 0.85rem; margin-left: 0.5rem;">Cod: {{ item.sku }}</span>
          </div>
          <div>
            <span style="color: #16a34a; font-weight: bold; margin-right: 1rem;">${{ item.price.toFixed(2) }}</span>
            <button style="background: #0284c7; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer;">Comprar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const rowHeight = 50
const visibleCount = 12
const scrollTop = ref(0)
const search = ref('')

// Generar 2.000 items
const products = ref(
  Array.from({ length: 2000 }, (_, i) => ({
    id: i + 1,
    name: `Producto Tecnológico #${i + 1}`,
    sku: `SKU-${10000 + i}`,
    price: 15.99 + (i % 100) * 2.5
  }))
)

const filtered = computed(() => {
  if (!search.value.trim()) return products.value
  const q = search.value.toLowerCase()
  return products.value.filter(p => p.name.toLowerCase().includes(q))
})

const totalHeight = computed(() => filtered.value.length * rowHeight)

const startIndex = computed(() => Math.floor(scrollTop.value / rowHeight))
const endIndex = computed(() => Math.min(filtered.value.length, startIndex.value + visibleCount + 5))

const visibleProducts = computed(() => {
  return filtered.value.slice(startIndex.value, endIndex.value).map((item, idx) => ({
    ...item,
    top: (startIndex.value + idx) * rowHeight
  }))
})

function handleScroll(e) {
  scrollTop.value = e.target.scrollTop
}
</script>
