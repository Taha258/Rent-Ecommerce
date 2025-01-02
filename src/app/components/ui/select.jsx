import React from "react";
import { ChevronDown } from "lucide-react";

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        className="w-full bg-[#F6F7F9] text-gray-900 rounded-md py-2 pl-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
  );
});
Select.displayName = "Select";

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className="flex items-center justify-between w-full bg-[#F6F7F9] text-gray-900 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  >
    {children}
    <ChevronDown className="h-5 w-5 text-gray-400" />
  </button>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef(({ className, children, ...props }, ref) => (
  <span ref={ref} {...props}>
    {children}
  </span>
));
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <ul
    ref={ref}
    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
    {...props}
  >
    {children}
  </ul>
));
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <li
    ref={ref}
    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
    {...props}
  >
    {children}
  </li>
));
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
