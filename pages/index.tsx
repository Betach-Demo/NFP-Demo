import { LockIcon } from "@chakra-ui/icons";
import { Center, Box, Heading, Button, Flex, Image } from "@chakra-ui/react";
import { Formik, FormikProps, Form } from "formik";
import type { NextPage } from "next";
import ChoiceInput from "../components/ChoiceInput";
import CustomNumberInput from "../components/NumberInput";
import SwitchInput from "../components/SwitchInput";
import TextInput from "../components/TextInput";
import { donate } from "../services/donation";
import { donationChoices } from "../utils/constants";
import { donationSchema } from "../utils/validation";

type DonationValues = {
  firstName: string;
  lastName: string;
  email: string;
  donationAmount: string | number;
  donationType: string;
};

const Home: NextPage = () => {
  return (
    <Center
      h="100vh"
      w="100%"
      bg="linear-gradient(to top right, #4a0d66 0%, #359a8e 100%)"
    >
      <Box w="50%" h="92vh" bg="white" borderRadius="10px" p="2rem">
        <Flex justifyContent="space-between" p="1rem" py="1rem">
          <Image src="/alz.jpg" alt="ALZ ORG" />
          <Heading
            as="h2"
            fontSize="0.9rem"
            fontWeight="normal"
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ gap: "1rem" }}
          >
            <LockIcon />
            Secure Donation
          </Heading>
        </Flex>

        <Formik
          validationSchema={donationSchema}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            donationAmount: "",
            donationType: "payment",
          }}
          onSubmit={async (values, actions) => {
            const { donationAmount, ...rest } = values;
            const submissionValues: any = { ...rest };
            submissionValues.donationAmount = parseFloat(donationAmount);
            const result = await donate(submissionValues);
            actions.setSubmitting(false);
            actions.resetForm();
            return window.open(result.data.redirectUrl, "_blank");
          }}
        >
          {(props: FormikProps<DonationValues>) => {
            return (
              <Form
                style={{
                  padding: "0",
                  display: "flex",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <SwitchInput
                  name="donationType"
                  p="1rem"
                  w="100%"
                  justifyContent="center"
                  alignItems="center"
                />
                <ChoiceInput
                  name="donationAmount"
                  choices={donationChoices}
                  p="1rem"
                  w="100%"
                />
                <CustomNumberInput
                  name="donationAmount"
                  label="Donation Amount"
                  p="1rem"
                />
                <TextInput
                  name="firstName"
                  type="text"
                  label="First Name"
                  w="50%"
                  p="1rem"
                />
                <TextInput
                  name="lastName"
                  type="text"
                  label="Last Name"
                  w="50%"
                  p="1rem"
                />
                <TextInput
                  name="email"
                  type="email"
                  label="Email"
                  w="50%"
                  p="1rem"
                />

                <Center w="100%">
                  <Button
                    type="submit"
                    mx="auto"
                    my="2rem"
                    bgColor="#359a8e"
                    color="white"
                    px="2rem"
                    py="1.5rem"
                    isLoading={props.isSubmitting}
                  >
                    DONATE
                  </Button>
                </Center>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Center>
  );
};

export default Home;
