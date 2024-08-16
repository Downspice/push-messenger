import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import SignatureCanvas from 'react-signature-canvas';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { RadioGroup } from './ui/radio-group';
import { Radio } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface FormProps {
  formDetails: FormDetail[];
}

const FormComponent: React.FC<FormProps> = ({ formDetails }) => {
  const { handleSubmit, control, setValue } = useForm();

  const sortedFormDetails = [...formDetails].sort((a, b) => parseInt(a.index) - parseInt(b.index));

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const renderField = (field: FormDetail) => {
    switch (field.fieldType) {
      case 'input':
        return (
          <Controller
            key={field.index}
            name={field.key}
            control={control}
            defaultValue={field.defaultValue}
            rules={{ required: field.isRequired }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={field.placeholder}
                required={field.isRequired}
              />
            )}
          />
        );
      case 'textarea':
        return (
          <Controller
            key={field.index}
            name={field.key}
            control={control}
            defaultValue={field.defaultValue}
            rules={{ required: field.isRequired }}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder={field.placeholder}
                required={field.isRequired}
              />
            )}
          />
        );
      case 'checkbox':
        return (
          <Controller
            key={field.index}
            name={field.key}
            control={control}
            defaultValue={field.defaultValue}
            rules={{ required: field.isRequired }}
            render={({ field }) => (
              <Checkbox
                {...field}
                required={field.isRequired}
                label={field.placeholder}
              />
            )}
          />
        );
      case 'radio':
        return (
          <RadioGroup key={field.index} name={field.key} required={field.isRequired}>
            <label>{field.fieldLabel}</label>
            {field.fieldOptions.map((option, index) => (
              <Controller
                key={`${field.key}-${index}`}
                name={field.key}
                control={control}
                defaultValue={field.defaultValue}
                rules={{ required: field.isRequired }}
                render={({ field }) => (
                  <Radio
                    {...field}
                    value={Object.values(option)[0]}
                    label={Object.values(option)[0]}
                  />
                )}
              />
            ))}
          </RadioGroup>
        );
      case 'signature':
        return (
          <Controller
            key={field.index}
            name={field.key}
            control={control}
            defaultValue=""
            rules={{ required: field.isRequired }}
            render={({ field }) => (
              <div>
                <label>{field.fieldLabel}</label>
                <SignatureCanvas
                  penColor="black"
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: 'signature-canvas',
                  }}
                  ref={(ref) => {
                    if (ref) {
                      const canvas = ref.getTrimmedCanvas().toDataURL('image/png');
                      setValue(field.name, canvas);
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    const ref: any = document.querySelector('.signature-canvas');
                    if (ref) {
                      ref.clear();
                      setValue(field.name, '');
                    }
                  }}
                >
                  Clear Signature
                </Button>
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
