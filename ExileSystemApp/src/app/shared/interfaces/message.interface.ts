export interface Message {
    id: string;
    player: string;
    received: string;
    time: Date;
    type: MessageType
    text: string;
    item: string;
    league: string;
    location: string;
}
