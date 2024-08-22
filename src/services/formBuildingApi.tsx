import { toast } from "@/components/ui/use-toast";
import { API_ENDPOINT_BASE } from "@/utils/constants";
import axios from "axios";


export const getForms = async (bearerToken: string) => {
  // console.log("the Bearer Token..........:", bearerToken);
  
  if(bearerToken){
    try {
      const response = await axios.get(
        `${API_ENDPOINT_BASE}/api/v1/messages/findAllForms`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      const forms = response.data;
      // console.log("got all forms", forms);
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
  }
  
};

export const getFormById = async (bearerToken: string, id:any) => {
  console.log("the Bearer Token..........:", bearerToken);
 if(bearerToken){
  try {
    const response = await axios.get(
      `${API_ENDPOINT_BASE}/api/v1/messages/form/${id}`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    const form = response.data;
    console.log("got all forms", form);
    return response.data;
  } catch (error) {
    toast({
      variant: "destructive",
      title: `${error.code}`,
      description: `${error.message}`,
      type: "foreground",
      duration: 1000,
    });
    console.error("Error fetching object:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
 }
  
};

export const getAllLOVCategories = async (bearerToken: string) => {
  console.log("the Bearer Token..........:", bearerToken)
  if(bearerToken){
    try {
      const response = await axios.get(
        `${API_ENDPOINT_BASE}/api/v1/messages/find-all-categories`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      const lov = response.data.data;
      console.log("got all LOV", lov);
      return response.data;
    } catch (error:any) {
      toast({
        variant: "destructive",
        title: `${error.code}`,
        description: `${error.message}`,
        type: "foreground",
        duration: 1000,
      });
      console.error("Error fetching object:", error);
      throw error; // Re-throw the error to handle it elsewhere if needed
    }
  
  }
  
};

export const createLOV = async (bearerToken: string, payload: any) => {
  // console.log("the Bearer Token..........:", bearerToken);
  try {
    const response = await axios.post(
      `${API_ENDPOINT_BASE}/api/v1/messages/create-category`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    console.log("Form submitted successfully", response.data);
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

export const getSubmittedForms = async (bearerToken: string) => {
  console.log("the Bearer Token..........:", bearerToken)
  if(bearerToken){
    try {
      const response = await axios.get(
        `${API_ENDPOINT_BASE}/api/v1/messages/find-all-filled-forms`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      const answer = response;
      console.log("got all answers", answer);
      return response.data;
    } catch (error:any) {
      toast({
        variant: "destructive",
        title: `${error.code}`,
        description: `${error.message}`,
        type: "foreground",
        duration: 1000,
      });
      console.error("Error fetching object:", error);
      throw error; // Re-throw the error to handle it elsewhere if needed
    }
  
  }
};

export const getSubmittedFormById = async (bearerToken: string, id:any) => {
  console.log("the Bearer Token..........:", bearerToken);
 if(bearerToken){
  try {
    const response = await axios.get(
      `${API_ENDPOINT_BASE}/api/v1/messages/form/${id}`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    const form = response.data;
    console.log("got this form", form);
    return response.data;
  } catch (e:any) {
    toast({
      variant: "destructive",
      title: `${e.code}`,
      description: `${e.message}`,
      type: "foreground",
      duration: 1000,
    });
    console.error("Error fetching object:", e);
    throw e; // Re-throw the error to handle it elsewhere if needed
  }
 }
  
};