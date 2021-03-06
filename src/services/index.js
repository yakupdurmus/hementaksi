const request = require('axios');

import { baseUrl, googleMapsUrl,apiKey } from './config';

const axios = request.create({
    baseURL: baseUrl,
    timeout: 1000,
});
const axiosMapsApi = request.create({
    baseURL: googleMapsUrl,
    timeout: 1000,
    params: {
        'key': apiKey, //hemen taksi general apis
        // 'radius': 5000,
        'types': 'establishment'
    }
});

const errorResponse = { data: null, message: "Bir hata oluştu", status: false };

export const login = async (model) => {

}


export const getAutoComplate = async (term, lat, lon) => {

    const config = {
        params: {
            input: term,
            location: (lat + ',' + lon),
            radius: 1000,
        }
    }

    try {
        const response = (await axiosMapsApi.get('place/autocomplete/json', config)).data
        if (response.predictions) {
            response.predictions.map(item => {
                console.log(item.description);
            })
        }
        return response;

    } catch (err) {
        console.log(err);
        return errorResponse;
    }

}

export const getQueryAutoComplete = async (term, lat, lon) => {
    const config = {
        params: {
            input: term,
            language: 'tr',
            location: (lat + ',' + lon),
            radius: 1000,
        }
    }
    if (!lat || !lon) {
        delete config.params.location
        delete config.params.radius
    }

    try {
        const response = (await axiosMapsApi.get('place/queryautocomplete/json', config)).data
        return response.predictions;

    } catch (err) {
        console.log(err);
        return errorResponse;
    }

}

export const getFindPlaceFromText = async (term, lat, lon) => {

    const config = {
        params: {
            input: term,
            inputtype: 'textquery',
            location: (lat + ',' + lon),
            fields: 'name,formatted_address,geometry',
            locationbias: `circle:20000@${lat},${lon}`,
        }
    }

    try {
        const response = (await axiosMapsApi.get('place/findplacefromtext/json', config)).data
        if (response.candidates) {
            response.candidates.map(item => {
                console.log(item.name);
                console.log(item.formatted_address);
            })
        }
        return response;

    } catch (err) {
        console.log(err);
        return errorResponse;
    }

}


export const getPlaceDetail = async (placeId) => {

    const config = {
        params: {
            place_id: placeId
        }
    }

    try {
        const response = (await axiosMapsApi.get('place/details/json', config)).data
        return response?.result

    } catch (err) {
        console.log(err);
        return errorResponse;
    }

}


export const getGeocodeCordToAddress = async (lat, lng) => {

    const config = {
        params: {
            latlng: lat + ',' + lng
        }
    }

    try {
        const response = (await axiosMapsApi.get('geocode/json', config)).data
        console.log("[WR] getGeocodeCordToAddress : ", response);
        if (response.results.length > 0) return response.results[0]
        else return null

    } catch (err) {
        console.log(err);
        return errorResponse;
    }

}

export const getDirections = async (source, destination) => {
    //https://maps.googleapis.com/maps/api/?=Toronto&destination=Montreal&key=AIzaSyBPTkiUWP4MmJ8vw_D2Lcm4sRfJqJjA8AE

    const config = {
        params: {
            origin: source,
            destination: destination
        }
    }

    try {
        const response = (await axiosMapsApi.get('directions/json', config)).data
        console.log("[WR] getDirections : ", response);
        return response?.routes[0]?.legs[0]

    } catch (err) {
        console.log(err);
        return errorResponse;
    }

}
