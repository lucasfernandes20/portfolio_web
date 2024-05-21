'use client';

import { useGlobalContext } from '@app/context/store';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@components/ui/select';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

const languages = ['JavaScript', 'TypeScript', 'CSS', 'Python', 'HTML'];

export function FilterBar() {
  const [nameInputValue, setNameInputValue] = useState('');
  const {
    setDebouncedNameInputValue,
    setLanguageInputValue,
    setOnlyPublic,
    setTypingNameInputValue,
    debouncedNameInputValue,
    languageInputValue,
    onlyPublic
  } = useGlobalContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInputValue(event.target.value.trimStart());
    setTypingNameInputValue(true);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedNameInputValue(nameInputValue);
      setTypingNameInputValue(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [nameInputValue, setDebouncedNameInputValue, setTypingNameInputValue]);

  return (
    <div className="w-full h-52 flex flex-col gap-2">
      <form className="w-full flex flex-col tablet:flex-row items-start tablet:items-center justify-center gap-4 p-4">
        <Label htmlFor="repositoryName" className="w-full tablet:w-[180px]">
          <Input
            name="repositoryName"
            id="repositoryName"
            placeholder="Repository name"
            className="w-full tablet:w-[180px]"
            value={nameInputValue}
            onChange={handleInputChange}
          />
        </Label>
        <Label htmlFor="language" className="w-full tablet:w-[180px]">
          <Select
            name="language"
            onValueChange={setLanguageInputValue}
            value={languageInputValue}
          >
            <SelectTrigger className="w-full tablet:w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Label>
        <Label htmlFor="public" className="flex items-center gap-2">
          <Checkbox
            name="public"
            id="public"
            defaultChecked
            checked={onlyPublic}
            onCheckedChange={(e) => {
              const target = e.valueOf();
              setOnlyPublic(target as boolean);
            }}
          />
          Public only
        </Label>
      </form>
      <div className="flex items-center justify-center flex-wrap gap-2">
        {debouncedNameInputValue ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setNameInputValue('');
              setDebouncedNameInputValue('');
            }}
          >
            <X className="mr-2" />
            {debouncedNameInputValue}
          </Button>
        ) : null}
        {languageInputValue ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setLanguageInputValue('')}
          >
            <X className="mr-2" />
            {languageInputValue}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
