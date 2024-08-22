import axios from "axios";
import { API_ENDPOINT_BASE } from "@/utils/constants"; 
import { toast } from "@/components/ui/use-toast";

export const getAllUsers = async (bearerToken: string) => {
  console.log("the Bearer Token:", bearerToken);
  try {
    var response = await axios.get(
      `${API_ENDPOINT_BASE}/api/v1/messages/users/find-all-users`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    console.log("the users are",response.data.data)
    return response.data.data;

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
