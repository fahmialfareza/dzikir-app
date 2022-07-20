export enum Tag {
  before = "before",
  after = "after",
}

export default interface EveryDaysDua {
  id: number;
  dua: string;
  ayah: string;
  latin: string;
  meaningId: string;
  tag: Tag;
}
