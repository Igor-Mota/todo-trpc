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

  const { mutateAsync: createListMutate } = trpc.todoList.create.useMutation();
  const { mutateAsync: removeListMutate } = trpc.todoList.remove.useMutation();
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

  const lists = data && "lists" in data ? data.lists : [];

  const viewProps: IViewProps = {
    data: {
      locale,
      lists,
    },
    handles: {
      handleCreateList,
      handleRemoveList,
    },
  };

  return <View {...viewProps} />;
}
