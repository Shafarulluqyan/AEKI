<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
// import CardItem from '../components/CardItem.vue'
// import SideBar from '../components/SideBar.vue'
// import PaginationPage from '../components/PaginationPage.vue'

export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapState(useCounterStore, ['categories'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchCategory', 'fetchData']),
    performSearch() {
      const counterStore = useCounterStore()
      counterStore.searchQuery = this.searchQuery // Simpan query pencarian di store
      counterStore.doSearch() // Panggil fungsi doSearch di store
    }
  },
  created() {
    this.fetchCategory()
  }
  // components: { CardItem, SideBar, PaginationPage }
}
</script>

<template>
  <!-- Sidebar/menu -->
  <div class="col-md-3 mt-2">
    <nav class="sidebar mt-3 rounded-3" style="background-color: #fff8c9">
      <div class="container">
        <h3><b>List of Category</b></h3>
      </div>
      <div>
        <div class="category-list">
          <ul>
            <li v-for="category in categories" :key="category.id">
              <button @click="filterByCategory(category.name)">
                {{ category.name }}
              </button>
            </li>
          </ul>
        </div>
        <div>
          <label for="product-search">Search Product:</label>
          <input
            type="text"
            id="product-search"
            class="form-control"
            placeholder="Enter product name"
            v-model="searchQuery"
            @input="performSearch"
          />
        </div>
      </div>
    </nav>
  </div>
</template>
