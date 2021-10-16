export interface INode {
  id: string;
  nodeName: string;
  content: INode[] | string;
  color?: string;
  groups?: []
}

export interface IResponse {
  data: Array<INode>;
}
