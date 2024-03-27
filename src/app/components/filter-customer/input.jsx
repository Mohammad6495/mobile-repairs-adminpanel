import { useGeneralInput } from "../generalInputs/regularInput";

export const useSearchCustomer = ({className = '', initialvalue}) =>
useGeneralInput({
  initialvalue,
  className,
  tagType: 'input',
  label: 'جستجو: ',
  isRequired: false,
})