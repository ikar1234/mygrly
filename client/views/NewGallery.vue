<template>
  <div>
    <div>
      <div>
        <p>Create a new gallery</p>
        <input class="m-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" v-model="title" @input="successMessage=false" placeholder="Add title to gallery" />

        <form action="/profile" method="post" enctype="multipart/form-data">
          <input type="file" name="avatar" />
        </form>

        <div v-if="pictures" class="mt-3">Choose a thumbnail (optional)</div>
      </div>
    </div>
    <button class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded" @click="saveGallery()">Save</button>
    <br/>
    <div
      v-if="successMessage"
    >Gallery successfully created!</div>
    <router-link :to="{name: 'Home'}">See all galleries</router-link>
  </div>
</template>


<script>
import GalleryService from "../services/GalleryService";

export default {
  name: "NewGallery",
  props: {},
  data() {
    return {
      title: "",
      pictures: [],
      thumbnail: "pic.jpg",
      successMessage: false
    };
  },
  computed: {
    userId: {
      get() {
        return this.$store.state.user.id;
      }
    }
  },
  methods: {
    async saveGallery() {
      await GalleryService.insertGallery(
        this.userId,
        this.title,
        this.pictures,
        this.thumbnail
      );
      this.successMessage = true;
    },
    onFileChange(e) {
      const files = e.target.files;
      console.log(files);
      try {
        Array.from(files).forEach(element => {
          console.log(element.name);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>



<style scoped>
</style>