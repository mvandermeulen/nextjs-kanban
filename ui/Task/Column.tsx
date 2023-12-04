import { SortableContext } from '@dnd-kit/sortable';
import DeleteColumnForm from '../Forms/DeleteColumnForm';
import CreateTaskFormSimple from '../Forms/CreateTaskFormSimple';
import TaskItem from "@/ui/Task/TaskItem";
import { Card, CardHeader, CardBody, CardFooter, CardHeaderGrab } from '@/ui/Card/Card';
import { ColumnWithTasks } from '@/types/types';
import { IconGripHorizontal } from '@tabler/icons-react';

interface ColumnProps {
  column: ColumnWithTasks;
  boardId: string;
}

export default function Column({ column, boardId }: ColumnProps) {  
  return (
    <div>
    <Card className='shrink-0 w-64'>
      <CardHeaderGrab><IconGripHorizontal /></CardHeaderGrab>
      <CardHeader className='py-1 tracking-tight'>{column.title}</CardHeader>
      <CardBody className='pt-0'>
        <SortableContext items={column.tasks} id={column.id}>
          {
            column.tasks.length > 0 ? (
                column.tasks.map(task => (
                    <TaskItem 
                        key={task.id}
                        task={task}
                        boardId={boardId}
                        columnId={column.id}
                    />
                ))
            ) : (
                <div className='h-16 bg-zinc-800 rounded-lg shadow-md text-zinc-500 flex items-center justify-center border-dashed border-4 border-zinc-700'>DROP HERE</div>
            )
          }
        </SortableContext>
      </CardBody>
      <CardFooter>
        <CreateTaskFormSimple boardId={boardId} columnId={column.id} />
      </CardFooter>
    </Card>
    </div>
  );
}

