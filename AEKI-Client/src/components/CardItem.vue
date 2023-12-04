<script>
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  props: ['product'],

  computed: {
    ...mapState(useCounterStore, ['bookmarks', 'products'])
  }
}
</script>
<template>
  <div class="col-md-4">
    <div class="card">
      <img :src="product.imgUrl" />
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">Rp.{{ product.price }}</p>
        <a @click="$router.push('/detail/' + product.id)" class="btn btn-primary">Shop Now</a>
      </div>
    </div>
  </div>
</template>
