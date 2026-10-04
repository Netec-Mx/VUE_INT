<template>
  <div class="card" style="border-left: 4px solid #eab308;">
    <h2>Panel Administrativo Protegido</h2>
    <p>Esta vista solo es accesible con rol <strong>admin</strong> validado por el router guard.</p>
    <div style="background: #fef9c3; padding: 1rem; border-radius: 6px; color: #854d0e;">
      ✓ Token JWT validado correctamente en localStorage.<br />
      ✓ Permisos administrativos confirmados.
    </div>
  </div>
</template>
