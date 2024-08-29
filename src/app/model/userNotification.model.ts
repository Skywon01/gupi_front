export class NotificationModel {
    constructor(
        public id: number,
        public senderName: string,
        public senderFirstName: string,
        public fileName: string,
        public timestamp: string,
        public isActive: boolean,
        public user: {
            id: number;
        },
    ) {
    }
}
