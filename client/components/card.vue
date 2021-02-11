<template>
  <div class="rounded overflow-hidden shadow-lg" :key="cardKey">
    <router-link
      v-if="galleryData"
      :to="{ name: 'Gallery', params: { galleryId: galleryData._id } }"
    >
      <img class="object-cover h-48 w-full" :src="galleryData" alt="Movie Cover" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{galleryData.name || `No name`}}</div>
        <!-- <p class="text-gray-700 text-base line-clamp-2">{{ 123 }}</p> -->
      </div>
      <!-- <div class="px-6 pt-4 pb-2">
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          v-for="(genre, index) in movieGenres"
          :key="`genre-${index}`"
        >{{ genre }}</span>
      </div>-->
    </router-link>
    <div>
      <button @click="deleteGallery(galleryData._id)">
        <i class="fa fa-trash" />
      </button>
    </div>
  </div>
</template>

<script>
import GalleryService from "../services/GalleryService";
export default {
  name: "card",
  props: ["galleryData"],
  data() {
    return {
      cardKey: 0
    };
  },
  computed: {
    isUserLoggedIn: {
      get() {
        return this.$store.state.user.is_logged_in;
      }
    }
  },
  methods: {
    async deleteGallery(id) {
      await GalleryService.deleteGallery(id);
      // TODO: execute after await
      this.cardKey += 1;
    }
    // toggleLike() {
    //   this.$emit("liked", !this.isLiked);
    //   return this.$store.dispatch("updateMovieLikes", {
    //     imdbID: this.movie.imdbID
    //   });
    // },
    // toggleBookmark() {
    //   this.$emit("bookmark", !this.isBookMarked);
    //   return this.$store.dispatch("updateMovieBookmark", {
    //     imdbID: this.movie.imdbID
    //   });
    // }
  }
};
</script>
