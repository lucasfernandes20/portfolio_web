import {
  ListUserReposResponse,
  ListUserReposResponseWithIcon
} from '../context/store';
import { RiJavascriptFill } from 'react-icons/ri';
import { BiLogoTypescript } from 'react-icons/bi';
import { SiCsswizardry } from 'react-icons/si';
import { IoLogoHtml5 } from 'react-icons/io';
import { FaPython } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa';

function addLanguageIcon(
  repositories: ListUserReposResponse[]
): ListUserReposResponseWithIcon[] {
  const newSchema = repositories.map((repo) => {
    switch (repo.language?.toLowerCase()) {
      case 'javascript':
        return {
          ...repo,
          language_icon: (
            <RiJavascriptFill className="text-muted-foreground text-xl" />
          )
        };
      case 'typescript':
        return {
          ...repo,
          language_icon: (
            <BiLogoTypescript className="text-muted-foreground text-xl" />
          )
        };
      case 'css':
        return {
          ...repo,
          language_icon: (
            <SiCsswizardry className="text-muted-foreground text-xl" />
          )
        };
      case 'html':
        return {
          ...repo,
          language_icon: (
            <IoLogoHtml5 className="text-muted-foreground text-xl" />
          )
        };
      case 'python':
        return {
          ...repo,
          language_icon: (
            <FaPython className="text-muted-foreground text-base" />
          )
        };
      default:
        return {
          ...repo,
          language_icon: <FaBook className="text-muted-foreground text-base" />
        };
    }
  });

  return newSchema;
}

export default addLanguageIcon;
