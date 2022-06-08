import { useState } from "react";
import { TagIcon } from "assets/Icons/Icons.js";
import { SideBarNavLink } from "./SideBarNavLink";

export const TagSubMenu = ({ tags }) => {
    const [subMenuCollapse, setSubMenuCollapse] = useState(true);
    return (
        <>
            <div onClick={() => setSubMenuCollapse((state) => !state)}>
                <SideBarNavLink to={"/tags"} Icon={TagIcon} name="Tags" />
            </div>
            <ul
                className={`sm:ml-2 ml-1 overflow-hidden transition-all text-xs space-y-1 ${
                    subMenuCollapse ? "h-0" : "h-0 sm:h-auto"
                }`}>
                {tags.map((tag) => (
                    <li className="mt-1" key={tag}>
                        <SideBarNavLink
                            to={`/tags/${tag}`}
                            Icon={TagIcon}
                            name={tag.toUpperCase()}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};
