import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

const supportPageUrl = "https://www.buymeacoffee.com/plum.b";
const supportWidgetUrl = "https://www.buymeacoffee.com/widget/page/plum.b?description=Support%20me%20on%20Buy%20me%20a%20coffee!&color=%23171717";

interface SupportPanelProps {
  open: boolean;
  title: string;
  closeLabel: string;
  externalLabel: string;
  frameTitle: string;
  onClose: () => void;
}

export function SupportPanel({ open, title, closeLabel, externalLabel, frameTitle, onClose }: SupportPanelProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button, a[href], iframe, [tabindex]:not([tabindex="-1"])'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose, open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] bg-black/25 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-x-3 bottom-3 flex h-[min(720px,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-md border border-neutral-200 bg-[#fdfcfb] shadow-[0_28px_90px_-28px_rgba(0,0,0,0.45)] sm:inset-y-4 sm:left-auto sm:right-4 sm:h-auto sm:w-[min(420px,calc(100vw-2rem))]"
      >
        <div className="flex items-center justify-between gap-6 border-b border-neutral-200 bg-white px-5 py-4 sm:px-6">
          <div>
            <p className="mb-1 text-[8px] font-bold uppercase tracking-[3px] text-neutral-400">Buy Me a Coffee</p>
            <h2 id={titleId} className="font-serif text-xl text-neutral-900">{title}</h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label={closeLabel}
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-xl font-light text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <iframe
          src={supportWidgetUrl}
          title={frameTitle}
          className="min-h-0 flex-1 border-0 bg-white"
          loading="lazy"
          allow="payment"
        />
        <div className="border-t border-neutral-200 bg-white px-5 py-3 text-center sm:px-6">
          <a href={supportPageUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center border-b border-neutral-300 text-[9px] font-bold uppercase tracking-[2.5px] text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900">
            {externalLabel} ↗
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
