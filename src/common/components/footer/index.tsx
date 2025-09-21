import View, { IViewProps } from "./view";

export default function Footer() {
  const viewProps: IViewProps = {
    data: {},
    handles: {},
  };
  return <View {...viewProps} />;
}
