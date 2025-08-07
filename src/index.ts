import ampq from 'amqplib';
import dotenv from 'dotenv';
import mailService from './init';
import { TExportDTO } from './types/export';
import exportSchema from './schema/export';
dotenv.config();

const host: string = process.env['RABBITMQ_SERVER'] || 'amqp://localhost';
const queueName: string = process.env['RABBIT_QUEUE_NAME'] || 'playlists';

const emailHandler = async (exportDTO: TExportDTO) => {
  try {
    await mailService.exportData(exportDTO);
    console.log(
      `Email sent successfully for playlist ID: ${exportDTO.playlistId}`
    );
  } catch (error) {
    console.error(
      `Failed to send email for playlist ID: ${exportDTO.playlistId}`,
      error
    );
  }
};

const parseToExportDTO = (message: string): TExportDTO => {
  try {
    const data = JSON.parse(message);
    const { error } = exportSchema.validate(data);
    if (error) {
      throw new Error(`Validation error: ${error.message}`);
    }
    return data as TExportDTO;
  } catch (error) {
    console.error('Failed to parse message to TExportDTO:', error);
    throw new Error('Invalid message format');
  }
};

const emailCb = async (msg: string): Promise<void> => {
  const exportDTO = parseToExportDTO(msg);
  await emailHandler(exportDTO);
};

const consumeMessage = async () => {
  try {
    const connection = await ampq.connect(host);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });

    channel.consume(queueName, async (msg) => {
      if (msg) {
        await emailCb(msg.content.toString());
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error consuming message:', error);
  }
};

const init = async () => {
  consumeMessage();
  process.stdin.resume();
  process.on('SIGINT', () => {
    process.exit(0);
  });
};

init().catch((error) => {
  console.error('Error initializing email consumer:', error);
  process.exit(1);
});
