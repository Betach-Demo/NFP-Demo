import {
  Box,
  Button,
  ChakraProps,
  Flex,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";
import { Choice } from "../types/formField";

interface IChoiceInputProps extends ChakraProps {
  name: string;
  choices: Choice[];
}

const ChoiceInput: React.FunctionComponent<IChoiceInputProps> = ({
  name,
  choices,
  ...chakraProps
}) => {
  const [field, meta, helpers] = useField(name);
  return (
    <Flex {...chakraProps}>
      <Flex w="100%" flexWrap="wrap" style={{ gap: "1rem" }}>
        {choices.map((c) => (
          <Button
            key={c.value}
            value={c.value}
            isActive={field.value === c.value}
            w="calc((100% - 2rem)/3)"
            _active={{
              bgColor: "#359a8e",
              color: "white",
            }}
            onClick={(e: any) => {
              helpers.setValue(e.target.value);
            }}
          >
            {c.label}
          </Button>
        ))}
      </Flex>
      {!!meta.error && meta.touched && (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      )}
    </Flex>
  );
};

export default ChoiceInput;
