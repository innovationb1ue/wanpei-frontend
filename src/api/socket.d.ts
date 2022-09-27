declare namespace SOCKET {
    export type socketMessage<T = string> = {
        action: string;
        data: T;
        message?: string;
    };

    // for self send message, no sender should be provided since it should be determined by server
    // for receiving message, sender will be provided by the server
    export type chatMessage = {
        text: string;
        sender?: string;
    };

    export interface chatSocketMessage extends socketMessage {
        action: string;
        data: chatMessage;
    }
}
