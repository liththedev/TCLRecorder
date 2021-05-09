export type FileData = string | ArrayBuffer;

export enum EventType {
    Death = "DEATH",
    CP1 = "CP1",
    CP2 = "CP2",
    Finish = "FINISH",
}
export interface TCLEvent {
  timestamp: number
  image: number
  x: number
  y: number
  type: EventType
  progress: number
}