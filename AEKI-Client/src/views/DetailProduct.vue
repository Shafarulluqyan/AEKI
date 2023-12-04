<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    ...mapState(useCounterStore, ['productById'])
  },
  methods: {
    ...mapActions(useCounterStore, ['productDetail', 'addToBookmark']),
  },
  created() {
    this.productDetail(this.$route.params.id)
  }
}
</script>

<template>
  <!-- Detail Page -->
  <!-- <h1>{{ productById.product }}</h1> -->
  <div class="container mt-3 rounded-3">
    <div class="row justify-content-center">
      <div class="col-md-9 col-lg-8 mt-3">
        <div class="card">
          <div class="card-body rounded-3" style="background-color: #fff8c9">
            <div class="row">
              <!-- Kotak gambar (2/3 bagian) -->
              <div class="col-md-8">
                <img :src="productById.product.imgUrl" class="img-fluid" alt="Product Image" />
              </div>
              <div class="col-md-4">
                <div class="detail-info">
                  <!-- Isi detail informasi produk -->
                  <h3>{{ productById.product.name }}</h3>
                  <p>
                    {{ productById.product.description }}
                  </p>
                  <p>Price: Rp. {{ productById.product.price }}</p>
                  <button @click="addToBookmark(productById.product.id)" class="btn btn-primary">
                    Add to Bookmark
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Kotak kosong untuk QR Code -->
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-md-9 col-lg-8 mt-3">
        <div class="card">
          <div class="card-body rounded-3" style="background-color: #fff8c9">
            <div class="row">
              <div class="col-md-12 text-center">
                <h3>QR Code</h3>
                <div class="square-qr-code">
                  <!-- Isi kotak kosong ini dengan QR Code atau informasi lainnya -->
                  <span v-html="productById.qr"></span>
                  <!-- {{ productById.qr }} -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
