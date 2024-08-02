import axios, { AxiosHeaders } from "axios";
import { API_ENDPOINT_BASE } from "@/utils/constants";
import { toast, useToast } from "@/components/ui/use-toast";

export const getform = async (bearerToken: string, formId: any) => {
  console.log("the Bearer Token on get form:", bearerToken);
  try {
    var response = await axios.get(
      `${API_ENDPOINT_BASE}/api/v1/messages/forms/${formId}`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    return response.data;
  } catch (e) {
    toast({
      variant: "destructive",
      title: "You submitted the following values:",
      description: `${e}`,
      type: "foreground",
      duration: 5000,
    });
    console.error("Error fetching object:", e);

    throw e; // Re-throw the error to handle it elsewhere if needed
  }
};

export const createForm = async (bearerToken: string, payload: any) => {
  // console.log("the Bearer Token..........:", bearerToken);
  try {
    const response = await axios.post(
      `${API_ENDPOINT_BASE}/api/v1/messages/create-form`,
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
