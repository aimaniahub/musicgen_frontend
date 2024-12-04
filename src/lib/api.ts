import axios, { AxiosError } from 'axios';

const API_URL = 'http://127.0.0.1:5000';

interface MusicGenerationResponse {
  audio_path: string;
  error?: string;
}

export const generateMusic = async (prompt: string, duration: number): Promise<MusicGenerationResponse> => {
  try {
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('duration', duration.toString());

    const response = await axios.post<MusicGenerationResponse>(`${API_URL}/generate`, formData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || 'Failed to generate music');
    }
    throw new Error('An unexpected error occurred');
  }
};