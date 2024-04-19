import {
  Drawer as DrawerComponent,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { HeaderNavigator } from '../molecules/headerNavigator';
import { useGlobalContext } from '@/app/context/store';

export function Drawer() {
  const { openDrawer, setOpenDrawer } = useGlobalContext();

  return (
    <DrawerComponent
      open={openDrawer}
      onOpenChange={(open) => setOpenDrawer(open)}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
        </DrawerHeader>
        <div className="text-center mb-16">
          <HeaderNavigator />
        </div>
      </DrawerContent>
    </DrawerComponent>
  );
}
