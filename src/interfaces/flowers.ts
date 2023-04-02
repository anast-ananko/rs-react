export interface IFlower {
  id: number;
  name: string;
  latinName: string;
  image: string;
}

export interface IFlowers {
  flowers: IFlower[];
}
