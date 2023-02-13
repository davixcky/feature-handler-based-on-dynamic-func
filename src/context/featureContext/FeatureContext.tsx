import { type } from "os";
import React, { createContext } from "react";
import { User, UserRole } from "../userContext";
import { isSuperAdmin } from "./rules";

export type Feature = {
  name: string;
} & (StaticFeature | DynamicFeature);

type DynamicFeature = {
  _type: "dynamic";
  validate: (args: any) => boolean;
};

type StaticFeature = {
  _type: "static";
  isEnabled: boolean;
};

type FeatureWithStaticType = Feature & StaticFeature;
type FeatureWithDynamicType = Feature & DynamicFeature;

export type FeatureContextType = {
  features: Feature[];
  getFeatureByName: (name: string) => FeatureWithStaticType | undefined;
  getDynamicFeatureByName: (name: string) => FeatureWithDynamicType | undefined;
};

const FeatureContext = createContext<FeatureContextType>(
  {} as FeatureContextType
);

export type FeatureProviderProps = {
  children: React.ReactNode;
};

export enum FeatureNames {
  feature1 = "feature1",
  feature2 = "feature2",
  onlyAdminsCanSeeThis = "onlyAdminsCanSeeThis",
  onlyAdminsAndRestrictedCanSeeThis = "onlyAdminsAndRestrictedCanSeeThis",
}

const FeatureProvider: React.FC<FeatureProviderProps> = ({ children }) => {
  const features: Feature[] = [
    {
      name: "feature1",
      _type: "static",
      isEnabled: true,
    },
    {
      name: "feature2",
      _type: "static",
      isEnabled: false,
    },
    {
      name: "feature3",
      _type: "static",
      isEnabled: false,
    },
    {
      name: "onlyAdminsCanSeeThis",
      _type: "dynamic",
      validate: isSuperAdmin,
    },
    {
      name: "onlyAdminsAndRestrictedCanSeeThis",
      _type: "dynamic",
      validate: (user: User) => {
        return user.role === "admin" || user.role === "restricted";
      },
    },
    {
      name: "soloDavidPuedeVerEstoYQueSeaAdmin",
      _type: "dynamic",
      validate: ({ role, nombre }: { role: UserRole; nombre: string }) => {
        return role === "admin" && nombre === "David";
      },
    },
  ];

  const featureMap = {
    [FeatureNames.feature1]: features[0],
    [FeatureNames.feature2]: features[1],
    [FeatureNames.onlyAdminsCanSeeThis]: features[2],
    [FeatureNames.onlyAdminsAndRestrictedCanSeeThis]: features[3],
  };

  const getFeatureByName = (
    name: string
  ): FeatureWithStaticType | undefined => {
    const feat = features.find(
      (feature) => feature.name === name && feature._type === "static"
    );

    return feat && feat._type === "static" ? feat : undefined;
  };

  const getDynamicFeatureByName = (
    name: string
  ): FeatureWithDynamicType | undefined => {
    const feat = features.find(
      (feature) => feature.name === name && feature._type === "dynamic"
    );

    return feat && feat._type === "dynamic" ? feat : undefined;
  };

  return (
    <FeatureContext.Provider
      value={{ features, getFeatureByName, getDynamicFeatureByName }}
    >
      {children}
    </FeatureContext.Provider>
  );
};

export const withUseFeature = (featureName: string) => {
  return (Component) => (props) => {
    const [feature] = useFeature(featureName);
    if (!feature || !feature.isEnabled) return null;
    return <Component {...props} />;
  };
};

const useFeatureProvider = () => {
  const context = React.useContext(FeatureContext);

  if (context === undefined) {
    throw new Error("useFeatureProvider must be used within a FeatureProvider");
  }

  return context;
};

const useFeature = (...featureNames: string[]) => {
  const { getFeatureByName } = useFeatureProvider();

  return featureNames.map((featureName) => getFeatureByName(featureName));
};

export { FeatureProvider, useFeatureProvider, useFeature };
