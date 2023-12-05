import { getBoardsSummary } from "@/lib/FetchData";
import { BoardSummary } from "@/types/types";
import CreateBoardForm from "@/ui/Forms/CreateBoardForm";
import Link from "next/link";
import { Card, CardHeader, CardBody, CardFooter } from '@/ui/Card/Card';
import PageHeading from "@/ui/PageHeading";
import { IconList  } from "@tabler/icons-react";
export const dynamic = 'auto'

export default async function Boards() {
  const boards: BoardSummary[] = await getBoardsSummary();

  return (
    <>
      <PageHeading title='Boards' />
      <div className="flex gap-5">
        <CreateBoardForm />
        {boards.map((board) => (
          <Link key={board.id} href={`/board/${board.id}`}>
            <Card className="w-64 shrink-0">
              <CardBody className="
                h-28 
                flex flex-col justify-end relative
              ">
                <span className="absolute text-xs top-2 right-2 bg-zinc-800 w-10 h-6 rounded-lg flex items-center justify-center text-purple-500 gap-1"><IconList size={16} />3</span>
                {board.title}
              </CardBody>
            </Card>
          </Link>
        ))}
        
      </div>
    </>
  );
}
