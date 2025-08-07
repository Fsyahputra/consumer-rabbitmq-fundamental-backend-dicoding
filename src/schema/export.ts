import Joi from 'joi';
import { TExportDTO } from '../types/export';

const exportSchema = Joi.object<TExportDTO>({
  target: Joi.string().email().required(),
  playlistId: Joi.string().uuid().required(),
  exportFormat: Joi.string().valid('json', 'csv').required(),
  data: Joi.object().required(),
});

export default exportSchema;
