import { twMerge } from "tailwind-merge";

function PageContainer({ children, className }) {
  return (
    <main className={twMerge("flex-[1_0_auto] bg-secondary", className)}>
      {children}
    </main>
  );
}

export default PageContainer;
