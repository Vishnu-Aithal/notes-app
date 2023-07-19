import { ArrowIcon, MinusIcon, TagIcon } from "assets/Icons/Icons";
import { useState } from "react";
import { SideBarNavLink } from "./SideBarNavLink";

export const TagSubMenu: React.FC<{ tags: string[] }> = ({ tags }) => {
    const [subMenuCollapse, setSubMenuCollapse] = useState(true);
    return (
        <>
            <div className="relative overflow-hidden">
                <SideBarNavLink to={"/tags"} Icon={TagIcon} name="Tags" />
                {tags.length > 0 && (
                    <button
                        className={`${
                            subMenuCollapse ? "" : "rotate-90 translate-x-1"
                        } absolute top-0 h-full p-4 right-0 sm:block hidden hover:translate-x-1`}
                        onClick={() => setSubMenuCollapse((state) => !state)}>
                        <ArrowIcon className="h-5 w-5 opacity-70" />
                    </button>
                )}
            </div>
            <ul
                className={`sm:ml-2 ml-1 overflow-hidden transition-all text-xs space-y-1 ${
                    subMenuCollapse ? "h-0" : "h-0 sm:h-auto"
                }`}>
                {tags.map((tag) => (
                    <li className="mt-1" key={tag}>
                        <SideBarNavLink
                            to={`/tags/${tag}`}
                            Icon={MinusIcon}
                            name={tag.toUpperCase()}
                            small
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};
