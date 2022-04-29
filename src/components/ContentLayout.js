export const ContentLayout = ({ children }) => {
    return (
        <div className="content w-full px-1 py-5 sm:px-5 flex flex-wrap gap-6 content-start overflow-auto dark:bg-zinc-800 sm:justify-start justify-center animate-fade-in">
            {children}
        </div>
    );
};