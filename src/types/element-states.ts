export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export type TString = {
  letter: string;
  state: ElementStates;
}