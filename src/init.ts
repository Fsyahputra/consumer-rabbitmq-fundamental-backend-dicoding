import { Pool } from 'pg';
import PlaylistService from './service/playlist';
import MailService from './service/mail';
import dotenv from 'dotenv';
import config from './conf';
dotenv.config();

const pool = new Pool({
  user: config.pg.user,
  host: config.pg.host,
  database: config.pg.database,
  password: config.pg.password,
  port: config.pg.port,
});

const playlistService = new PlaylistService(pool);
const mailService = new MailService(playlistService);

export default mailService;
