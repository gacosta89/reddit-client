module.exports = {
    apps: [
        {
            name: 'SERVER',
            script: './build/server/index.js',
            env: {
                NODE_ENV: 'production',
                NODE_CONFIG_DIR: './config',
            },
        },
    ],
}
