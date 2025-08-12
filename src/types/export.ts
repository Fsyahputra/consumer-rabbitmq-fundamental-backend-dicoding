export type TExportDTO = {
  targetEmail: string;
  playlistId: string;
};

export interface IExportService {
  exportData: (dto: TExportDTO) => Promise<void>;
}
