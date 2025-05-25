module.exports = {
  apps: [
    {
      name: "radio-alikhwan-frontend",
      script: ".output/server/index.mjs",
      instances: 2,
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      node_args: "--experimental-specifier-resolution=node",
    },
  ],
};
