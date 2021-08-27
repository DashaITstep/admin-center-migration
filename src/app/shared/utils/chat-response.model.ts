import { AttachedImageModel, IAttachedImage } from './attached-image.model';
import { arrayOfType } from "./commonFunctions";
import { IResponseOption, ResponseOptionModel } from "./response-option.model";
import { CurrentResponseModel, ICurrentResponse } from "./current-response.model";

export interface IChatResponse {
  CurrentResponses: ICurrentResponse[];
  ResponseOptions: IResponseOption[];
  AttachedImages: IAttachedImage[];
  ResponseTypeId: number;
}
export class ChatResponseModel implements IChatResponse {
  CurrentResponses: ICurrentResponse[] = [];
  ResponseOptions: IResponseOption[] = [];
  AttachedImages: IAttachedImage[] = [];
  ResponseTypeId: number = 0;

  constructor(data?: IChatResponse) {
    if (data) {
      const attachedImages = arrayOfType(data.AttachedImages, AttachedImageModel);

      this.CurrentResponses = arrayOfType(data.CurrentResponses, CurrentResponseModel);
      this.ResponseOptions = arrayOfType(data.ResponseOptions, ResponseOptionModel);
      this.AttachedImages = attachedImages.length ? attachedImages : [];
      this.ResponseTypeId =
        data.CurrentResponses &&
        data.CurrentResponses[0] &&
        data.CurrentResponses[0].ResponseTypeId;
    }
  }
}
