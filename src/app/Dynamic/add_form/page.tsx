"use client";
import React, { useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Edit2 } from "lucide-react";
import { createForm } from "@/services/formsSetupApi";
import { getAllLOVCategories } from "@/services/formBuildingApi";

interface FormDetail {
  fieldLabel: string;
  fieldType: string;
  isRequired: boolean;
  fieldOptions?: string;
  constraints?: Option[];
  defaultValue?: string;
  placeholder?: string;
  index?: number;
  key?: string;
}

interface Form {
  name: string;
  version: string;
  category: string;
  department: string;
  formDetails: FormDetail[];
}

interface LovCategory {
  id: string;
  name: string;
  isEnabled: string;
  description: string;
}

export default function DynamicForm() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const [lovCategory, setlovCategories] = useState<LovCategory[]>([]);
  useEffect(() => {
    const lov = async () => {
      if (session?.accessToken) {
        const accessToken = session.accessToken;
        localStorage.setItem("localbearer", accessToken);
        const bearer = localStorage.getItem("localbearer");
        const options = async (accessToken: any) => {
          await getAllLOVCategories(accessToken);
        };
        const lovCategories: any = await options(bearer);

        setlovCategories(lovCategories);
        return lov;
      }
    };
    lov();
  });

  const [formDetails, setFormDetails] = useState<FormDetail[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const {
    register: fieldRegister,
    handleSubmit: fieldHandleSubmit,
    control,
    setValue,
    watch,
    reset,
  } = useForm<FormDetail>({
    defaultValues: {
      isRequired: true,
      constraints: [],
    },
  });

  const OPTIONS: Option[] = [
    { label: "Has to be less than 8 characters", value: "LESS_THAN_8" },
    { label: "No Special character is allowed", value: "NO_SPECIAL_CHAR" },
    { label: "Has to be more than 8 characters", value: "MORE_THAN_8" },
  ];

  const handleFieldSave = (data: FormDetail) => {
    if (editIndex !== null) {
      const updatedFields = [...formDetails];
      updatedFields[editIndex] = data;
      setFormDetails(updatedFields);
      setEditIndex(null);
    } else {
      setFormDetails([...formDetails, data]);
    }
    reset();
  };

  const handleFieldEdit = (index: number) => {
    const fieldToEdit = formDetails[index];
    Object.keys(fieldToEdit).forEach((key) =>
      setValue(key as keyof FormDetail, fieldToEdit[key as keyof FormDetail])
    );
    setEditIndex(index);
  };

  const handleFieldDelete = (index: number) => {
    const updatedFields = formDetails.filter((_, i) => i !== index);
    setFormDetails(updatedFields);
  };

  const handleMainFormSubmit = async (data: Form) => {
    data.formDetails = formDetails.map((field) => ({
      ...field,
      constraints: field.constraints?.map((constraint) => constraint.value),
    }));
    console.log("Submitted Data:", data);
    await createForm(accessToken, data);
  };

  const fieldType = watch("fieldType");
  const fieldOptions = watch("fieldOptions");

  const shouldShowPlaceholderDefaultValueConstraints =
    fieldType === "input" || fieldType === "textarea";
  const shouldShowOptions =
    fieldType !== "input" &&
    fieldType !== "textarea" &&
    fieldType !== "signature";

  return (
    <div className="grid w-full place-items-center">
      <h1>Create Your Form</h1>
      <form
        onSubmit={handleSubmit(handleMainFormSubmit)}
        className="flex-1 w-1/2 space-y-2"
      >
        <Input
          {...register("name", { required: true })}
          placeholder="Form Name"
        />
        {errors.name && (
          <span className="text-destructive">This field is required</span>
        )}
        <Input {...register("version")} placeholder="Form Version" />
        <Input placeholder="Category" />
        <Input placeholder="Department" />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex-1 w-full">Add Field</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Field</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <form
              onSubmit={fieldHandleSubmit(handleFieldSave)}
              className="flex-1 w-full space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="cols-span-1">
                  <div>
                    <Label htmlFor="fieldLabel">Field Label</Label>
                    <Input
                      {...fieldRegister("fieldLabel")}
                      placeholder="Label"
                    />
                  </div>
                  <div>
                    <Label htmlFor="index">Index</Label>
                    <Input
                      {...fieldRegister("index")}
                      type="number"
                      placeholder="Index"
                    />
                  </div>
                  {shouldShowPlaceholderDefaultValueConstraints && (
                    <>
                      <div>
                        <Label htmlFor="placeholder">Placeholder</Label>
                        <Input
                          {...fieldRegister("placeholder")}
                          placeholder="Placeholder"
                        />
                      </div>
                      {shouldShowOptions && (
                        <div className="space-y-2">
                          <Label htmlFor="fieldOptions">
                            Enter your options
                          </Label>
                          <div className="border-1 space-y-2 border-solid border p-2 rounded-md">
                            {fieldOptions.map((option, index) => {
                              const key = Object.keys(option)[0];
                              return (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <span>{`Option ${index + 1}`}</span>
                                  <Input
                                    value={option[key]}
                                    onChange={(e) => {
                                      const updatedOptions = [...fieldOptions];
                                      updatedOptions[index] = {
                                        [key]: e.target.value,
                                      };
                                      setValue("fieldOptions", updatedOptions, {
                                        shouldValidate: true,
                                      });
                                    }}
                                  />
                                  <Button
                                    size="icon"
                                    type="button"
                                    variant="destructive"
                                    onClick={() => {
                                      const updatedOptions =
                                        fieldOptions.filter(
                                          (_, i) => i !== index
                                        );
                                      setValue("fieldOptions", updatedOptions, {
                                        shouldValidate: true,
                                      });
                                    }}
                                  >
                                    <Trash2 />
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
                                setValue(
                                  "fieldOptions",
                                  [...fieldOptions, newOption],
                                  {
                                    shouldValidate: true,
                                  }
                                );
                              }}
                            >
                              Add Option
                            </Button>
                          </div>
                        </div>
                      )}
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
                    </>
                  )}
                  {!shouldShowPlaceholderDefaultValueConstraints && (
                    <>
                      <Label htmlFor="fieldOptions">Option Category</Label>
                      <Controller
                        name="fieldOptions"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value || ""}
                            onValueChange={(newValue) =>
                              setValue("fieldType", newValue, {
                                shouldValidate: true,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choose the field Option category" />
                            </SelectTrigger>
                            <SelectContent>
                              {lovCategory.map((lovCategories) => (
                                <div key={lovCategories.id}>
                                  <SelectItem value={lovCategories.id}>
                                    {lovCategories.name}
                                  </SelectItem>
                                </div>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </>
                  )}
                </div>

                <div className="cols-span-1">
                  <div>
                    <Label htmlFor="fieldType">Field Type</Label>
                    <Controller
                      name="fieldType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value || ""}
                          onValueChange={(newValue) =>
                            setValue("fieldType", newValue, {
                              shouldValidate: true,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose the field type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="input">Input</SelectItem>
                            <SelectItem value="textarea">Textarea</SelectItem>
                            <SelectItem value="dropdown">Dropdown</SelectItem>
                            <SelectItem value="checkbox">Checkbox</SelectItem>
                            <SelectItem value="radio">Radio</SelectItem>
                            <SelectItem value="signature">Signature</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
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
                <DialogClose asChild>
                  <Button
                    className="col-span-2"
                    type="submit"
                    onClick={() => reset()}
                  >
                    {editIndex !== null ? "Update Field" : "Save Field"}
                  </Button>
                </DialogClose>
                <div className="col-span-1"></div>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      reset();
                      setEditIndex(null);
                    }}
                    className="col-span-2"
                    type="reset"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          {formDetails.map((field, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-md"
            >
              <div>
                <p>
                  <strong>Label:</strong> {field.fieldLabel}
                </p>
                <p>
                  <strong>Type:</strong> {field.fieldType}
                </p>
                <p>
                  <strong>Required:</strong> {field.isRequired ? "Yes" : "No"}
                </p>
                {field.placeholder && (
                  <p>
                    <strong>Placeholder:</strong> {field.placeholder}
                  </p>
                )}
                {field.defaultValue && (
                  <p>
                    <strong>Default Value:</strong> {field.defaultValue}
                  </p>
                )}
                {field.constraints?.length > 0 && (
                  <p>
                    <strong>Constraints:</strong>{" "}
                    {field.constraints.map((c) => c.label).join(", ")}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <Button size="icon" onClick={() => handleFieldEdit(index)}>
                  <Edit2 />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleFieldDelete(index)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button className="flex-1 w-full" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
