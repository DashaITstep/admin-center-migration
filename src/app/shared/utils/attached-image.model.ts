export interface IAttachedImage {
  S3BucketUrl?: string;
  ImageName: string;
}

export class AttachedImageModel implements IAttachedImage {
  S3BucketUrl: string | undefined = '';
  ImageName: string = '';

  constructor(data?: IAttachedImage) {
    if (data) {
      this.S3BucketUrl = data.S3BucketUrl;
      this.ImageName = data.ImageName;
    }
  }
}
