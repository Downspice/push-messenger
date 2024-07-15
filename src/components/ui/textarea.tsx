import * as React from "react";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ onChange, className, ...props }, ref) => {
    const [message, setMessage] = useState("");

    // Function to handle textarea input change
    const handleTextareaChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setMessage(event.target.value);
      autoResizeTextarea(event.target);
    };

    const autoResizeTextarea = (element: HTMLTextAreaElement) => {
      // Reset height to 0 to shrink the textarea in case text is deleted
      element.style.height = "0";
      // Set the correct height based on the scroll height
      element.style.height = `${element.scrollHeight}px`;
    };

    return (
      <textarea
        onChange={handleTextareaChange}
        className={cn(
          "flex  min-h-10 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-primary placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring focus-visible:ring-ring focus-visible:ring-offset disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        rows={1}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
