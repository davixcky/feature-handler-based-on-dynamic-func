import { useUserProvider, UserRole } from "@/context/userContext";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Text,
  Box,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React from "react";

const UserCard = () => {
  const { user, updateUserRole } = useUserProvider();
  return (
    <Card>
      <CardHeader>
        <Heading size="md">User Report</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Name
            </Heading>
            <Text pt="2" fontSize="sm">
              {user.name}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Role
            </Heading>
            <Text pt="2" fontSize="sm">
              {user.role}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Update role
            </Heading>
            <RadioGroup onChange={(data) => updateUserRole(data as UserRole)} value={user.role}>
              <Stack direction="row">
                <Radio value="admin">Admin</Radio>
                <Radio value="restricted">Restricted</Radio>
                <Radio value="guest">Guest</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export { UserCard };
