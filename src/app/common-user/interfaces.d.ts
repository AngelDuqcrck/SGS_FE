export interface RequestDTO {
  id: number;
  title: string;
  requestDate: Date;
}

export interface StatusHistoryRequest {
  id:         number;
  requestId:  number;
  statusId:   number;
  changeDate: Date;
}

export interface RequestFullDTO  extends RequestDTO {
  description: string;
  statusId: number,
  userId: number,
  statusChanges: StatusHistoryRequest[]
}
