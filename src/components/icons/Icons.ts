/* eslint-disable @typescript-eslint/ban-ts-comment */
// ignoring because tsc does not load @astro/ts-plugin
// https://github.com/withastro/language-tools/issues/479#issuecomment-1419233268
// @ts-ignore
import CodeIcon from "@/components/icons/Code.astro";
// @ts-ignore
import GithubIcon from "@/components/icons/Github.astro";
// @ts-ignore
import LinkIcon from "@/components/icons/Link.astro";
// @ts-ignore
import LinkedinIcon from "@/components/icons/Linkedin.astro";
// @ts-ignore
import MailIcon from "@/components/icons/Mail.astro";
// @ts-ignore
import MenuIcon from "@/components/icons/Menu.astro";
// @ts-ignore
import ServerIcon from "@/components/icons/Server.astro";
// @ts-ignore
import UserIcon from "@/components/icons/User.astro";

export interface IconProps {
  class?: string;
}

const Icons = {
  code: CodeIcon,
  github: GithubIcon,
  link: LinkIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
  menu: MenuIcon,
  server: ServerIcon,
  user: UserIcon,
};

export default Icons;
