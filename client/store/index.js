import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

export default new Vuex.Store({
  state: {
    user: {
      is_logged_in: null,
      id: 101
    }
  },
  mutations: {
    setMovie(state, { movie }) {
      movie.likes = 0;
      movie.bookmark = 0;
      state.movies.push(movie);
    },
    setAuthenticatedUser(state, payload) {
      state.user.is_logged_in = true;
      state.user.id = payload.id;
    },
    logoutUser(state) {
      state.user.is_logged_in = false;
      state.movies = [];
    },
    updateLoggedUserProfile(state, payload) {
      state.user.email = payload.email;
      state.user.name = payload.name;
    }
  },
  actions: {
    // updateMovieLikes({ state, commit }, payload) {
    //   state.movies.forEach(function (item, index) {
    //     if (item.imdbID === payload.imdbID) {
    //       commit('toggleLike', { index });
    //     }
    //   });
    // },
    logUser({ commit }, payload) {
      commit('setAuthenticatedUser', payload);
    },
    logoutUser({ commit }) {
      commit('logoutUser');
    },
    updateUser({ commit }, payload) {
      commit('updateLoggedUserProfile', payload);
    }
  },
  getters: {

    getLoggedInUser: (state) => {
      return state.user;
    },
  },
  modules: {

  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
})