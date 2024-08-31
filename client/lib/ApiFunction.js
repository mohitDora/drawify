import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { toast } from 'sonner';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

// User API Calls

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/`, userData);
    toast("Authentication Successful")
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// Board API Calls

export const createBoard = async (boardData) => {
  try {
    const response = await axios.post(`${API_URL}/boards`, boardData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // revalidatePath("/dashboard")
    return response.data;
  } catch (error) {
    console.error('Error creating board:', error);
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const fetchBoards = async (uid) => {
  try {
    const response = await axios.get(`${API_URL}/boards/${uid}`);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const fetchBoardById = async (boardId) => {
  try {
    const response = await axios.get(`${API_URL}/boards/board/${boardId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const addUserToBoard = async (boardId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/boards/${boardId}/addUser`, { userId });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const updateBoard = async (boardId, boardData) => {
    try {
      const response = await axios.put(`${API_URL}/boards/${boardId}`, boardData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network Error');
    }
  };
