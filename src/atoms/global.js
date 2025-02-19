import { atom } from "jotai";
import { atomWithStorage, createJSONStorage, unwrap } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = createJSONStorage(() => AsyncStorage);

const asyncIsLoginAtom = atomWithStorage("isLogin1", null, storage);
const asyncUserPersonalDataAtom = atomWithStorage(
  "userPersonalData",
  null,
  storage
);

const isLoginAtom = unwrap(asyncIsLoginAtom, (prev) => prev ?? null);
const userPersonalDataAtom = unwrap(
  asyncUserPersonalDataAtom,
  (prev) => prev ?? null
);
const profileAtom = atom(null);
const portfolioAtom = atom(null);

export { isLoginAtom, userPersonalDataAtom, profileAtom, portfolioAtom };
