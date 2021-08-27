export interface ICurrentResponse {
  ResponseId: number;
  ResponseTypeId: number;
  ResponseValue: string[];
  PropertyModifiedResponse: number;
}

export class CurrentResponseModel implements ICurrentResponse {
  ResponseId: number = 0;
  ResponseTypeId: number = 0;
  ResponseValue: string[] = [''];
  PropertyModifiedResponse: number = 0;

  constructor(data?: ICurrentResponse) {
    if (data) {
      this.ResponseId = data.ResponseId;
      this.ResponseTypeId = data.ResponseTypeId;
      this.ResponseValue = data.ResponseValue ?? this.ResponseValue;
      this.PropertyModifiedResponse = data.PropertyModifiedResponse;
    }
  }
}
