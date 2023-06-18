import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  /// after error i changed 5000 port from 5173
  server:{
    port:5000
  }

});


