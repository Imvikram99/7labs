// SpecificApis.js
import { apiService } from './ApiService';

class SpecificApis {
  async fetchPatientList() {
    try {
      const response = await apiService.fetchData('/patients');
      return response.data;
    } catch (error) {
      console.error('Error fetching patient list:', error);
      throw error;
    }
  }

  async enterReports(reportData) {
    try {
      const response = await apiService.post('/reports', reportData);
      return response.data;
    } catch (error) {
      console.error('Error entering reports:', error);
      throw error;
    }
  }

  async verifyReports() {
    try {
      const response = await apiService.get('/reports/verify');
      return response.data;
    } catch (error) {
      console.error('Error verifying reports:', error);
      throw error;
    }
  }

  // Continue with other specific API functions...
}

export const specificApis = new SpecificApis();
