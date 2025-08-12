export type TPlaylist = {
  name: string;
  owner: string;
  id: string;
};

export type TSong = {
  title: string;
  year: number;
  performer: string;
  genre: string;
  duration?: number;
  id: string;
  albumId?: string;
};

export interface IPlaylistService {
  getPlaylistById(id: string): Promise<TPlaylist>;
  getSongByPlaylistId(playlistId: string): Promise<TSong[]>;
}

export type TResponse = {
  playlist: {
    name: string;
    id: string;
    songs: any[];
  };
};
