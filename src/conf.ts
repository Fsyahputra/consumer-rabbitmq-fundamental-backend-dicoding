import dotenv from 'dotenv';
dotenv.config();

const config = {
  smtp: {
    host: process.env['SMTP_HOST'] || 'live.smtp.mailtrap.io',
    port: Number(process.env['SMTP_PORT']) || 587,
    user: process.env['SMTP_USER'] || 'default_user',
    password: process.env['SMTP_PASSWORD'] || 'default_password',
    from: process.env['SMTP_FROM'] || 'OpenMusic <noreply@openmusic.com>',
  },
  pg: {
    user: process.env['PG_USER'] || 'developer',
    host: process.env['PG_HOST'] || 'localhost',
    database: process.env['PG_DATABASE'] || 'openmusicv2',
    password: process.env['PG_PASSWORD'] || '8phtnsf7',
    port: Number(process.env['PG_PORT']) || 5432,
  },
  rabbitmq: {
    server: process.env['RABBITMQ_SERVER'] || 'amqp://localhost',
    queueName: process.env['RABBIT_QUEUE_NAME'] || 'playlists',
  },
};

export default config;
