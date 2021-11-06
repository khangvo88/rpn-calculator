export enum MESSAGE_TYPE {
  WARNING = "warning",
  ERROR = "error",
}

export interface IMessage {
  message: String;
  type: MESSAGE_TYPE;
}
