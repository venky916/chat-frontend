import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

const ProfileModal = ({ isOpen, onClose, user }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="dialog-description"
      >
        <DialogHeader className="flex justify-center items-center m-5">
          <DialogTitle className="text-4xl font-workSans">
            {user.name}
          </DialogTitle>
          <DialogDescription id="dialog-description">
            <img
              src={user.photoUrl}
              alt={user.name}
              className="w-full h-full rounded-full"
            />
            <p>Email: {user.email}</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
