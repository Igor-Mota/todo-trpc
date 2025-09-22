"use client";

import React from "react";
import View, { IViewProps } from "./view";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

interface IParams {
  params: Promise<{
    locale: string;
  }>;
}

export default function Dashboard({ params }: IParams) {
  const { locale } = React.use(params);
  const { data: session } = useSession();

  const { mutateAsync: createListMutate, isPending: isCreating } = trpc.todoList.create.useMutation();
  const { mutateAsync: removeListMutate, isPending: isRemoving } = trpc.todoList.remove.useMutation();
  const { mutateAsync: createItemMutate, isPending: isCreatingItem } = trpc.todo.create.useMutation();

  const { mutateAsync: updateListMutate } = trpc.todoList.update.useMutation();
  const { data, refetch } = trpc.todoList.findMany.useQuery({ userId: session?.user.id! }, { enabled: !!session?.user.id });

  const handleCreateList = async () => {
    await createListMutate({
      name: "Nova lista",
      userId: session?.user.id!,
    });
    refetch();
  };

  const handleRemoveList = async (id: string) => {
    await removeListMutate({
      id,
    });
    refetch();
  };

  const handleAddItem = async (listId: string) => {
    await createItemMutate({
      listId,
      title: "Novo item",
      status: "PENDING",
    });

    refetch();
  };

  const handleUpdate = async (data: { id: string; title?: string }) => {
    if (!data.title) return;

    updateListMutate({
      id: data.id,
      name: data.title,
    });
  };

  const lists = data && "lists" in data ? data.lists : [];

  const viewProps: IViewProps = {
    data: {
      locale,
      lists,
      isCreating,
      isRemoving,
      isCreatingItem,
    },
    handles: {
      handleCreateList,
      handleRemoveList,
      handleAddItem,
      handleUpdate,
      refetch,
    },
  };

  return <View {...viewProps} />;
}
