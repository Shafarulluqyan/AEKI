<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    ...mapState(useCounterStore, ["categories"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["fetchCategory", "fetchData"]),
    performSearch() {
      const counterStore = useCounterStore();
      counterStore.searchQuery = this.searchQuery;
      counterStore.doSearch();
    },
  },
  created() {
    this.fetchCategory();
  },
};
</script>

<template>
  <div class="col-md-3 mt-2">
    <nav class="sidebar mt-3 rounded-3" style="background-color: #fff8c9">
      <div class="container">
        <h3><b>List of Categories</b></h3>
      </div>
      <div>
        <div class="category-list">
          <ul class="list-group">
            <!-- Menambahkan item khusus -->
            <li class="list-group-item">- Meja</li>
            <li class="list-group-item">- Kursi</li>
            <li class="list-group-item">- Lemari</li>
          </ul>
        </div>
        <div class="mt-3">
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
