import { create } from "apisauce";

const api = create({
    baseURL: 'http://192.168.1.19:8000'
})

api.addResponseTransform(response => {
    if ( !response.ok ){
        throw response
    }
})

export default api;