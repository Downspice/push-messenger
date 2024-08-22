"use client";
import FormComponent from "@/components/FormComponent";
import { toast } from "@/components/ui/use-toast";
import {
  getFormById,
  getForms,
} from "@/services/formBuildingApi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ViewForm() {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;

  const [forms, setForms] = useState<Form[]>([]);
  const [formDetails, setFormDetails] = useState<any[]>([]);

  const getFilledForms = async () => {
    await getFormAnswers(accessToken);
  };
  getFilledForms();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await getForms(accessToken);
        const data = await response.data;
        setForms(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchForms();
  }, [accessToken]);

  const printDetails = async (id: any) => {
    const response = await getFormById(accessToken, id);
    const data = await response.data;
    const formfields = await data.formDetails;
    if (formfields) {
      return formfields;
    }
    return [];
  };

  const handleFormClick = async (id: any) => {
    const formfields = await printDetails(id);
    setFormDetails(formfields);

    toast({
      variant: "default",
      title: "Form loaded",
      description: "You can now view the form details.",
      duration: 3000,
    });
  };

  return (
    <>
      <div>works</div>
      <div className="flex overflow-auto px-2 space-x-2 pb-8 border-b-2">
        {forms.map((form) => (
          <div
            key={form.id}
            onClick={() => handleFormClick(form.id)}
            className="p-3 border card min-w-56 "
          >
            <a>
              <h3>{form.name}</h3>
              <h3>{form.version}</h3>
              <h3>{form.createdBy}</h3>
            </a>
          </div>
        ))}
      </div>
      <div id="formView " className=" flex place-content-center w-1/2">
        {formDetails.length > 0 ? (
          <FormComponent formDetails={formDetails} />
        ) : (
          <p>Select a form to view details</p>
        )}
      </div>
    </>
  );
}
