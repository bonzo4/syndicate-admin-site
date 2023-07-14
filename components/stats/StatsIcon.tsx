import { BiSolidUser, BiSolidMegaphone } from "react-icons/bi";
import { HiCursorClick, HiUserGroup } from "react-icons/hi";
import { FaEye, FaWrench } from "react-icons/fa";
import { PiTelevisionSimpleFill } from "react-icons/pi";

type StatsIconProps = {
  name: string;
  className?: string;
}

export function StatsIcon({ name, className }: StatsIconProps) {
  switch (name) {
    case "users":
      return <BiSolidUser className={className} />
    case "guilds":
      return <HiUserGroup className={className} />
    case "views":
      return <FaEye className={className} />
    case "interactions":
      return <HiCursorClick className={className} />
    case "channels":
      return <PiTelevisionSimpleFill className={className} />
    case "guilds setup":
      return <FaWrench className={className} />
    case "mention roles":
      return <BiSolidMegaphone className={className} />
    case "errors":
      return <FaWrench className={className} />
  }
}