"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { handleCreateTask } from "@/actions/TaskServerActions";
import { CreateTaskSchema } from "@/types/zodTypes";
import { TaskCreationData } from "@/types/types";
import { IconLoader2, IconPlus, IconX } from "@tabler/icons-react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="button" isIconOnly aria-label="Close form" onClick={onClick}>
      <IconX size={16} />
    </Button>
  );
}

export default function CreateTaskForm({
  boardId,
  columnId,
}: {
  boardId: string;
  columnId: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TaskCreationData>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: { boardId, columnId },
  });

  const onSubmit: SubmitHandler<TaskCreationData> = async (data) => {
    const response = await handleCreateTask(data);

    if (response.success) {
      toast.success("Task Created");
      reset();
      setIsEditing(false);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <hr className="border-zinc-800 mb-3" />
          <div className="mb-2">
            <Input
              autoFocus
              autoComplete="off"
              type="text"
              id={`taskTitle_${boardId}_${columnId}`}
              placeholder="Enter a name for your task..."
              {...register("taskTitle")}
              isRequired
              size="sm"
              label="Task Title"
            />
          </div>

          <input
            type="hidden"
            id={`boardId_${boardId}`}
            {...register("boardId")}
          />
          <input
            type="hidden"
            id={`columnId_${columnId}`}
            {...register("columnId")}
          />

          <div className="flex justify-between items-center gap-2">
            <Button type="submit" disabled={isSubmitting} className="grow">
              {isSubmitting ? (
                <>
                  <IconLoader2 size={18} className="animate-spin mr-1" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <IconPlus size={14} />
                  <span>Create Task</span>
                </>
              )}
            </Button>

            <CloseButton onClick={toggleEdit} />
          </div>
        </form>
      ) : (
        <button
          onClick={toggleEdit}
          className="text-sm flex items-center gap-2 w-full"
        >
          <IconPlus size={16} />
          Add a task
        </button>
      )}
    </div>
  );
}
