"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { createForm } from "@/services/formsSetupApi";
import { useSession } from "next-auth/react";
import axios from "axios";
import { API_ENDPOINT_BASE } from "@/utils/constants";

type FormForm = {
  name: string;
  version: number;
  formDetails: FormFormFields[];
};

interface optionList {
  [key: string]: string;
}

type FormFormFields = {
  fieldLabel: string;
  index: string;
  placeholder: string;
  defaultValue: string;
  fieldOptions: optionList[];
  isRequired: boolean;
  fieldType: string;
  constraints: Option[];
  key: string;
};

export default function DynamicForm() {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;

  const [formDetails, setFormDetails] = useState<FormFormFields[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormForm>();

  const {
    register: fieldRegister,
    handleSubmit: fieldHandleSubmit,
    formState: { errors: fieldErrors },
    control,
    setValue,
    watch,
  } = useForm<FormFormFields>({
    defaultValues: {
      isRequired: true,
      fieldOptions: [],
      constraints: [],
    },
  });

  const OPTIONS: Option[] = [
    { label: "Has to be less than 8 characters", value: "lessThan8" },
    { label: "No Special character is allowed", value: "noSpecial" },
    { label: "Has to be more than 8 characters", value: "moreThan8" },
  ];

  const handleFieldSave = (data: FormFormFields) => {
    setFormDetails([...formDetails, data]);
  };

  const handleMainFormSubmit = async (data: FormForm) => {
    data.formDetails = formDetails.map((field) => ({
      ...field,
      constraints: field.constraints.map((constraint) => constraint.value),
    }));
    console.log("Submitted Data:", data);

    const listDiv = document.getElementById("list");
    if (listDiv) {
      listDiv.innerHTML = JSON.stringify(data, null, 2);
    }

    await createForm(accessToken, data);
  };

  const fieldOptions = watch("fieldOptions");

  return (
    <div className="grid w-full place-items-center">
      <h1>Create Your Form</h1>
      <form
        onSubmit={handleSubmit(handleMainFormSubmit)}
        className="flex-1 w-1/2 space-y-2"
      >
        <Input {...register("name")} placeholder="Form Name" />
        <Input {...register("version")} placeholder="Form Version" />
        <div id="list" className="whitespace-pre-wrap bg-gray-100 p-4 rounded">
          list all fields
        </div>
        <Button className="flex-1 w-full" type="submit">
          Submit
        </Button>
      </form>
      <div className="pt-10">------</div>
      <h1>Add Fields Form</h1>
      <form
        onSubmit={fieldHandleSubmit(handleFieldSave)}
        className="flex-1 w-1/2 space-y-2"
      >
        <div>
          <Label htmlFor="fieldLabel">Field Label</Label>
          <Input {...fieldRegister("fieldLabel")} placeholder="Label" />
        </div>
        <div>
          <Label htmlFor="placeholder">Placeholder</Label>
          <Input {...fieldRegister("placeholder")} placeholder="Placeholder" />
        </div>
        <div>
          <Label htmlFor="key">Key</Label>
          <Input {...fieldRegister("key")} placeholder="Key" />
        </div>
        <div>
          <Label htmlFor="defaultValue">Default Value</Label>
          <Input
            {...fieldRegister("defaultValue")}
            placeholder="Default Value"
          />
        </div>
        <div>
          <Label htmlFor="index">Index</Label>
          <Input {...fieldRegister("index")} type="number" placeholder="Index" />
        </div>
        <div>
          <Label htmlFor="fieldType">Field Type</Label>
          <Controller
            name="fieldType"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ""}
                onValueChange={(newValue) =>
                  setValue("fieldType", newValue, { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose the field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="input">Input</SelectItem>
                  <SelectItem value="dropdown">Dropdown</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="radio">Radio</SelectItem>
                  <SelectItem value="textarea">Textarea</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <Label htmlFor="constraints">Constraints</Label>
          <Controller
            name="constraints"
            control={control}
            render={({ field }) => (
              <MultipleSelector
                defaultOptions={OPTIONS}
                placeholder="Constraints"
                value={field.value}
                onChange={(selectedOptions) =>
                  
                  setValue("constraints", selectedOptions, {
                    shouldValidate: true,
                  })
                }
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    No results found.
                  </p>
                }
              />
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fieldOptions">Enter your options</Label>
          <div className="border-1 space-y-2 border-solid border p-2 rounded-md">
            {fieldOptions.map((option, index) => {
              const key = Object.keys(option)[0];
              return (
                <div key={index} className="flex items-center space-x-2">
                  <span>{`Option ${index + 1}`}</span>
                  <Input
                    value={option[key]}
                    onChange={(e) => {
                      const updatedOptions = [...fieldOptions];
                      updatedOptions[index] = { [key]: e.target.value };
                      setValue("fieldOptions", updatedOptions, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const updatedOptions = fieldOptions.filter(
                        (_, i) => i !== index
                      );
                      setValue("fieldOptions", updatedOptions, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                const newIndex = fieldOptions.length + 1;
                const newOption = { [`option${newIndex}`]: "" };
                setValue("fieldOptions", [...fieldOptions, newOption], {
                  shouldValidate: true,
                });
              }}
            >
              Add Option
            </Button>
          </div>
        </div>
        <div className="flex items-center h-9">
          <Label htmlFor="isRequired">Required</Label>
          <Controller
            name="isRequired"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={(value) =>
                  setValue("isRequired", value, { shouldValidate: true })
                }
              />
            )}
          />
        </div>
        <div className="grid grid-cols-5 place-content-between w-full">
          <Button className="col-span-2" type="submit">
            Save field
          </Button>
          <div className="col-span-1"></div>
          <Button variant={"outline"} className="col-span-2" type="reset">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
