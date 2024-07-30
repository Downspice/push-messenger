"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type FormFields = {
  name: string;
  fields: string;
};

export default function DynamicForm() {
  //toast
  const { toast } = useToast();
  const t: () => void = () => {
    toast({
      description: "Your message has been sent.",
    });
  };

  const form = useForm<FormFields>();
  // multiselect
  const [value, setValue] = useState([]);

  return (
    <div className="grid  w-full  place-items-center ">
      <h1>Create Your Form</h1>

      <form className="flex-1 w-1/2 space-y-2">
        <Input {...form.register("name")} placeholder="Name" />
        <Input {...form.register("fields")} placeholder="Fields" />

        <Button className="flex-1 w-full" type="submit">
          Submit
        </Button>
      </form>
      <div className="pt-10">------</div>

      <h1>Add Fields Form</h1>
      <form className="flex-1 w-1/2 space-y-2">
        <div>
          <Label htmlFor="label">Field Label</Label>
          <Input {...form.register("name")} placeholder="Label" />
        </div>
        <div>
          <Label htmlFor="placeholder">Placeholder</Label>
          <Input placeholder="Placeholder" />
        </div>
        <div>
          <Label htmlFor="key">Key</Label>
          <Input placeholder="Key" />
        </div>
        <div>
          <Label htmlFor="defaultKey">Default Value</Label>
          <Input placeholder="Default Value" />
        </div>
        <div>
          <Label htmlFor="index">Index</Label>
          <Input type="number" placeholder="Index" />
        </div>
        <div>
          <Label htmlFor="fieldType">Field Type</Label>
          <Select>
            <SelectTrigger className="">
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
        </div>
        {/* Constraints */}
        <div>
          <Label htmlFor="fieldType">Field Type</Label>
          <MultiSelector values={value} onValuesChange={setValue}>
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder="Constraints" />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                <MultiSelectorItem value={"lessThan8"}>
                  Has to be less than 8 characters
                </MultiSelectorItem>
                <MultiSelectorItem value={"noSpecial"}>
                  No Special character is allowed
                </MultiSelectorItem>
                <MultiSelectorItem value={"moreThan8"}>
                  Has to be more than 8 characters
                </MultiSelectorItem>
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
        </div>

        {/* options */}
        <div className="space-y-2 ">
          <div>Enter your your options</div>
          <div className="border-1  space-y-2 border-solid  border p-2 rounded-md">
            <div className="flex ">
              <div className="flex items-end w-28">Option 1</div>
              <Input className="w-full" />
            </div>

            <div>
              <Button className="w-full">Add Option</Button>
            </div>
          </div>
        </div>
        <div className="flex items-center h-9">
          <div>
            <Label htmlFor="required">Required</Label>
          </div>
          <div className="flex items-center pl-2">
            <Switch id="required" />
          </div>
        </div>
        <div className="grid grid-cols-5 place-content-between w-full">
          <Button className=" col-span-2 " type="reset">
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
