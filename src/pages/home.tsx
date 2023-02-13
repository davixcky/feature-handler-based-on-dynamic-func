import Card from "@/components/card";
import { UserCard } from "@/components/user";
import { withUseFeature } from "@/context/featureContext";

const homePage = () => {
  return (
    <div>
      <UserCard />
      <h1>Home page</h1>
      <Card />
    </div>
  );
};

export default homePage;
