<template>
  <!-- Root element for center items -->
  <div class="flex flex-col h-screen bg-gray-100">
    <!-- Auth Card Container -->
    <div class="grid place-items-center mx-2 my-20 sm:my-auto">
      <!-- Auth Card -->
      <div
        class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg"
      >
        <!-- Card Title -->
        <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Login</h2>

        <!-- Username Input -->
        <label for="username" class="block text-xs font-semibold text-gray-600 uppercase">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          v-model="username"
          placeholder="username"
          class="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
          required
        />

        <!-- Password Input -->
        <label
          for="password"
          class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
        >Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="password"
          autocomplete="current-password"
          v-model="password"
          class="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
          required
        />

        <!-- Auth Buttton -->
        <button
          @click="loginUser()"
          class="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
        >Login</button>
      </div>
      <div
        v-if="connectionError"
        class="text-red"
      >Could not establish connection to the database. Plase try again later</div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import UserService from "../services/UserService";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      connectionError: false
    };
  },
  methods: {
    ...mapMutations(["setMovies"]),
    async loginUser() {
      if (this.username === "" || this.password === "") {
        return;
      }
      try {
        var user = await UserService.getUser(this.username);

        this.$store.dispatch("logUser", {
          id: 101
        });
        this.$router.push({ name: "Home" });
        console.log(user);
      } catch (err) {
        this.connectionError = true;
      }
    }
  },
  computed: {}
  // mounted() {
  //   this.movieIds.forEach((movieId) => {
  //     axios
  //       .get("http://www.omdbapi.com/?i=" + movieId + "&apikey=2cbab1d9&")
  //       .then((response) => {
  //         this.$store.dispatch("addMovie", { movie: response.data });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  // },
};
</script>
