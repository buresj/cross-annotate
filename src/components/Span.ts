import { Tag } from '../framework';

@Tag('c-span')
export class CSpan extends HTMLElement {
  isMarked: boolean = false;

  static get observedAttributes() {
    return ['marked'];
  }

  constructor() {
    super();
  }

  getIntersectingColor(a: string, b: string) {
    const sorted = [+a, +b].sort((a, b) => a - b);

    return (document.querySelector(`input[id="${sorted[0] + '-' + sorted[1]}"]`) as HTMLInputElement)?.value;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.isMarked = !!newValue;
    oldValue = oldValue || '0';

    if (oldValue !== '0' && newValue !== '0' && oldValue !== newValue) {
      this.style.backgroundColor = this.getIntersectingColor(oldValue, newValue);
      return;
    }

    const colors = ['transparent', 'hsl(120, 81%, 31%)', 'hsl(200, 43%, 51%)', 'hsl(300, 43%, 51%)', 'red'];

    this.style.backgroundColor = colors[+newValue];
  }
}
