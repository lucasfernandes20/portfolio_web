'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Mail } from 'lucide-react';
import { Subtitle } from '@/components/ui/subtitle';
import { MailMeForm } from '@/components/molecules/mailMeForm';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Contacts } from '@/components/molecules/contacts';
import { useGlobalContext } from '@/app/context/store';

export function MailMeDrawer() {
  const { openMailer, setOpenMailer } = useGlobalContext();
  return (
    <>
      <DropdownMenu
        open={openMailer}
        modal={false}
        onOpenChange={(open) => setOpenMailer(open)}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed hidden tablet:flex left-10 bottom-10 rounded-full size-16"
          >
            <Mail />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-svw max-w-[600px] ml-10 mb-4 p-4 rounded-xl">
          <DropdownMenuLabel>
            <Subtitle>Send me a email</Subtitle>
            <p className="text-sx text-muted-foreground/80">
              Or give me feedback about this website 😄
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <MailMeForm />
        </DropdownMenuContent>
      </DropdownMenu>

      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="left-10 bottom-10 rounded-full size-16 fixed tablet:hidden"
          >
            <Mail />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              <Subtitle>Send me a email</Subtitle>
            </DrawerTitle>
            <DrawerDescription>
              Or give me feedback about this website 😄
            </DrawerDescription>
          </DrawerHeader>
          <MailMeForm />
          <DrawerFooter className="flex items-center">
            <Contacts />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
