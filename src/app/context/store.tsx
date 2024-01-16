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
}

const GlobalContext = createContext<DataType>({
  selectedRepository: null,
  setSelectedRepository: () => null
});

export function GlobalContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [selectedRepository, setSelectedRepository] =
    useState<ListUserReposResponseWithIcon | null>(null);

  return (
    <GlobalContext.Provider
      value={{ selectedRepository, setSelectedRepository }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
