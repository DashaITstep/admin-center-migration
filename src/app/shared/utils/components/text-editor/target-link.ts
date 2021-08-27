// @ts-ignore
import Quill from 'quill';

const Link = Quill.import('formats/link');

export class TargetLink extends Link {
  static create(value: any) {
    const node = super.create(value);
    const val = value.split('?target=');

    if (val[0]) {
      value = val[0];
    }

    const target = val[1] ? val[1] : '_blank';

    if (value && !value.startsWith('/') && !value.startsWith('http')) {
      value = `https://${value}`;
    }

    node.setAttribute('href', value);
    node.setAttribute('target', target);

    return node;
  }
}
