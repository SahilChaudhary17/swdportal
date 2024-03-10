import CreateComplaint from "@/components/CreateComplaint";
import Navbar from "@/components/Navbar";
import Test from "@/components/Test";

export default function Home() {
  return (
    <div className="flex">
      <div className="w-1/5 px-12 my-4  rounded-2xl bg-violet-500 ml-8 h-[695px]">

      </div>
      <div className="w-4/5 px-12">
        <Navbar />
      </div>
    </div>
  );
}
