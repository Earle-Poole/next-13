import { getNowAsLocalTimeString } from "@/utils/cache";

const SectionThree = () => {
  return (
    <section className="flex items-center flex-1 gap-4 justify-end text-end">
        <span className="text-xs font-normal">
          Built @ {getNowAsLocalTimeString()}
        </span>
    </section>
  );
};

export default SectionThree;
