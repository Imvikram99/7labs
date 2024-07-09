import {apiService} from "./ApiService";

class BookingApis {
    async addNewPatient(formData) {
        return new Promise((resolve, reject)=> {
            apiService.postData('api/v1/lab/patient/register', formData)
                .then(response => resolve(response))
                .catch(error => reject(error.response.data))
        })
    }
}

export const bookingApis = new BookingApis()