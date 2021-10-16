import { text } from './config';
import { Tag, Component } from './framework';
import { IResponse, INode } from './types';

@Tag()
export class Article extends HTMLElement {
  ids: string[] = [];

  constructor() {
    super();
  }
  get spans() {
    return this.querySelectorAll('c-span');
  }

  get selectedGroup() {
    return (document.querySelector('input[name="type"]:checked') as HTMLInputElement)?.value! || '0';
  }

  set selectedGroup(value: string) {
    (document.querySelector(`input[value='${value}']`) as HTMLInputElement).checked = true;
  }

  connectedCallback(): void {
    const { data } = this.mockResponse();
    this.appendChild(this.render(data));

    const selectHandler = this.select.bind(this);
    const keypressHandler = this.keypress.bind(this);

    document.addEventListener('selectionchange', selectHandler);
    document.addEventListener('keypress', keypressHandler);

    (document.querySelector('#kbd-s') as HTMLElement).onclick = () => this.setMarkState(this.selectedGroup);
    (document.querySelector('#kbd-r') as HTMLElement).onclick = () => this.setMarkState('0');

    (document.querySelector('#ids') as HTMLInputElement).addEventListener('change', (event: Event) => {
      if ((event.target as HTMLInputElement).checked) {
        this.classList.add('show-ids');
      } else {
        this.classList.remove('show-ids');
      }
    });
  }

  select(): void {
    try {
      const selection = window.getSelection()?.getRangeAt(0);
      this.ids = [];
      const firstSpanId = window.getSelection()?.anchorNode?.parentElement?.getAttribute('data-id');

      const selectedFragment = selection?.cloneContents();
      const spans = selectedFragment?.querySelectorAll('c-span');
      spans?.forEach((span) => this.ids.push(span.getAttribute('data-id')!));

      if (this.ids.length === 0 && firstSpanId) {
        this.ids.push(firstSpanId);
      }
    } catch (e) {
      console.log(e);
    }
  }

  keypress(event: KeyboardEvent): void {
    const setClickedStyle = () => {
      document.querySelector(`#kbd-${event.key}`)?.classList.add('clicked');
      setTimeout(() => {
        document.querySelector(`#kbd-${event.key}`)?.classList.remove('clicked');
      }, 200);
    };

    if (event.key === 's') {
      this.setMarkState(this.selectedGroup);
      setClickedStyle();
    }

    if (event.key === 'r') {
      this.setMarkState('0');
      setClickedStyle();
    }

    if (event.key === '1') {
      this.selectedGroup = '1';
      setClickedStyle();
    }

    if (event.key === '2') {
      this.selectedGroup = '2';
      setClickedStyle();
    }

    if (event.key === '3') {
      this.selectedGroup = '3';
      setClickedStyle();
    }
  }

  setMarkState(state: string): void {
    this.spans.forEach((s) => this.ids.includes(s.getAttribute('data-id')!) && s.setAttribute('marked', state));
    this.mockRequest(state);
  }

  mockRequest(state: string) {
    const payload: any[] = [];
    this.spans.forEach(
      (s) => this.ids.includes(s.getAttribute('data-id')!) && payload.push({ id: s.getAttribute('data-id'), state })
    );

    const code = document.querySelector('code')!;
    code.textContent = JSON.stringify({ payload }, undefined, 2);
  }

  render(nodeTree: INode[]): DocumentFragment {
    const fragment = document.createDocumentFragment();

    for (const node of nodeTree) {
      const element = document.createElement(node.nodeName);

      if (node.content.length) {
        for (const nesteNode of node.content) {
          const child: INode = nesteNode as INode;
          const childElement = document.createElement('c-span');

          childElement.setAttribute('data-id', child.id);
          childElement.innerText = (' ' + child.content) as string;

          element.appendChild(childElement);
        }
      } else {
        fragment.appendChild(element);
      }
      fragment.appendChild(element);
    }
    return fragment;
  }

  mockResponse(): IResponse {
    const createSpans = (parentId: number): INode[] => {
      return text
        .split(' ')
        .map((w, i) => ({ nodeName: 'span', content: w, id: `${parentId}-${i}`, groups: [], color: 'red' }));
    };

    const createParagrapgs = (): INode[] =>
      new Array(10).fill(null).map((p, i) => ({ id: i.toString(), nodeName: 'p', content: createSpans(i) }));
    return { data: createParagrapgs() };
  }
}

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
