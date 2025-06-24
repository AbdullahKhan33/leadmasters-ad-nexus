
import { PostBuilder } from "@/components/PostBuilder";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";

export default function PostBuilderPage() {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <PostBuilder />
      </div>
    </div>
  );
}
