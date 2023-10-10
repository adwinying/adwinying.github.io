/* eslint-disable @typescript-eslint/ban-ts-comment */
// ignoring because tsc does not load @astro/ts-plugin
// https://github.com/withastro/language-tools/issues/479#issuecomment-1419233268
// @ts-ignore
import Code from "@/components/icons/Code.astro";
// @ts-ignore
import Github from "@/components/icons/Github.astro";
// @ts-ignore
import Link from "@/components/icons/Link.astro";
// @ts-ignore
import Linkedin from "@/components/icons/Linkedin.astro";
// @ts-ignore
import Mail from "@/components/icons/Mail.astro";
// @ts-ignore
import Menu from "@/components/icons/Menu.astro";
// @ts-ignore
import Server from "@/components/icons/Server.astro";
// @ts-ignore
import User from "@/components/icons/User.astro";

export interface IconProps {
  class?: string;
}

export const Icon = {
  Code,
  Github,
  Link,
  Linkedin,
  Mail,
  Menu,
  Server,
  User,
};
