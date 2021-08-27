export interface ITag {
  Tag: string;
  Color: string;
}

export class TagModel implements ITag {
  Tag: string = '';
  Color: string = '';

  constructor(data?: ITag) {
    if (data) {
      this.Tag = data.Tag;
      this.Color = data.Color;
    }
  }
}
