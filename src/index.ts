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
  }

  select() {
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

  keypress(event: KeyboardEvent) {
    console.log(`#kbd-${event.key}`)
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

  setMarkState(state: string) {
    this.spans.forEach((s) => this.ids.includes(s.getAttribute('data-id')!) && s.setAttribute('marked', state));
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

  connectedCallback() {}

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.isMarked = !!newValue;
    oldValue = oldValue || '0';

    const colorIndex = oldValue !== '0' && newValue !== '0' && oldValue !== newValue ? 4 : +newValue;

    const colors = ['transparent', 'hsl(120, 81%, 31%)', 'hsl(200, 43%, 51%)', 'hsl(300, 43%, 51%)', 'red'];

    this.style.backgroundColor = colors[colorIndex];
  }
}
