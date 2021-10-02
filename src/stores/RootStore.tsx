import { AuthStore } from "./AuthStore";
import { create } from "mobx-persist";

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});

class RootStore {
  AuthStore = new AuthStore();

  constructor() {
    //rehydrate stores here
    hydrate("auth", this.AuthStore).then((r) =>
      console.log("auth state has been hydrated")
    );
  }
}

export const Store = new RootStore();
