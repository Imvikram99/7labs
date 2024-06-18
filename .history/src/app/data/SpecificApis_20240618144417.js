// SpecificApis.js
import { apiService } from './ApiService';

class SpecificApis {
  async fetchPatientList(searchQuery,searchQueryType) {
    try {
        const response = await apiService.fetchData(`/api/v1/lab/patient?searchQuery=${encodeURIComponent(searchQuery)}&searchQueryType=${encodeURIComponent(searchQueryType)}`);
        return response.data;
    } catch (error) {
      console.error('Error fetching patient list:', error);
      throw error;
    }
  }

  async enterReports(reportData) {
    try {
      const response = await apiService.postData('/reports', reportData);
      return response.data;
    } catch (error) {
      console.error('Error entering reports:', error);
      throw error;
    }
  }

  async registerPatient(patientData) {
    try {
      const response = await apiService.postData('api/v1/lab/patient/register', patientData);
      return response.data;
    } catch (error) {
      console.error('Error entering reports:', error);
      throw error;
    }
  }

  async verifyReports() {
    try {
      const response = await apiService.fetchData('/reports/verify');
      return response.data;
    } catch (error) {
      console.error('Error verifying reports:', error);
      throw error;
    }
  }

  async analyzeFinances() {
    try {
      const response = await apiService.fetchData('/finances');
      return response.data;
    } catch (error) {
      console.error('Error analyzing finances:', error);
      throw error;
    }
  }

  async fetchTestList() {
    try {
      const response = await apiService.fetchData('api/v1/lab/labtest');
      return response.data;
    } catch (error) {
      console.error('Error fetching test list:', error);
      throw error;
    }
  }
  async addTest(testData) {
    try {
      const response = await apiService.postData('api/v1/lab/labtest',testData);
      return response.data;
    } catch (error) {
      console.error('Error fetching test list:', error);
      throw error;
    }
  }

  async fetchOrganisationList() {
    try {
      const response = await apiService.fetchData('/organisations');
      return response.data;
    } catch (error) {
      console.error('Error fetching organisation list:', error);
      throw error;
    }
  }

  async fetchEmployeeList() {
    try {
      const response = await apiService.fetchData('api/v1/lab/employees');
      return response.data;
    } catch (error) {
      console.error('Error fetching employee list:', error);
      throw error;
    }
  }
  async addEmployee(employeeData) {
    try {
      const response = await apiService.postData('api/v1/lab/employees',employeeData);
      return response.data;
    } catch (error) {
      console.error('Error adding employee :', error);
      throw error;
    }
  }

  async fetchCenters() {
    try {
      const response = await apiService.fetchData('api/v1/lab/labcenter');
      return response.data;
    } catch (error) {
      console.error('Error fetching center information:', error);
      throw error;
    }
  }

  async addLabCenter(labcenterData) {
    try {
      const response = await apiService.postData('api/v1/lab/labcenter',labcenterData);
      return response.data;
    } catch (error) {
      console.error('Error fetching center information:', error);
      throw error;
    }
  }

  async fetchLabProfile() {
    try {
      const response = await apiService.fetchData('/labprofile');
      return response.data;
    } catch (error) {
      console.error('Error fetching lab profile:', error);
      throw error;
    }
  }
  async fetchBookings = async () => {
    setLoading(true);
    try {
        const data = await specificApis.fetchData(`/bookings?date=${encodeURIComponent(date)}&centerCode=${encodeURIComponent(centerCode)}`);
        setBookings(data);
    } catch (err) {
        setError('Failed to fetch bookings');
        console.error(err);
    } finally {
        setLoading(false);
    }
};
}

export const specificApis = new SpecificApis();
