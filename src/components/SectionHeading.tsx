import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title?: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ id, eyebrow, title, accent, description, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""}`}>
      <Reveal>
      <div className="max-w-5xl">
        <p id={!title ? id : undefined} className={`mb-4 text-[9px] font-bold uppercase tracking-[5px] text-[#8ea291] ${!title ? "scroll-mt-24" : ""}`}>{eyebrow}</p>
        {title && <h2 id={id} aria-label={accent ? `${title} ${accent}` : title} className="scroll-mt-24 font-narrative text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.9] tracking-[-0.05em] text-neutral-900">{title}{accent && <><br /><span className="italic text-neutral-300">{accent}</span></>}</h2>}
        {description && <p className={`mt-7 max-w-[560px] text-sm font-light leading-7 tracking-[0.3px] text-neutral-400 ${centered ? "mx-auto" : ""}`}>{description}</p>}
      </div>
      </Reveal>
    </div>
  );
}
