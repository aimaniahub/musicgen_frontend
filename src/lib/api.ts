import axios, { AxiosError } from 'axios';

const API_URL = 'https://solely-generous-molly.ngrok-free.app';  // Updated ngrok URL

interface MusicGenerationResponse {
  audio_path: string;
  error?: string;
}

export const generateMusic = async (prompt: string, duration: number): Promise<MusicGenerationResponse> => {
  try {
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('duration', duration.toString());

    // Make the request with the proper headers
    const response = await axios.post<MusicGenerationResponse>(`${API_URL}/generate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Ensure correct content type for FormData
      },
      // Optionally, add credentials if needed by the backend
      // withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || 'Failed to generate music');
    }
    throw new Error('An unexpected error occurred');
  }
};
