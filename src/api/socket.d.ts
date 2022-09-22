import { string } from "prop-types";

declare namespace SOCKET {
  type socketMessage<T = string> = {
    action: string;
    data: T;
    message: string;
  };

  type chatMessage = {
    text: string;
    sender: string;
  };

  type chatSocketMessage = {
    action: string;
    data: chatMessage;
  };
}
