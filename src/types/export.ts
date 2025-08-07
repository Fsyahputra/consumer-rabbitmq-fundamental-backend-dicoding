export type TExportDTO = {
  target: string;
  playlistId: string;
  exportFormat: string;
  data: any;
};

export interface IExportService {
  exportData: (dto: TExportDTO) => Promise<void>;
}
