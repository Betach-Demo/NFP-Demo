import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface ICustomNumberInputProps extends ChakraProps {
  label: string;
  name: string;
}

const CustomNumberInput: React.FunctionComponent<ICustomNumberInputProps> = ({
  label,
  name,
  ...chakraProps
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)} {...chakraProps}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <NumberInput
        value={field.value}
        precision={0}
        step={1}
        onChange={(e: any) => {
          helpers.setValue(e);
        }}
      >
        <NumberInputField
          {...field}
          name={name}
          bg="#fafafa"
          boxShadow="inset 0px 1px 3px 0px rgb(0 0 0 / 8%)"
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {!!meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default CustomNumberInput;
