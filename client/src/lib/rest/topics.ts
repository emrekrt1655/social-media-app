import { API_URL, apiRequest } from './global/httpRequests';
import { Topic } from '../types/topics';

/**
 * Fetches all topics from the backend.
 * @returns {Promise<Topic[]>} A promise that resolves to an array of topics.
 */
export const getTopics = async (): Promise<Topic[]> => {
  const url = `${API_URL}/topics`;

  try {
    const topics = await apiRequest(url);
    return topics; 
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw new Error('Failed to fetch topics');
  }
};