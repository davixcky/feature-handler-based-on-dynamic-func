import { Feature, FeatureWrapper } from "@/components/featureWrapper";
import { UserCard } from "@/components/user";
import { useFeature, useFeatureProvider } from "@/context/featureContext";
import { useUserProvider } from "@/context/userContext";
import {
  Button,
  Center,
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useMemo } from "react";

export default function Home() {
  const { getDynamicFeatureByName } = useFeatureProvider();
  const { user } = useUserProvider();
  // const feature3 = useMemo(() => getDynamicFeatureByName("onlyAdminsCanSeeThis"), [user]);
  const feature3 = getDynamicFeatureByName("onlyAdminsCanSeeThis");
  const [feature1, feature2] = useFeature("feature1", "feature2");

  return (
    <>
      <Center>
        <UserCard />
        <Flex direction="column">
          <Tabs>
            <TabList>
              <Tab>Open to all users</Tab>
              {feature1?._type === "static" && feature1.isEnabled && (
                <Tab>Hidden for restricted users</Tab>
              )}
              <Tab
                isDisabled={
                  !(feature2?._type === "static" && feature2.isEnabled)
                }
              >
                Disabled for restricted users
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              {feature1?._type === "static" && feature1.isEnabled && (
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              )}
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Divider />
          <FeatureWrapper
            featureName="feature3"
            alternate={<p>you cannot see this functionality</p>}
          >
            <p>Feature 3</p>
          </FeatureWrapper>
          <Feature
            featureName="feature2"
            render={(isEnabled) =>
              isEnabled ? (
                <h1>The feature is enabled</h1>
              ) : (
                <h1>The feature is disabled</h1>
              )
            }
          />
          {feature3?.validate(user) && <p>Only onlyAdminsCanSeeThis</p>}
          {getDynamicFeatureByName(
            "soloDavidPuedeVerEstoYQueSeaAdmin"
          )?.validate({ role: "admin", nombre: "David" }) && (
            <p>Solo David puede ver esto</p>
          )}
        </Flex>
      </Center>
    </>
  );
}
