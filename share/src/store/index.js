import Vue from 'vue'
import Vuex from 'vuex'
import createPersisteState from "vuex-persistedstate";
import axios from "axios";
import router from "../router/index"

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersisteState()],
  state: {
    suth: "",
    user: "",
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    user(state, payload) {
      state.user = payload;
    },
    logout(state, payload) {
      state.auth = payload;
    },
    changeUserData(state, payload) {
      state.user.profile = payload;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const responseLogin = await axios.post(
        "https://fast-mountain-62258.herokuapp.com/api/login",
        {
          emial: email,
          password: password,
        }
      );
      const responseUser = await axios.get(
        "https://fast-mountain-62258.herokuapp.com/api/user",
        {
          params: {
            email: email,
          },
        }
      );
      commit("auth", responseLogin.data.auth);
      commit("user", responseUser.data.data[0])
      router.replace("/home");
    },
    logout({ commit }) {
      axios
        .post("https://fast-mountain-62258.herokuapp.com/api/logout", {
          auth: this.state.auth,
        })
        .then((response) => {
          console.log(response);
          commit("logout", response.data.auth);
          router.replace("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
})
