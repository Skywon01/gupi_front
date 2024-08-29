export interface MessageDTO {
    id: number | null;
    content: string;
    senderId: { id: number };
    recipientId: { id: number };
    timestamp: Date;
    senderName?: string;
    recipientName?: string;


}
