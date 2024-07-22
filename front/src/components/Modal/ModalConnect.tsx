import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { GetUser, InterestPopulated } from '@/types/user.type';
import SelectComponent from '../Select/SelectComponent';
import { useAuth } from '@/context/session/sessionContext';
import { useTrades } from '@/context/trades/trades';

type ModalConnectProps = {
  setShowModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      user?: GetUser;
    }>
  >;
  showModal: {
    open: boolean;
    user?: GetUser;
  };
};

export default function ModalConnect({
  showModal,
  setShowModal,
}: ModalConnectProps) {
  const { user } = useAuth();
  const { createTrade } = useTrades();
  const [specialtyOne, setSpecialtyOne] = useState<string>('');
  const [specialtyTwo, setSpecialtyTwo] = useState<string>('');
  const [duration, setDuration] = useState<
    'One day' | 'Three days' | 'One week' | ''
  >('');

  //funcion para buscar match
  function findMatchingSpecialties(
    sourceUser: GetUser,
    targetUser: GetUser
  ): InterestPopulated[] {
    return sourceUser.specialties.filter((specialty) =>
      targetUser.interests.some(
        (interest) => interest.specialtyId._id === specialty.specialtyId._id
      )
    );
  }

  let specialtiesTwo: InterestPopulated[] = [];
  let specialtiesOne: InterestPopulated[] = [];

  //cargar los arrays con los matcheos
  if (showModal.open && showModal.user && user) {
    specialtiesTwo = findMatchingSpecialties(showModal.user, user);
    specialtiesOne = findMatchingSpecialties(user, showModal.user);
  }

  // activar open.estado creado en /connect
  const handleChangeOpen = (open?: boolean): void => {
    setShowModal({ open: false });
  };

  const durationObject = {
    ['One day']: 1,
    ['Three days']: 3,
    ['One week']: 7,
  };

  const handleSubmit = async () => {
    if (!specialtyOne || !specialtyTwo || !duration) {
      return alert('Faltan datos');
    }
    const specialtyOneData = user?.specialties.find(
      (specialty) => specialty._id === specialtyOne
    );
    const specialtyTwoData = showModal.user?.specialties.find(
      (specialty) => specialty._id === specialtyTwo
    );
    const tradeData = {
      members: {
        memberOne: {
          id: user!._id,
          specialty: specialtyOneData!.specialtyId._id,
        },
        memberTwo: {
          id: showModal.user!._id,
          specialty: specialtyTwoData!.specialtyId._id,
        },
      },
      duration: durationObject[duration],
    };

    try {
      const result = await createTrade(tradeData);
      if (result && result.status === 'success') {
        alert('trade creado');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const isValid = specialtiesOne.length > 0 && specialtiesTwo.length > 0;

  return (
    <>
      <Modal
        isOpen={showModal.open}
        onOpenChange={handleChangeOpen}
        backdrop="blur"
        classNames={{
          body: 'py-10',
          backdrop: 'bg-[#292f46]/50',
          base: 'border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]',
          header: 'border-b-[1px] border-[#292f46]',
          footer: 'border-t-[1px] border-[#292f46]',
          closeButton: 'hover:bg-white/5 active:bg-white/10',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody className="flex flex-col justify-center items-center">
                {isValid ? (
                  <>
                    <SelectComponent
                      specialties={specialtiesOne}
                      creatorOrguest="creator"
                      setSpecialty={setSpecialtyOne}
                    />
                    <SelectComponent
                      specialties={specialtiesTwo}
                      creatorOrguest="guest"
                      setSpecialty={setSpecialtyTwo}
                    />
                    <SelectComponent time={true} setDuration={setDuration} />
                  </>
                ) : (
                  'Incompatible interests and specialties'
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color={'primary'}
                  className={isValid ? 'bg-blue-600 text-white' : 'hidden'}
                  disabled={isValid}
                  onPress={handleSubmit}
                >
                  Create Trade!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
