new Vue({
  el: "#appMoviles",
  data: {
    title: "CRUD con VUE.JS",
    state: "read",
    error: false,
    moviles: [
      {
        id: 1,
        marca: "Samsung",
        modelo: "J7 prime",
        stock: 10,
      },
      {
        id: 2,
        marca: "Xiaomi",
        modelo: "Mi 9 SE",
        stock: 12,
      },
      {
        id: 3,
        marca: "Xiaomi",
        modelo: "Note 8 Pro",
        stock: 15,
      },
    ],
    movil: {
      marca: "",
      modelo: "",
      stock: null,
    },
    movilEdit: {},
  },
  computed: {
    totalStock() {
      return this.moviles.reduce((sum, movil) => {
        return sum + movil.stock;
      }, 0);
    },
    hasProducts() {
      if (this.moviles.length === 0) return false;
      else return true;
    },
  },
  methods: {
    btnCancel() {
      this.state = "read";
      this.reset();
    },
    btnNew() {
      this.state = "create";
    },
    btnAdd() {
      if (
        this.movil.marca === "" ||
        this.movil.modelo === "" ||
        this.movil.stock === null
      ) {
        this.error = true;
        return;
      }

      let id;
      if (this.hasProducts) {
        const lastProduct = this.moviles.slice(-1)[0];
        id = lastProduct.id + 1;
      } else id = 0;

      this.moviles.push({
        id: id,
        marca: this.movil.marca,
        modelo: this.movil.modelo,
        stock: Number(this.movil.stock),
      });

      this.reset();
    },
    btnEdit(m) {
      this.state = "edit";
      this.movilEdit = m;
      this.movil.marca = m.marca;
      this.movil.modelo = m.modelo;
      this.movil.stock = m.stock;
    },
    btnUpdate(m) {
      if (
        this.movil.marca === "" ||
        this.movil.modelo === "" ||
        this.movil.stock === null
      ) {
        this.error = true;
        return;
      }

      Vue.set(m, "marca", this.movil.marca);
      Vue.set(m, "modelo", this.movil.modelo);
      Vue.set(m, "stock", Number(this.movil.stock));

      this.reset();
    },
    btnDelete(id) {
      this.moviles = this.moviles.filter((movil) => movil.id !== id);
    },

    reset() {
      this.error = false;

      this.movil.marca = "";
      this.movil.modelo = "";
      this.movil.stock = null;

      this.state = "read";
    },
  },
});
