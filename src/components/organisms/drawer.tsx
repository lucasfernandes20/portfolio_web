import {
  Drawer as DrawerComponent,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@components/ui/drawer';
import { HeaderNavigator } from '../molecules/headerNavigator';
import { useGlobalContext } from '@app/context/store';
import { Button } from '@components/ui/button';
import { FileText } from 'lucide-react';

export function Drawer() {
  const { openDrawer, setOpenDrawer } = useGlobalContext();

  const openResume = () => {
    window.open('/resume.pdf', '_blank');
  };

  return (
    <DrawerComponent
      open={openDrawer}
      modal={false}
      onOpenChange={(open) => setOpenDrawer(open)}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
        </DrawerHeader>
        <div className="text-center mb-4">
          <HeaderNavigator />
        </div>
        <div className="flex justify-center mb-16">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-primary"
            onClick={openResume}
          >
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-primary">Curriculum</span>
          </Button>
        </div>
      </DrawerContent>
    </DrawerComponent>
  );
}
