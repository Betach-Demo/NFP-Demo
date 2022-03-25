import {
  Box,
  Button,
  ChakraProps,
  Flex,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import * as React from "react";

interface ISwitchInputProps extends ChakraProps {
  name: string;
}

const SwitchInput: React.FunctionComponent<ISwitchInputProps> = ({
  name,
  ...chakraProps
}) => {
  const [field, meta, helpers] = useField(name);
  return (
    <Box {...chakraProps}>
      <Flex justify="cneter" align="center" borderRadius="5px" w="100%">
        <Button
          value="payment"
          isActive={field.value === "payment"}
          _active={{
            bgColor: "#359a8e",
            color: "white",
          }}
          borderRadius="5px 0 0 5px"
          w="50%"
          onClick={(e: any) => helpers.setValue(e.target.value)}
        >
          Give Once
        </Button>
        <Button
          value="subscription"
          isActive={field.value === "subscription"}
          _active={{
            bgColor: "#359a8e",
            color: "white",
          }}
          borderRadius="0 5px 5px 0"
          w="50%"
          onClick={(e: any) => helpers.setValue(e.target.value)}
        >
          ❤️ Monthly
        </Button>
      </Flex>
      {meta.touched && !meta.error && (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      )}
    </Box>
  );
};

export default SwitchInput;
