import React from "react";
import { useForm, Controller } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup } from "./ui/radio-group";
import { Radio } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface FormProps {
  formDetails: FormDetail[];
}

const FormComponent: React.FC<FormProps> = ({ formDetails }) => {
  const { handleSubmit, control, setValue } = useForm();

  const sortedFormDetails = [...formDetails].sort(
    (a, b) => parseInt(a.index) - parseInt(b.index)
  );

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const renderField = (field: FormDetail) => {
    switch (field.fieldType) {
      case "input":
        return (
          <Controller
            key={field.index}
            name={field.key}
            control={control}
            render={({ field }) => <Input value={field.value} />}
          />
        );
      case "textarea":
        return (
          <Controller
            key={field.index}
            name={field.key}
            control={control}
            render={({ field }) => <Textarea value={field.value} />}
          />
        );
      case "checkbox":
        return (
          <Controller
            key={field.index}
            name={field.key}
            control={control}
            render={({ field }) => <Input {...field} value={field.value} />}
          />
        );
      case "radio":
        return (
          <Controller
            key={`${field.key}`}
            name={field.key}
            control={control}
            render={({ field }) => <Input value={field.value} />}
          />
        );
      case "signature":
        return (
          <Controller
            key={field.index}
            name={field.key}
            control={control}
            render={({ field }) => (
              <div>
                <SignatureCanvas
                  penColor="black"
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: "signature-canvas",
                  }}
                  ref={(ref) => {
                    if (ref) {
                      const canvas = ref
                        .getTrimmedCanvas()
                        .toDataURL("image/png");
                      setValue(field.name, canvas);
                    }
                  }}
                />
              </div>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {sortedFormDetails.map((field) => (
        <div key={field.index} className="form-group">
          <label>{field.fieldLabel}</label>
          {renderField(field)}
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FormComponent;
