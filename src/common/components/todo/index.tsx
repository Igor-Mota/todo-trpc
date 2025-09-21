import View, { IViewProps } from "./view";

export default function TodoList({ id, title }: { id: string; title: string }) {
  const viewProps: IViewProps = {
    data: {
      title,
    },
    handles: {},
  };
  return <View {...viewProps} />;
}
