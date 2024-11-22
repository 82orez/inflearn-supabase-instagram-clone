import { atom } from "recoil";

export const selectedIndexState = atom<number | null>({
  key: "selectedIndexState",
  default: null,
});
