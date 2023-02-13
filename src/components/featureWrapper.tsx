import { useFeatureProvider } from "@/context/featureContext";

export type FeatureWrapperProps = {
    children: React.ReactNode;
    featureName: string;
    alternate?: React.ReactNode;
};

export type FeatureWrapperProps2 = {
    featureName: string;
    render: (featureIsEnabled: boolean) => React.ReactNode;
};

const FeatureWrapper: React.FC<FeatureWrapperProps> = ({ children, featureName, alternate = null }) => {
    const { getFeatureByName } = useFeatureProvider();

    const feature = getFeatureByName(featureName);

    if (feature?.isEnabled) {
        return <>{children}</>;
    }

    return <>{alternate}</>;
};

const Feature: React.FC<FeatureWrapperProps2> = ({ featureName, render }) => {
    const { getFeatureByName } = useFeatureProvider();

    const feature = getFeatureByName(featureName);

    return <>{render(feature?.isEnabled || false)}</>;
};

// const FeatureDynamic: React.FC<FeatureWrapperProps2> = ({ featureName, render }) => {
//     const { getFeatureByName } = useFeatureProvider();

//     const feature = getFeatureByName(featureName);

//     return <>{render(feature?._type === 'dynamic' && feature.isEnabled || false)}</>;
// };

export {FeatureWrapper, Feature}