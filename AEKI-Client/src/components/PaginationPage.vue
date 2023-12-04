<script>
import { mapActions, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  computed: {
    ...mapWritableState(useCounterStore, ['page'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchData']),
    doNext() {
      this.page++
      this.fetchData(this.page)
    },
    doBack() {
      this.page--
      this.fetchData(this.page)
    }
  }
}
</script>

<template>
  <!-- Pagination -->
  <div class="col-md-3 rounded mt-3 mb-3" style="background-color: #fff8c9">
    <ul class="pagination justify-content-center text-center" style="padding: 10px">
      <li class="page-item">
        <h1><a @click="doBack" v-if="page !== 1" class="page-link" href="#">Back</a></h1>
      </li>
      <li class="page-item">
        <h1 class="page-link" href="#">1</h1>
      </li>
      <li class="page-item">
        <h1 class="page-link" href="#">2</h1>
      </li>
      <li class="page-item">
        <h1 class="page-link" href="#">3</h1>
      </li>
      <li class="page-item">
        <h1><a @click="doNext" v-if="page !== 3" class="page-link" href="#">Next</a></h1>
      </li>
    </ul>
  </div>
</template>
