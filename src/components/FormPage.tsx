import React, { useEffect, useState } from 'react';
import FormComponent from '../components/FormComponent';
import { getFormById } from '@/services/formBuildingApi';
import { useSession } from 'next-auth/react';

const FormPage: React.FC<{ id: string }> = ({ id }) => {
    const { data: session, status } = useSession();
    const accessToken = session?.accessToken;
    const [formDetails, setFormDetails] = useState<FormDetail[]>([]);


    const printDetails = async (id: any) => {
        const response = await getFormById(accessToken, id);
        const data = await response.data;
        const formfields = await data.formDetails;
    
        if (formfields) {
            return formfields;
        }
        return [];
    };

    useEffect(() => {
        const fetchFormDetails = async () => {
            const details = await printDetails(id);
            setFormDetails(details);
        };

        fetchFormDetails();
    }, [id]);

    return (
        <div id="formView">
            <h1>Form View</h1>
            {formDetails.length > 0 ? (
                <FormComponent formDetails={formDetails} />
            ) : (
                <p>Loading form...</p>
            )}
        </div>
    );
};

export default FormPage;
