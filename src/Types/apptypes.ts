
interface session {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
  accessToken?: string | null;
}

interface payload {
  id?: string | null;
  message: string | null;
  senderId: string | null;
  receiverId: string | null;
  receiver: string | null;
  sender: string | null;
  createdAt: string | null;
}

interface Message {
  id: number;
  message: string;
  messageType: "sender" | "receiver";
  profilePicture?: string;
  timestamp?: number; // Assuming timestamp is in milliseconds since epoch
  senderId?: string;
  receiverId?: string;
  receiver?: null;
  sender?: null;
}

interface FormField {
  id: string;
  index: number;
  fieldLabel: string;
  fieldOptions: string[];
  isRequired: boolean;
  defaultValue: string;
  placeholder: string;
  fieldType: string;
  constraints: string[] | null;
  key: string;
}

interface Form {
  formDetails: { constraints: any[]; id: string; fieldLabel: string; index: number; placeholder: string; defaultValue: string; fieldOptions: optionList[]; isRequired: boolean; fieldType: string; key: string; }[];
  id: string;
  name: string;
  version: number;
  createdBy:string;
  formFields: FormField[];
}


interface FieldOption {
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
}

// interface FormDetail {
//   id: string;
//   isRequired: boolean;
//   fieldOptions: FieldOption[];
//   constraints: string[];
//   fieldLabel: string;
//   placeholder: string;
//   key: string;
//   defaultValue: string;
//   index: string;
//   fieldType: string;

// }

interface FormProps {
  formDetails: FormDetail[];
}

interface optionList {
  [key: string]: string;
}

type FormDetail = {
  id: string;
  fieldLabel: string;
  index: number;
  placeholder: string;
  defaultValue: string;
  fieldOptions: optionList[];
  isRequired: boolean;
  fieldType: string;
  constraints: Option[];
  key: string;
};