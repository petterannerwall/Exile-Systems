import { MessageTypeEnum } from '../enums/message-type.enum';
export interface Message {
    id: string;
    player: string;
    time: Date;
    type: MessageTypeEnum
    text: string;
}
