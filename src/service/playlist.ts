import { IPlaylistService, TPlaylist, TSong } from '../types/playlist';
import { Pool } from 'pg';

class PlaylistService implements IPlaylistService {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  public async getPlaylistById(id: string): Promise<TPlaylist> {
    const result = await this.pool.query(
      'SELECT * FROM playlists WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  public async getSongByPlaylistId(playlistId: string): Promise<TSong[]> {
    const result = await this.pool.query(
      'SELECT * FROM songs WHERE playlist_id = $1',
      [playlistId]
    );
    return result.rows;
  }
}

export default PlaylistService;
