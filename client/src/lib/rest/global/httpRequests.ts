const API_URL = ' http://localhost:8000/api';

const apiRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in API request:', error);
    throw error;
  }
};

export { API_URL, apiRequest };
