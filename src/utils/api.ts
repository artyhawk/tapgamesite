const CORS_PROXY = 'https://corsproxy.io/?';
const API_BASE_URL = 'https://mtgame.ru/api/v1';

interface ApiError extends Error {
  status?: number;
}

export const fetchWithCors = async <T>(endpoint: string): Promise<T> => {
  try {
    // First try direct request (for local development)
    try {
      const directResponse = await fetch(`${API_BASE_URL}${endpoint}`);
      if (directResponse.ok) {
        return await directResponse.json();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('Direct request failed, trying with CORS proxy:', err.message);
      }
    }

    // If direct request fails, try with CORS proxy
    const proxyResponse = await fetch(`${CORS_PROXY}${API_BASE_URL}${endpoint}`, {
      headers: {
        'Origin': 'https://tapgame.kz',
      },
    });

    if (!proxyResponse.ok) {
      const error: ApiError = new Error(`HTTP error! status: ${proxyResponse.status}`);
      error.status = proxyResponse.status;
      throw error;
    }

    return await proxyResponse.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error fetching data:', err.message);
    } else {
      console.error('An unknown error occurred');
    }
    throw err;
  }
};
