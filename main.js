new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        products: '',
        productName: '',
        productPrice: '',
        dialogAdd: false,
        dialogEdit: false,
        dialogDelete: false,
        productIdEdit: '',
        productNameEdit: '',
        productPriceEdit: '',
        productIdDelete: '',
        productNameDelete: ''
    },
    created: function () {
        this.getProducts()
    },
    methods: {
        getProducts: function () {
            axios.get('http://localhost:3000/products')
                .then(res => {
                    this.products = res.data;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        saveProduct: function () {
            axios.post('http://localhost:3000/products', {
                    product_name: this.productName,
                    product_price: this.productPrice
                })
                .then(res => {
                    this.getProducts();
                    this.productName = '';
                    this.productPrice = '';
                    this.dialogAdd = false;
                })
                .catch(err => {
                    console.log(err);
                })
        },

        getEdit: function (product) {
            this.dialogEdit = true;
            this.productIdEdit = product.id;
            this.productNameEdit = product.product_name;
            this.productPriceEdit = product.product_price;
        },

        getDelete: function (product) {
            this.dialogDelete = true;
            this.productIdDelete = product.id;
            this.productNameDelete = product.product_name;
        },

    
        updateProduct: function () {
            axios.put(`http://localhost:3000/products/${this.productIdEdit}`, {
                    product_name: this.productNameEdit,
                    product_price: this.productPriceEdit
                })
                .then(res => {
                
                    this.getProducts();
                    this.dialogEdit = false;
                })
                .catch(err => {
                 
                    console.log(err);
                })
        },
        deleteProduct: function () {
            axios.delete(`http://localhost:3000/products/${this.productIdDelete}`)
                .then(res => {
                    this.getProducts();
                    this.dialogDelete = false;
                })
                .catch(err => {

                    console.log(err);
                })
        }
    }
})