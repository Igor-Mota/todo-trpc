import { useState } from "react";

import View, { IViewProps } from "./view";
import { trpc } from "@/utils/trpc";

export default function EditableTitle({ listTitle = "" }: { listTitle: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(listTitle);

  const { mutateAsync } = trpc.todoList.update.useMutation();

  const handleEditing = (state: boolean) => {
    setIsEditing(state);
  };

  const handleChangeTitle = (data: string) => {
    setTitle(data);
  };

  const handleResetTitle = () => {
    setTitle(listTitle);
    setIsEditing(false);
  };

  const onSubmit = async () => {
    setIsEditing(false);

    await mutateAsync({
      name: title,
    });
  };

  const viewProps: IViewProps = {
    data: {
      isEditing,
      title,
    },
    handles: {
      handleEditing,
      handleChangeTitle,
      handleResetTitle,
      onSubmit,
    },
  };

  return <View {...viewProps} />;
}
