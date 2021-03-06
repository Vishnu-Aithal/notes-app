import { PropsWithChildren } from "react";

export const ContentLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="content text-zinc-700 w-full px-1 py-5 sm:px-5 flex flex-wrap gap-6 content-start overflow-y-scroll dark:bg-zinc-800 dark:text-slate-300 sm:justify-start justify-center animate-fade-in">
            {children}
        </div>
    );
};
