<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import CardItem from '../components/CardItem.vue'
import SideBar from '../components/SideBar.vue'
import PaginationPage from '../components/PaginationPage.vue'

export default {
  computed: {
    ...mapState(useCounterStore, ['products', 'categories'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchData', 'fetchCategory'])
  },
  created() {
    this.fetchData(), this.fetchCategory()
  },
  components: { CardItem, SideBar, PaginationPage }
}
</script>

<template>
  <!-- !PAGE CONTENT! -->

  <!-- Carousel -->
  <div class="container px-5 mt-5 rounded">
    <div id="carouselExampleIndicators" class="carousel slide mx-auto" style="max-width: 950px">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://homeandtexture.com/wp-content/uploads/2023/05/IKEA_MAVINN_PH192617-23955200-gallery-landscape-img.jpeg"
            class="d-block w-800"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://www.yankodesign.com/images/design_news/2021/04/311502/03_IKEAStudio_IKEAAppleSPACE10_ARApp.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://images.bisnis.com//upload/img/WhatsApp%20Image%202021-04-14%20at%2012.34.18.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>

  <!-- Cards -->
  <div class="container">
    <div class="row">
      <SideBar />
      <!-- Product Card -->
      <div class="col-md-9 rounded mt-3">
        <div class="row">
          <CardItem
            v-for="product in products"
            :key="product.id"
            :product="product"
            class="col-md-4 col-sm-6 mb-3"
          />
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <PaginationPage />
  </div>
</template>
