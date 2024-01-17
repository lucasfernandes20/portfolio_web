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
}

const GlobalContext = createContext<DataType>({
  selectedRepository: null,
  setSelectedRepository: () => null,
  debouncedNameInputValue: '',
  setDebouncedNameInputValue: () => '',
  languageInputValue: '',
  setLanguageInputValue: () => '',
  onlyPublic: true,
  setOnlyPublic: () => true
});

export function GlobalContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [selectedRepository, setSelectedRepository] =
    useState<ListUserReposResponseWithIcon | null>(null);
  const [debouncedNameInputValue, setDebouncedNameInputValue] = useState('');
  const [languageInputValue, setLanguageInputValue] = useState('');
  const [onlyPublic, setOnlyPublic] = useState(true);

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
        setOnlyPublic
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
