'use client'
import { useRouter } from 'next/navigation'
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/react";

export default function TaskModal({ children } : { children: React.ReactNode }) {
  const { isOpen, onClose } = useDisclosure({ defaultOpen: true });
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.back();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="4xl" scrollBehavior='outside'>
      <ModalContent>
        <ModalBody className='p-0'>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
