module.exports = {
  apps: [
    {
      name: "radio-alikhwan-frontend",
      script: ".output/server/index.mjs",
      env: {
        NITRO_PORT: 5000,
        NODE_ENV: "production",
      },
      instances: 2,
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      node_args: "--experimental-specifier-resolution=node",
    },
  ],
};
