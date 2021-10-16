// import { INode } from './types';

// export class NodeTree {
//   tree: NodeTree | undefined;

//   static buildTree(nodeTree: INode[]) {
//     const fragment = document.createDocumentFragment();
//     for (const node of nodeTree) {
//       const element = document.createElement(node);
//     }
//   }

//   constructor() {}
// }


// const options = {
//   root: this,
//   rootMargin: '0px',
//   threshold: 1.0,
// };

// const handleIntersection: IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
//   entries.map((entry: IntersectionObserverEntry) => {
//     console.log(entry)
//     if (entries.some(entry => entry.intersectionRatio > 0)) {
//       entry.target.classList.add('visible');
//       // observer.unobserve(entry.target);
//       console.log('intersecting');
//     } else {
//       entry.target.classList.remove('visible');
//       entry.target.classList.add('hidden');
//       // console.log('hidden');
//     }
//   });
// };

// const observer = new IntersectionObserver(handleIntersection, options);