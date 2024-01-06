const production = !process.env.ROLLUP_WATCH;
module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
  ],
  purge: {
    content: [
     "./frontend/App.svelte",
     "./frontend/views/**/*.{svelte, css, html, js}"
    ],
    enabled: production // disable purge in dev
  },
};
