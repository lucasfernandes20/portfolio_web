'use client';

import { Endpoints } from '@octokit/types';
import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState
} from 'react';

export type ListUserReposResponse =
  Endpoints['GET /repos/{owner}/{repo}']['response']['data'];

export type ListUserReposResponseWithIcon = ListUserReposResponse & {
  language_icon: React.ReactNode;
};

interface DataType {
  selectedRepository: ListUserReposResponseWithIcon | null;
  setSelectedRepository: Dispatch<
    SetStateAction<ListUserReposResponseWithIcon | null>
  >;
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  openMailer: boolean;
  setOpenMailer: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<DataType>({
  selectedRepository: null,
  setSelectedRepository: () => null,
  openDrawer: false,
  setOpenDrawer: () => false,
  openMailer: false,
  setOpenMailer: () => false
});

export function GlobalContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [selectedRepository, setSelectedRepository] =
    useState<ListUserReposResponseWithIcon | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMailer, setOpenMailer] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        selectedRepository,
        setSelectedRepository,
        openDrawer,
        setOpenDrawer,
        openMailer,
        setOpenMailer
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
