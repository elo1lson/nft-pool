module.exports = {
  apps : [{
    name: 'nft app',
    script: './app.js',
    log_date_format: 'DD--MM--YYYY HH:mm Z',
    error_file: 'logs/error.log',
    out_file: 'logs/out.log',
    pid_file: 'pids/app.pid',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
