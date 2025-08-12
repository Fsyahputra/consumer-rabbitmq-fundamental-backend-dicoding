import autoBind from 'auto-bind';
import { IPlaylistService, TPlaylist, TSong } from '../types/playlist';
import { Pool } from 'pg';

class PlaylistService implements IPlaylistService {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
    autoBind(this);
  }

  private async getSongIdByPlaylistId(playlistId: string): Promise<string[]> {
    const result = await this.pool.query(
      'SELECT song_id FROM playlist_songs WHERE playlist_id = $1',
      [playlistId]
    );
    return result.rows.map((row) => row.song_id);
  }

  public async getPlaylistById(id: string): Promise<TPlaylist> {
    const result = await this.pool.query(
      'SELECT * FROM playlists WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  public async getSongByPlaylistId(playlistId: string): Promise<TSong[]> {
    const songIds = await this.getSongIdByPlaylistId(playlistId);
    console.log('Song IDs:', songIds);
    if (songIds.length === 0) {
      return [];
    }
    const placeholders = songIds.map((_, i) => `$${i + 1}`).join(',');
    const query = `SELECT * FROM songs WHERE id IN (${placeholders})`;
    const result = await this.pool.query(query, songIds);
    console.log('Songs:', result.rows);
    return result.rows;
  }
}

export default PlaylistService;
