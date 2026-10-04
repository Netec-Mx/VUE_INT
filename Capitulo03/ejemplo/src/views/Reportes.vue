<script setup>
// Vista pesada: su chunk solo se descarga cuando alguien autorizado entra a /reportes.
const filas = [
  { mes: 'Julio', ventas: 48_200_000 },
  { mes: 'Agosto', ventas: 51_900_000 },
  { mes: 'Septiembre', ventas: 46_400_000 },
]
</script>

<template>
  <section>
    <h1>Reportes</h1>
    <table>
      <thead>
        <tr><th>Mes</th><th>Ventas</th></tr>
      </thead>
      <tbody>
        <tr v-for="f in filas" :key="f.mes">
          <td>{{ f.mes }}</td>
          <td>{{ f.ventas.toLocaleString('es-CO') }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
