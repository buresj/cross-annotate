import { text } from './config';
import { Tag } from './framework';
import { IResponse, INode } from './types';

@Tag('c-article')
export class CArticle extends HTMLElement {
  constructor() {
    super();
  }

  get words() {
    return this.querySelectorAll('span');
  }

  connectedCallback(): void {
    const { data } = this.mockResponse();
    console.log(data);
    this.appendChild(this.render(data));
    console.log(this.innerHTML);
    this.select();
  }

  render(nodeTree: INode[]): DocumentFragment {
    const fragment = document.createDocumentFragment();

    for (const node of nodeTree) {
      const element = document.createElement(node.nodeName);

      if (node.content.length) {
        for (const nesteNode of node.content) {
          const child: INode = nesteNode as INode;
          const childElement = document.createElement('span');

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

  select() {
    const alreadySelected: HTMLSpanElement[] = [];

    const setSpanOn = function (span: HTMLSpanElement) {
      alreadySelected.push(span);
      span.className = 'text-selected';
    };

    const setSpanOff = function (span: HTMLSpanElement) {
      span.className = '';
    };

    let isSelecting = false;
    let i = 0;

    for (const word of Array.from(this.words)) {
      // console.log(word)

      word.addEventListener('onmousedown', (e) => {
        console.log(e);
        alreadySelected.splice(0).forEach(setSpanOff);
        isSelecting = true;
        // word.onmouseenter();
      });

      word.addEventListener('onmouseenter', (e) => {
        console.log(e);

        if (!isSelecting) return;

        // if already selected
        var j = alreadySelected.indexOf(word);

        if (j >= 0) {
          // then deselect the spans that were selected after this span
          alreadySelected.splice(j + 1).forEach(setSpanOff);
        } else {
          // else if is not the first, check if the user selected another word
          // one line down or up. This is done by checking the indexes:
          if (alreadySelected.length) {
            var last: any = alreadySelected[alreadySelected.length - 1];
            var posLast = [].indexOf.call(this.words, last as never);
            var typeSibling = i > posLast ? 'nextSibling' : 'previousSibling';
            while (1) {
              last = last[typeSibling];
              if (last !== word) setSpanOn(last);
              else break;
            }
          }
          setSpanOn(word);
        }
      });
      i++;
    }
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
