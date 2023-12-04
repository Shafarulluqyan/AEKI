<script>
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
import CardItem from '../components/CardItem.vue'

export default {
  components: {CardItem}, 
  computed: {
    ...mapState(useCounterStore, ['bookmarks', 'products'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchBookmarks', 'fetchData'])
  },
  created() {
    this.fetchBookmarks()
    // console.log(this.bookmarks, ",<<<masuk");
  },
}
</script>

<template>
  <!-- Bookmark List -->
  <div class="container mt-5">
    <h1 class="text-center">Bookmark List</h1>
    <div class="row">
      <CardItem v-for="product in bookmarks" :key="product.id" :product="product.Product" />
    </div>
  </div>
</template>
