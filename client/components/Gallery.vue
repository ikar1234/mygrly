<template>
  <div class="max-w-md w-full lg:flex mx-auto">
    <div
      @click="openThumbnailModal()"
      class="h-64 hover:bg-gray-900 lg:h-auto lg:w-64 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      id="galleryThumbnail"
      v-bind:style="{ 'background-image': 'url('+'https://placekitten.com/300/300'+')' }"
      title="Click to change thumbnail"
    ></div>
    <div
      class="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
      v-if="gallery"
    >
      <div class="mb-8">
        <div class="text-black font-bold text-xl mb-2">
          <div v-if="!editTitle" @click="editTitle = 1">
            <p>{{ gallery.name || `Gallery name`}}</p>
          </div>
          <div v-else>
            <form @submit="changeTitle()">
              <input v-model="newTitle" placeholder="edit me" />
            </form>
          </div>
          <button @click="editTitle = 1">
            <i id="isBookmarked" class="fas fa-pen fa-sm"></i>
          </button>
        </div>
        <!-- <p class="text-grey-darker text-base">AAA</p> -->
      </div>
      <div class="flex items-center mx-auto">
        <div class="text-sm">
          <p class="text-grey-dark">Upload date: {{gallery.uploadDate || `?`}}</p>
        </div>
      </div>
    </div>
    <!-- <div class="fixed inset-0 transition-opacity" aria-hidden="true">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>-->

    <!-- This element is to trick the browser into centering the modal contents. -->
    <!-- <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span> -->
    <div
      v-if="showThumbnailModal"
      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            <!-- Heroicon name: outline/exclamation -->
            <svg
              class="h-6 w-6 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >Deactivate account</h3>
            <div class="mt-2">
              <p
                class="text-sm text-gray-500"
              >Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >Deactivate</button>
        <button
          type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import GalleryService from "../services/GalleryService";

export default {
  name: "Gallery",
  props: ["galleryId"],
  data() {
    return {
      gallery: null,
      editTitle: 0,
      newTitle: "",
      showThumbnailModal: false
    };
  },
  async created() {
    try {
      this.gallery = await GalleryService.getGalleries(this.galleryId);
    } catch (err) {
      this.gallery = null;
      console.log(err);
      this.connectionError = true;
    }
  },
  computed: {
    isUserLoggedIn: {
      get() {
        return this.$store.state.user.is_logged_in;
      }
    },
    actualId() {
      return this.$route.params.galleryId;
    }
  },
  methods: {
    openThumbnailModal() {
      this.showThumbnailModal = true;
    },
    async changeTitle() {
      await GalleryService.updateGalleryName(this.actualId, this.newTitle);
    }
    // toggleLike() {
    //   this.$emit('liked', !this.isLiked)
    //   return this.$store.dispatch("updateMovieLikes", {
    //     imdbID: this.movieData.imdbID
    //   });
    // },
    // toggleBookmark() {
    //   this.$emit('bookmark', !this.isBookMarked)
    //   return this.$store.dispatch("updateMovieBookmark", {
    //     imdbID: this.movieData.imdbID
    //   });
    // }
  }
};
</script>

<style scoped>
#galleryThumbnail:hover {
  filter: blur(1px);
}
</style>