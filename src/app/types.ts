export type ImageSource = string | ArrayBuffer;

export enum EventType {
    Death = "DEATH",
    CP1 = "CP1",
    CP2 = "CP2",
}
export interface TCLEvent {
  timestamp: Date
  image: number
  x: number
  y: number
  type: EventType
}