import axios, { AxiosError } from 'axios';

const API_URL = 'https://65f9-34-142-177-236.ngrok-free.app';

interface MusicGenerationResponse {
  audio_path: string;
  error?: string;
}

export const generateMusic = async (prompt: string, duration: number): Promise<MusicGenerationResponse> => {
  try {
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('duration', duration.toString());

    // Set the proper headers to handle CORS in case Flask doesn't do it
    const response = await axios.post<MusicGenerationResponse>(`${API_URL}/generate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // You could add any other custom headers if needed
      },
      // Uncomment the line below if you have CORS issues
      // withCredentials: true, // If your backend needs credentials (cookies, auth)
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || 'Failed to generate music');
    }
    throw new Error('An unexpected error occurred');
  }
};
