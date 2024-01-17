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
  debouncedNameInputValue: string;
  setDebouncedNameInputValue: Dispatch<SetStateAction<string>>;
  languageInputValue: string;
  setLanguageInputValue: Dispatch<SetStateAction<string>>;
  onlyPublic: boolean;
  setOnlyPublic: Dispatch<SetStateAction<boolean>>;
  typingNameInputValue: boolean;
  setTypingNameInputValue: Dispatch<SetStateAction<boolean>>;
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<DataType>({
  selectedRepository: null,
  setSelectedRepository: () => null,
  debouncedNameInputValue: '',
  setDebouncedNameInputValue: () => '',
  languageInputValue: '',
  setLanguageInputValue: () => '',
  onlyPublic: true,
  setOnlyPublic: () => true,
  typingNameInputValue: false,
  setTypingNameInputValue: () => false,
  openDrawer: false,
  setOpenDrawer: () => false
});

export function GlobalContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [selectedRepository, setSelectedRepository] =
    useState<ListUserReposResponseWithIcon | null>(null);
  const [typingNameInputValue, setTypingNameInputValue] =
    useState<boolean>(false);
  const [debouncedNameInputValue, setDebouncedNameInputValue] = useState('');
  const [languageInputValue, setLanguageInputValue] = useState('');
  const [onlyPublic, setOnlyPublic] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        selectedRepository,
        setSelectedRepository,
        debouncedNameInputValue,
        setDebouncedNameInputValue,
        languageInputValue,
        setLanguageInputValue,
        onlyPublic,
        setOnlyPublic,
        typingNameInputValue,
        setTypingNameInputValue,
        openDrawer,
        setOpenDrawer
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
