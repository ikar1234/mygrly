<template>
  <div>
    <router-link
      :to="{name: 'NewGallery'}"
      class="text-xl text-black m-auto uppercase tracking-wide"
    >Create new gallery</router-link>
    <div
      class="p-24 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-12"
    >
      <div v-for="gallery in galleries" :key="gallery._id">
        <card :galleryData="gallery" />
      </div>
      <div
        v-if="!galleries || galleries.length==0"
        class="align-content: center"
      >You have no galleries yet.</div>
      <div v-if="connectionError">Galleries could not be loaded. Please try again later.</div>
    </div>
  </div>
</template>

<script>
import Card from "../components/card.vue";
import GalleryService from "../services/GalleryService";
// import axios from "axios";

export default {
  name: "Home",
  components: { Card },
  data() {
    return {
      galleries: [],
      connectionError: false
    };
  },
  computed: {
    userId: {
      get() {
        return this.$store.state.user.id;
      }
    }
  },
  async mounted() {
    try {
      this.galleries = await GalleryService.getGalleries(this.userId);
    } catch (err) {
      this.galleries = [];
      console.log(err);
      this.connectionError = true;
    }
    // const url = "http://localhost:3000/galleries/";
    // axios
    //   .get(`${url}user/${101}`)
    //   .then(res => {
    //     this.galleries = res.data;
    //     console.log(this.galleries);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  methods: {
    // onScroll() {
    //   window.onscroll = () => {
    //     let bottomOfWindow =
    //       Math.max(
    //         window.pageYOffset,
    //         document.documentElement.scrollTop,
    //         document.body.scrollTop
    //       ) +
    //         window.innerHeight ===
    //       document.documentElement.offsetHeight;
    // if (bottomOfWindow) {
    //   this.nextMovieIds.forEach(movieId => {
    //     axios
    //       .get("http://www.omdbapi.com/?i=" + movieId + "&apikey=2cbab1d9&")
    //       .then(response => {
    //         this.$store.dispatch("addMovie", { movie: response.data });
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   });
    //   this.nextMovieIds = [];
    // }
    // };
    // }
  },
  // mounted() {
  //   this.$nextTick(function() {
  //     window.addEventListener("scroll", this.onScroll);
  //     this.onScroll(); // needed for initial loading on page
  //   });
  // },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>
