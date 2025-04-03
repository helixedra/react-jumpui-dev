import { createPortal } from "react-dom";
import { useEffect, useRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { RiCloseLine } from "react-icons/ri";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
  disableEscape?: boolean;
}

interface DialogHeaderProps {
  children: ReactNode;
  headerClassName?: string;
}

interface DialogContentProps {
  children: ReactNode;
}

export const Dialog = ({
  isOpen,
  onClose,
  children,
  overlayClassName = "",
  contentClassName = "",
  disableEscape = false,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current =
        document.activeElement instanceof HTMLButtonElement
          ? document.activeElement
          : null;
      dialogRef.current?.focus();
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !disableEscape && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
      triggerRef.current?.focus();
    };
  }, [isOpen, onClose, disableEscape]);

  if (!isOpen) return null;

  const contentClasses = twMerge(
    "bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 max-w-lg w-full mx-4 transition-transform transform duration-300 ease-in-out scale-100",
    contentClassName
  );
  const closeButtonClasses = twMerge(
    "cursor-pointer hover:opacity-80 absolute top-0 right-0 p-2",
    "text-gray-500 dark:text-gray-400"
  );
  return createPortal(
    <Dialog.Overlay onClose={onClose} overlayClassName={overlayClassName}>
      <div
        ref={dialogRef}
        className={contentClasses}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={closeButtonClasses}
          aria-label="Close"
          ref={triggerRef}
          type="button"
          title="Close"
          onClick={onClose}
        >
          <RiCloseLine size={18} />
        </button>
        {children}
      </div>
    </Dialog.Overlay>,

    document.body
  );
};

Dialog.Header = ({ children, headerClassName }: DialogHeaderProps) => {
  const headerClasses = twMerge(
    "flex justify-between items-center mb-4",
    "text-lg font-semibold",
    headerClassName
  );

  return (
    <div className={headerClasses}>
      <h2 className="text-lg font-semibold">{children}</h2>
    </div>
  );
};

Dialog.Content = ({ children }: DialogContentProps) => (
  <div className="text-sm text-gray-700 dark:text-gray-300">{children}</div>
);

Dialog.Overlay = ({
  onClose,
  overlayClassName = "",
  children,
}: {
  onClose: () => void;
  overlayClassName?: string;
  children: ReactNode;
}) => {
  const overlayClasses = twMerge(
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out",
    overlayClassName
  );
  return (
    <div className={overlayClasses} onClick={onClose}>
      {children}
    </div>
  );
};
