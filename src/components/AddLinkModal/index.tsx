import React, { ChangeEvent, useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  Input,
  useTheme,
} from '@chakra-ui/core';

interface ModalProps {
  onAction?: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const AddLinkModal: React.FC<ModalProps> = ({ onAction, onClose, isOpen }) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');

  const theme = useTheme();

  function getTitleSuggestion(url: string) {
    const splittedUrl = url.split('/');

    if (splittedUrl.length === 0) {
      return;
    }

    setLinkTitle(splittedUrl[splittedUrl.length - 1]);
  }

  useEffect(() => {
    getTitleSuggestion(linkUrl);
  }, [linkUrl]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Stash Link</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={theme.space[3]}>
            <Input variant="outline" placeholder="Link" value={linkUrl} onChange={(e: ChangeEvent<HTMLInputElement>) => setLinkUrl(e.target.value)} />
            <Input variant="outline" placeholder="Title" value={linkTitle} onChange={(e: ChangeEvent<HTMLInputElement>) => setLinkTitle(e.target.value)} />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variantColor="cyan" onClick={onAction}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddLinkModal;
