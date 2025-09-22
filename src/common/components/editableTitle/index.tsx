import { useState } from "react";

import View, { IViewProps } from "./view";
import { trpc } from "@/utils/trpc";
import { TodoStatus } from "@prisma/client";

interface IProps {
  listTitle: string;
  id: string;
  handleSubmit: ({ id, title }: { id: string; title: string }) => Promise<void>;
}

export default function EditableTitle({ id, listTitle = "", handleSubmit }: IProps) {
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
    await handleSubmit({ id, title: title.trim() });
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
