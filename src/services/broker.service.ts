import amqp, { type ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { Inject, Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { BrokerQueue } from '../enum/broker.enum';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

config();

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;

  protected newUserQueue = 'New-User-Queue';
  protected updateUserQueue = 'Update-User-Queue';
  protected loginUserQueue = 'Login-User-Queue';
  protected userChangeProfile = 'User-Change-Profile';
  protected userChangeBackground = 'User-Change-Background';
  protected userChangeInfo = 'User-Change-Info';
  protected userQueues: string[] = [
    this.newUserQueue,
    this.loginUserQueue,
    this.updateUserQueue,
    this.userChangeProfile,
    this.userChangeBackground,
    this.userChangeInfo,
  ];

  protected userExchange = 'User-Exchanges';
  protected exchanges: string[] = [this.userExchange];

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    const connection = amqp.connect(process.env.RABBIT_MQ_URL);
    this.channelWrapper = connection.createChannel({
      setup: async (channel: Channel) => {
        for (const exchange of this.exchanges)
          await channel.assertExchange(exchange, 'direct', {
            durable: true,
            autoDelete: false,
          });

        for (const queue of [...this.userQueues])
          await channel.assertQueue(queue, {
            durable: true,
            autoDelete: false,
          });

        for (const exchange of this.exchanges) {
          let queues: string[] = [];
          switch (exchange) {
            case this.userExchange:
              queues = this.userQueues;
              break;
            default:
              break;
          }
          for (const queue of queues)
            await channel.bindQueue(queue, exchange, `${exchange}.${queue}`);
        }
      },
    });
  }

  public async sendToQueue(data: object, queue: BrokerQueue) {
    this.logger.log('info',`sending message to queue: ${queue}`)
    return await this.channelWrapper.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(data)),
    );
  }
}
