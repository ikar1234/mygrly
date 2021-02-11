<template>
  <div
    class="mx-auto p-10"
  >
    <gallery-component :key="movieKey" :gallery-data="gallery" ></gallery-component>
  </div>
</template>

<script>
import GalleryComponent from "../components/Gallery.vue";
import GalleryService from "../services/GalleryService";


export default {
  name: "Movie",
  components: { GalleryComponent },
  data() {
    return {
      movieKey: 0,
      gallery: null,
    }
  },
  methods: {
  },
  computed: {
    // movie() {
    //   return this.$store.getters.getMovieById(this.$route.params.movieId);
    // },
  },
  mounted() {
    this.gallery = GalleryService.getGalleries(this.$route.params.movieId);
  },
};
</script>
