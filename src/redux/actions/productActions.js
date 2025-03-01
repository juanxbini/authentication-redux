import { FETCH_PRODUCTS, ADD_PRODUCT, REMOVE_PRODUCT } from './actionTypes';

export const fetchProducts = (products) => ({
    type: FETCH_PRODUCTS,
    payload: products
});

export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload: product
});

export const removeProduct = (productId) => ({
    type: REMOVE_PRODUCT,
    payload: productId
});
