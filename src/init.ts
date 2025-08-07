import { Pool } from 'pg';
import PlaylistService from './service/playlist';
import MailService from './service/mail';

const pool = new Pool({
  user: process.env['DB_USER'],
  host: process.env['DB_HOST'],
  database: process.env['DB_NAME'],
  password: process.env['DB_PASSWORD'],
  port: Number(process.env['DB_PORT']),
});

const playlistService = new PlaylistService(pool);
const mailService = new MailService(playlistService);

export default mailService;
