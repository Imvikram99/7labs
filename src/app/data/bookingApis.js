import {apiService} from "./ApiService";

class BookingApis {
    async addNewPatient(formData) {
        try {
            const response = await apiService.postData('api/v1/lab/patient/register', formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const bookingApis = new BookingApis()