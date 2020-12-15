const request = require('axios');

import { baseUrl } from './config';

const axios = request.create({
    baseURL: baseUrl,
    timeout: 1000,
    auth: {
        username: 'sebit',
        password: 'sebit'
    }
});

const errorResponse = { data: null, message: "Bir hata oluştu", status: false };

export const getKelimeImageList = async (model) => {

    try {
        const response = (await axios.post('getKelimeImageList', model)).data;
        return response;

    } catch (err) {
        console.log(err);
        return errorResponse;
    }

}
