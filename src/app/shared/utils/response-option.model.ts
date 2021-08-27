import { AttachedImageModel, IAttachedImage } from "./attached-image.model";
import { arrayOfType } from "./commonFunctions";

export interface IResponseOption {
  ResponseId: number;
  ResponseValue: string[] | string;
  ResponseTypeId: number;
  AttachedImages: IAttachedImage[];
}

export class ResponseOptionModel implements IResponseOption {
  ResponseId: number = 0;
  ResponseValue: string[] | string = [];
  ResponseTypeId: number = 0;
  AttachedImages: IAttachedImage[] = [];

  constructor(data?: IResponseOption) {
    if (data) {
      this.ResponseId = data.ResponseId;
      this.ResponseValue = data.ResponseValue ? data.ResponseValue : this.ResponseValue;
      this.ResponseTypeId = data.ResponseTypeId;
      this.AttachedImages = arrayOfType(data.AttachedImages, AttachedImageModel);
    }
  }
}
