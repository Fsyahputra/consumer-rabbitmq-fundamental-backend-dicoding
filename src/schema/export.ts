import Joi from 'joi';
import { TExportDTO } from '../types/export';

const exportSchema = Joi.object<TExportDTO>({
  targetEmail: Joi.string().email().required(),
  playlistId: Joi.string().required(),
});

export default exportSchema;
