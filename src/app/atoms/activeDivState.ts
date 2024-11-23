import { atom } from "recoil";

export const activeDivState = atom<string | null>({
  key: "activeDivState",
  default: null,
});
