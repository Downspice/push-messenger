import axios, { AxiosHeaders } from "axios";
import { API_ENDPOINT_BASE } from "@/utils/constants";
import { useSession } from "next-auth/react";

export const getConnectionToken = async (bearerToken: string) => {
  console.log("ive got balllsss:", bearerToken);
  try {
    const response = await axios.get(`https://api.restful-api.dev/objects/7`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    console.log(response.data.id);
    return response.data.id;
  } catch (error) {
    console.error("Error fetching object:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const getMessages = async (bearerToken: string) => {
  console.log("ive got balllsss:", bearerToken);
  try {
    const response = await axios.get(
      `${API_ENDPOINT_BASE}/api/v1/messages/findAll`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    console.log("got all messages", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching object:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const sendMessage = async (bearerToken: string) => {
  console.log("ive got balllsss:", bearerToken);
  try {
    const response = await axios.get(
      `${API_ENDPOINT_BASE}/api/v1/messages/create-message`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    console.log("send this message", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching object:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const publishChannel = async (bearerToken: string) => {
    console.log("ive got balllsss:", bearerToken);
    try {
      const response = await axios.get(
        `${API_ENDPOINT_BASE}/api/v1/messages/create-message`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      console.log("send this message", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching object:", error);
      throw error; // Re-throw the error to handle it elsewhere if needed
    }
  };