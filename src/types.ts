export enum ActionTypes {
  CaptureSSCurrTab = 'CaptureSSCurrTab',
  ACTION_2 = 'ACTION_2',
  ACTION_3 = 'ACTION_3',
}

export interface Action<T> {
  type: ActionTypes;
  payload?: T;
}

export interface CaptureSSCurrTabPayload {
  data: string;
}

export interface Action2Payload {
  value: number;
}

export interface Action3Payload {
  flag: boolean;
}

export type ActionPayloads = CaptureSSCurrTabPayload | Action2Payload | Action3Payload;

export interface Response<T> {
  data: T;
}

export interface CaptureSSCurrTabData {
  success: boolean
  dataUrl?: string
  error?: string 
}

export interface Response2Data {
  product: number;
}

export interface Response3Data {
  status: boolean;
}

export type ResponseData = CaptureSSCurrTabData | Response2Data | Response3Data;