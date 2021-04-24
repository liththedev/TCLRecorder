export type ImageSource = string | ArrayBuffer;

export enum EventType {
    Death = "DEATH"
}
export interface TCLEvent {
  timestamp: Date
  image: number
  x: number
  y: number
  type: EventType
}