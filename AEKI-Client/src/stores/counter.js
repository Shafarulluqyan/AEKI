import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    products: [],
    productById: {},
    categories: [],
    page: 1,
    router: null,
    searchQuery: "",
    searchResults: [],
    bookmarks: [],
    isLogin: false,
  }),
  getters: {
    getProductInfo: (state) => (productId) => {
      // Lakukan permintaan ke server untuk mendapatkan informasi produk berdasarkan ID
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        return product.name;
      } else {
        return "Unknown Product";
      }
    },
  },
  actions: {
    async registerHandler(registerInput) {
      try {
        await axios({
          method: "post",
          url: "http://localhost:3000/pub/register",
          data: registerInput,
        });
        this.router.push("/login");

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: `Register Success!!!`,
        });
      } catch (error) {
        console.log(error.response.data.message);
        const errorMsg = error.response.data.message;
        this.errors.register = errorMsg;
      }
    },
    async loginHandler(loginInput) {
      try {
        const { data } = await axios({
          method: "post",
          url: "http://localhost:3000/pub/login",
          data: {
            email: loginInput.email,
            password: loginInput.password,
          },
        });
        localStorage.setItem("access_token", data.access_token);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: `Log in successfully, welcome!!!`,
        });

        this.isLogin = true;
        this.router.push("/");
        this.alertSuccess(data);
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "warning",
          title: `Invalid email/password!!!`,
        });
      }
    },
    async fetchData(page) {
      try {
        const { data } = await axios({
          method: "get",
          url: "http://localhost:3000/pub/products?page=" + page,
        });
        console.log(page, "<<<><>< ini page");
        this.products = data.products;
      } catch (error) {
        console.log("🚀 ~ file: counter.js:12 ~ loginHandler ~ error:", error);
      }
    },
    async productDetail(id) {
      try {
        const { data } = await axios({
          method: "get",
          url: "http://localhost:3000/pub/products/" + id,
        });
        // console.log(data, '<<<><>< data si productById')
        this.productById = data;
      } catch (error) {
        console.log("🚀 ~ file: counter.js:12 ~ loginHandler ~ error:", error);
      }
    },
    async fetchCategory() {
      try {
        const { data } = await axios({
          method: "get",
          url: "http://localhost:3000/pub/categories",
        });
        // console.log(data.category, '<<<><><')
        this.categories = data.category;
        return data;
      } catch (error) {
        console.log("🚀 ~ file: counter.js:12 ~ loginHandler ~ error:", error);
      }
    },
    async fetchBookmarks() {
      try {
        const { data } = await axios({
          method: "get",
          url: "http://localhost:3000/pub/bookmarks",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        // console.log(data, '<<<>< data bookmark dari store')
        this.bookmarks = data.bookmark;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async addToBookmark(productId) {
      try {
        const { data } = await axios({
          method: "post",
          url: `http://localhost:3000/pub/bookmarks/${+productId}`,
          headers: { access_token: localStorage.getItem("access_token") },
        });
        console.log(localStorage, "<<<<");
        console.log(data);
        if (data) {
          this.fetchBookmarks();
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: `Success added new bookmark!!!`,
          });
        }
      } catch (error) {
        console.error(error);
        if (error.response.data.message === "Invalid token") {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "warning",
            title: `you need to login first!!!`,
          });
        }
      }
    },
    async doSearch() {
      try {
        const counterStore = this;
        const response = await axios.get(
          `http://localhost:3000/pub/products?productName=${counterStore.searchQuery}`
        );
        if (response.status === 200) {
          console.log(response.data);
          counterStore.products = response.data.products; // Simpan hasil pencarian di store
        }
      } catch (error) {
        console.error(error);
        // Handle error jika ada
      }
    },
    logout() {
      Swal.fire({
        title: "Logout?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          this.router.push("/login");
          this.isLogin = false;
        }
      });
    },
  },
});
