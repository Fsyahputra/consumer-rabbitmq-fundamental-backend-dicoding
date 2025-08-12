import autoBind from 'auto-bind';
import { IExportService } from '../types/export';
import { TExportDTO } from '../types/export';
import { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';
import {
  IPlaylistService,
  TPlaylist,
  TResponse,
  TSong,
} from '../types/playlist';
import config from '../conf';

class MailService implements IExportService {
  private transporter: Transporter;
  private static subject = 'Exported Playlist Data';
  private static message = 'Here is the exported data of your playlist.';
  private playlistService: IPlaylistService;

  constructor(playlistService: IPlaylistService) {
    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.password,
      },
    });

    this.playlistService = playlistService;
    autoBind(this);
  }

  private prepareExportData(playlist: TPlaylist, songs: TSong[]): TResponse {
    return {
      playlist: {
        name: playlist.name,
        id: playlist.id,
        songs: songs.map((song) => ({
          id: song.id,
          title: song.title,
          performer: song.performer,
        })),
      },
    };
  }

  public async exportData(dto: TExportDTO): Promise<void> {
    const email = dto.targetEmail;
    const playlist = await this.playlistService.getPlaylistById(dto.playlistId);
    const songs = await this.playlistService.getSongByPlaylistId(
      dto.playlistId
    );
    const formattedData = this.prepareExportData(playlist, songs);
    await this.transporter.sendMail({
      from: config.smtp.from,
      to: `Mailtrap Sandbox <${email}>`,
      subject: MailService.subject,
      text: MailService.message,
      attachments: [
        {
          filename: `${playlist.name}.json`,
          content: JSON.stringify(formattedData, null, 2),
          contentType: 'application/json',
        },
      ],
    });
  }
}

export default MailService;
