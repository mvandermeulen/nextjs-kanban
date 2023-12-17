'use client'
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem} from "@nextui-org/dropdown";
import { IconEdit, IconMenu2, IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { handleDeleteBoard } from "@/actions/BoardServerActions";
export default function BoardActions({
    boardId
} : {
    boardId: string
}) {
    const router = useRouter()

    const handleAction = async (action: 'edit' | 'delete') => {
        if (action === 'delete' && window.confirm('Are you sure you want to delete this column?')) {
            const response = await handleDeleteBoard(boardId);
            if (response.success) {
                router.push('/board/');
                toast.success('Board Deleted');
            } else {
                toast.error(response.message);
            }
        } else if (action === 'edit') {
            toast.error('edit coming soon')
        }
    }

    return (
        <Dropdown backdrop='blur'>
            <DropdownTrigger>
                <Button size="sm" isIconOnly><IconMenu2 size={20} /></Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Board Actions" onAction={(key) => handleAction(key as 'edit' | 'delete')}>
                <DropdownItem key="edit" startContent={<IconEdit size={18} />}>Edit Board Title</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger" startContent={<IconTrash size={18} />}>
                    Delete Board
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}