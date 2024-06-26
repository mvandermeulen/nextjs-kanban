"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { handleCreateBoard } from "@/actions/BoardServerActions";
import { CreateBoardSchema } from "@/types/zodTypes";
import { Card, CardBody } from "@/ui/Card/Card";
import { BoardCreationData } from "@/types/types";
import { IconLoader2, IconPlug, IconPlus } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function CreateBoardForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<BoardCreationData>({
    resolver: zodResolver(CreateBoardSchema),
  });

  const onSubmit: SubmitHandler<BoardCreationData> = async (data) => {
    const response = await handleCreateBoard(data);
    if (response.success && response.boardId) {
      router.push(`/board/${response.boardId}`);
      toast.success("Board Created!");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      <div className="p-2 bg-zinc-900 rounded-xl shadow-xl h-32">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 h-full justify-between"
        >
          <Input
            autoComplete="off"
            type="text"
            id="title"
            {...register("title")}
            label="Board Title"
            placeholder="Name of your board..."
            isRequired
            isClearable
            minLength={3}
          />
          <div>
            <Button
              type="submit"
              color="primary"
              className="gap-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <IconLoader2 size={16} className="animate-spin shrink-0" />
                  Creating...
                </>
              ) : (
                <>
                  <IconPlus size={16} className="shrink-0" />
                  Create
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
