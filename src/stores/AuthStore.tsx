import { makeObservable, observable, action } from "mobx";
import { persist } from "mobx-persist";
import axios from "axios";

export class AuthStore {
  isAuth = true;
  isLoading = false;

  constructor() {
    makeObservable(this, {
      isAuth: observable,
      isLoading: observable,
      login: action,
      logout: action,
    });
  }

  login(credentials: { login: string; password: string }) {
    this.isLoading = true;
    axios
      .post("/login", {
        login: credentials.login,
        password: credentials.password,
      })
      .then(
        action((res) => {
          if (res?.status === 200) {
            this.isAuth = true;
          }
        })
      )
      .catch(action((err) => (this.isAuth = false)))
      .finally(action(() => (this.isLoading = false)));
  }

  logout() {
    this.isAuth = false;
  }
}

// decorate(AuthStore, {
//   token: [persist, observable],
//   user: observable,
//   addUser: action
// });
