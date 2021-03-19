<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12 text-center">
                Time skip
                <span class="badge badge-pill badge-warning">{{ idleTime }}</span> seconds
            </div>
            <div class="col-md-12 text-right mb-2">
                <button class="btn btn-info mr-1" @click="toggleState">
                    Show/Hide List Product
                    <span class="badge badge-pill badge-dark">{{ productCount }}</span>
                </button>
                <button class="btn btn-success" @click="addProduct">Add</button>
            </div>
            <div class="col-md-12" v-if="state">
                <table class="table table-striped table-hover" id="product-css">
                    <thead class="thead-dark">
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th style="text-align: center" colspan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="product in products" :key="product.id">
                        <td>{{ product.id }}</td>
                        <td>{{ product.name }}</td>
                        <td>
                            <i class="fas fa-lira-sign"></i>
                            {{ product.price }}
                        </td>
                        <td>
                            <button class="btn btn-danger" style="margin-left: 20px" @click="deleteProduct(product.id)">
                                Delete
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

interface Product {
    id: number;
    name: string;
    price: string;
}

import {createComponent, ref, Ref} from "@vue/composition-api";
import {onMounted, computed} from "@vue/composition-api";
import {useActivePassive} from "./composable/active-passive";
import {useActivityTracker} from "./composable/activity-tracker";

export default createComponent({
    setup() {
        const {state, toggleState} = useActivePassive();
        const {products, productCount, addProduct, deleteProduct} = useProduct();
        const {idleTime} = useActivityTracker();
        return {
            state,
            toggleState,
            products,
            productCount,
            addProduct,
            deleteProduct,
            idleTime
        };
    }
});

function useProduct() {
    let products: Ref<Product[]> = ref<Product[]>([]);
    const productCount = computed<number>(() => products.value.length);

    function addProduct(): void {
        products.value.push({
            id: products.value.length + 1,
            name: "Coca cola " + (products.value.length + 1).toString(),
            price: Math.ceil(Math.random() * 100).toFixed(2)
        });
    }

    function deleteProduct(id: number): void {
        console.log(id)
        products.value = products.value.filter(item => item.id !== id);
    }

    onMounted(() => {
        products.value.push({id: 1, name: "Pepsi", price: (10).toFixed(2)});
    });
    return {products, productCount, addProduct, deleteProduct};
}

</script>
<style>

#product-css {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    text-align: center;
}

#product-css td, #product-css th {
    border: 1px solid #ddd;
    padding: 8px;
}

#product-css tr:nth-child(even) {
    background-color: #f2f2f2;
}

#product-css tr:hover {
    background-color: #ddd;
}

#product-css th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: #4CAF50;
    color: white;
}
</style>
