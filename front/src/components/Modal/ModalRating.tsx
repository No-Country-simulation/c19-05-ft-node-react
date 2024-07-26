import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
import { TradeDetails } from '@/types/trade.type';
import SelectRating from '../Select/SelectRating';
import { useAuth } from '@/context/session/sessionContext';
import { useUser } from '@/context/user/userContext';
import { toast } from 'sonner';

type ModalRatingProps = {
  setShowModal: Dispatch<
    SetStateAction<{
      open: boolean;
      trade?: TradeDetails;
    }>
  >;

  showModal: {
    open: boolean;
    trade?: TradeDetails;
  };
};

export default function ModalRating({
  setShowModal,
  showModal,
}: ModalRatingProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const { user } = useAuth();
  const { updateRating } = useUser();
  const handleChangeOpen = (open?: boolean): void => {
    setShowModal({ open: false });
  };

  const handleSubmit = async () => {
    if (rating == 0) return toast.info('Select rating.');

    const userReceiver =
      showModal.trade!.members.memberOne.id._id === user!._id
        ? showModal.trade!.members.memberTwo.id._id
        : showModal.trade!.members.memberOne.id._id;

    const tradeId = showModal.trade!._id;
    const data = {
      comment: comment,
      rating: rating,
    };

    try {
      const result = await updateRating(data, userReceiver, tradeId);
      setShowModal({ ...showModal, open: false });
      setComment('');
      setRating(0);
      toast.success(result.payload);
    } catch (error) {
      if (error instanceof Error) {
        setShowModal({ ...showModal, open: false });
        setComment('');
        setRating(0);
        return toast.error(error.message);
      }
      alert('Error innesperado');
    }
  };
  return (
    <>
      <Modal
        isOpen={showModal!.open}
        onOpenChange={handleChangeOpen}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Comment</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Comment"
                  placeholder="Enter your comment"
                  variant="bordered"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <SelectRating rating={rating} setRating={setRating} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Send comment
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
