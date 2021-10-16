// import { text } from './../config';
// import { Tag } from './../framework';
// import { IResponse, INode } from './../types';

// @Tag()
// export default class Article extends HTMLElement {
//   ids: string[] = [];
//   constructor() {
//     super();
//   }

//   get spans() {
//     return this.querySelectorAll('span');
//   }

//   connectedCallback(): void {
//     const { data } = this.mockResponse();
//     this.appendChild(this.render(data));

//     document.addEventListener('selectionchange', () => {
//       try {
//         const selection = window.getSelection()?.getRangeAt(0);
//         this.ids = [];
//         const firstSpanId = window.getSelection()?.anchorNode?.parentElement?.getAttribute('data-id');

//         const selectedFragment = selection?.cloneContents();
//         // console.log(selectedFragment?.children);
//         const spans = selectedFragment?.querySelectorAll('span');
//         // console.log(spans);
//         spans?.forEach((span) => this.ids.push(span.getAttribute('data-id')!));

//         if (this.ids.length === 0 && firstSpanId) {
//           this.ids.push(firstSpanId);
//         }

//         //  console.log(this.ids)
//       } catch (e) {
//         console.log(e);
//       }
//     });

//     document.addEventListener('keypress', (e) => {
//       if (e.key === 's') {
//         this.spans.forEach((s) => this.ids.includes(s.getAttribute('data-id')!) && s.classList.add('marked'));

//         document.querySelector(`#kbd-${e.key}`)?.classList.add('clicked');
//         setTimeout(() => {
//           document.querySelector(`#kbd-${e.key}`)?.classList.remove('clicked');
//         }, 200);
//       }

//       if (e.key === 'r') {
//         this.spans.forEach((s) => this.ids.includes(s.getAttribute('data-id')!) && s.classList.remove('marked'));

//         document.querySelector(`#kbd-${e.key}`)?.classList.add('clicked');
//         setTimeout(() => {
//           document.querySelector(`#kbd-${e.key}`)?.classList.remove('clicked');
//         }, 200);
//       }
//     });
//   }

//   render(nodeTree: INode[]): DocumentFragment {
//     const fragment = document.createDocumentFragment();

//     for (const node of nodeTree) {
//       const element = document.createElement(node.nodeName);

//       if (node.content.length) {
//         for (const nesteNode of node.content) {
//           const child: INode = nesteNode as INode;
//           const childElement = document.createElement('span');
//           childElement.setAttribute('is', 'orchard-span')

//           childElement.setAttribute('data-id', child.id);
//           childElement.innerText = (' ' + child.content) as string;

//           element.appendChild(childElement);
//         }
//       } else {
//         fragment.appendChild(element);
//       }
//       fragment.appendChild(element);
//     }
//     return fragment;
//   }

//   mockResponse(): IResponse {
//     const createSpans = (parentId: number): INode[] => {
//       return text
//         .split(' ')
//         .map((w, i) => ({ nodeName: 'span', content: w, id: `${parentId}-${i}`, groups: [], color: 'red' }));
//     };

//     const createParagrapgs = (): INode[] =>
//       new Array(10).fill(null).map((p, i) => ({ id: i.toString(), nodeName: 'p', content: createSpans(i) }));
//     return { data: createParagrapgs() };
//   }
// }
