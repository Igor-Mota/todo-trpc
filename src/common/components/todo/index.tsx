"use client";
import { useMemo } from "react";
import { trpc } from "@/utils/trpc";
import View, { IViewProps } from "./view";
import { debounce } from "@tanstack/pacer";
import { TodoStatus } from "@prisma/client";
import { useState } from "react";

interface IProps {
  id: string;
  title: string;
  status: TodoStatus;
  refetch: () => void;
}

export default function TodoList({ id, title, status, refetch }: IProps) {
  const [newStatus, setNewStatus] = useState(status);
  const { mutateAsync: removeListMutate, isPending: isRemoving } = trpc.todo.remove.useMutation();
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

  const debouncedUpdateStatus = useMemo(
    () =>
      debounce(
        async (data: { id: string; status: TodoStatus }) => {
          await updateMutate(data);
          refetch();
        },
        { wait: 500 }
      ),
    [updateMutate, refetch]
  );

  const handleUpdateStatus = async () => {
    const nextStatus = newStatus === "PENDING" ? "IN_PROGRESS" : newStatus === "IN_PROGRESS" ? "COMPLETED" : "PENDING";

    setNewStatus(nextStatus);
    debouncedUpdateStatus({ id, status: nextStatus });
  };

  const viewProps: IViewProps = {
    data: {
      title,
      id,
      status,
      newStatus,
      isRemoving,
    },
    handles: {
      handleRemove,
      handleUpdateItem,
      handleUpdateStatus,
    },
  };
  return <View {...viewProps} />;
}
