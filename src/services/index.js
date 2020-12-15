const request = require('axios');

import { baseUrl } from './config';

const axios = request.create({
    baseURL: baseUrl,
    timeout: 1000,
});

const errorResponse = { data: null, message: "Bir hata oluştu", status: false };

export const login = async (model) => {

  
}
