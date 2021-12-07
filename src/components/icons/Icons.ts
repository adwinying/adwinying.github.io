import CodeIcon from "@/components/icons/Code";
import GithubIcon from "@/components/icons/Github";
import LinkIcon from "@/components/icons/Link";
import LinkedinIcon from "@/components/icons/Linkedin";
import MailIcon from "@/components/icons/Mail";
import MenuIcon from "@/components/icons/Menu";
import ServerIcon from "@/components/icons/Server";
import UserIcon from "@/components/icons/User";

const Icons: Record<string, typeof CodeIcon> = {
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
