import axios, { AxiosHeaders } from "axios";
import { API_ENDPOINT_BASE } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

export const getConnectionToken = async (bearerToken: string) => {
  console.log("the Bearer Token:", bearerToken);
  try {
    var response = await axios.get(
      `${API_ENDPOINT_BASE}/api/v1/messages/credentials`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    localStorage.setItem("CENTRIFUGO_ACCESS_TOKEN", response.data.token);
    return response.data.token;
  } catch (e) {
    toast({
      title: "You submitted the following values:",
      description: `${e}`,
      type: "foreground",
      duration: 5000,
    });
    console.error("Error fetching object:", e);
    throw e; // Re-throw the error to handle it elsewhere if needed
  }
};

export const getMessages = async (bearerToken: string) => {
  console.log("the Bearer Token..........:", bearerToken);
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
    toast({
      variant: "destructive",
      title: "You submitted the following values:",
      description: `${error}`,
      type: "foreground",
      duration: 5000,
    });
    console.error("Error fetching object:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const sendMessage = async (bearerToken: string, message: any) => {
  console.log("the Bearer Token..........:", bearerToken);
  try {
    const response = await axios.post(
      `${API_ENDPOINT_BASE}/api/v1/messages/create-message`,
      { message },
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
  console.log("the Bearer Token..........:", bearerToken);
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
