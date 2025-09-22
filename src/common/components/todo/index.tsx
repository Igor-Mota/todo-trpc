import { trpc } from "@/utils/trpc";
import View, { IViewProps } from "./view";
import { TodoStatus } from "@prisma/client";

interface IProps {
  id: string;
  title: string;
  refetch: () => void;
}

export default function TodoList({ id, title, refetch }: IProps) {
  const { mutateAsync: removeListMutate } = trpc.todo.remove.useMutation();
  const { mutateAsync: updateMutate } = trpc.todo.update.useMutation();

  const handleRemove = async () => {
    await removeListMutate({ id });
    refetch();
  };

  const handleUpdateItem = async (data: { id: string; title: string }) => {
    await updateMutate({
      id: data.id,
      title: data.title,
    });

    refetch();
  };

  const viewProps: IViewProps = {
    data: {
      title,
      id,
    },
    handles: {
      handleRemove,
      handleUpdateItem,
    },
  };
  return <View {...viewProps} />;
}
