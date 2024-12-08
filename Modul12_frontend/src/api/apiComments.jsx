import axios from "axios";

const BASE_URL = "http://localhost:8000/api"; 

export const getComments = async (contentId) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/contents/${contentId}/comments`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

export const addComment = async (contentId, commentText) => {
    try {
        console.log("Sending comment:", commentText);  
        const response = await axios.post(`${BASE_URL}/contents/${contentId}/comments`, {
            text: commentText,
        });
        console.log("API response:", response.data);  
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw new Error("Gagal menambahkan komentar");
    }
};


export const editComment = async (commentId, updatedComment) => {
    try {
        const response = await axios.put(`${BASE_URL}/comments/${commentId}`, { text: updatedComment });
        return response.data;
    } catch (error) {
        console.error("Error editing comment:", error);
        throw error;
    }
};

export const deleteComment = async (commentId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
};


