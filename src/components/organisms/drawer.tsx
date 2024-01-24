import { Button } from '@/components/ui/button';
import {
  Drawer as DrawerComponent,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { HeaderNavigator } from '../molecules/headerNavigator';
import { useGlobalContext } from '@/app/context/store';
import { usePathname, useRouter } from 'next/navigation';

export function Drawer() {
  const { openDrawer, setOpenDrawer } = useGlobalContext();
  const route = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    if (pathname === '/') {
      route.push('/');
    } else {
      route.push(`/#${sectionId}`);
    }
    setOpenDrawer(false);
    const targetSection = document.querySelector('#' + sectionId);
    targetSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <DrawerComponent
      open={openDrawer}
      onOpenChange={(open) => setOpenDrawer(open)}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
        </DrawerHeader>
        <div className="text-center">
          <HeaderNavigator />
        </div>
        <DrawerFooter>
          <Button onClick={() => scrollToSection('contact_section')}>
            Contact me
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerComponent>
  );
}
