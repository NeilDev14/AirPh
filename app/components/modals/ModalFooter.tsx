"use client";
import { useState, useEffect, useCallback } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  // onSubmit: () => void;
  // title?: string;
  // body?: React.ReactElement;
  // footer?: React.ReactElement;
  // actionLabel: string;
  disabled?: boolean;
  // secondaryAction?: () => void;
  // secondaryActionLabel?: string;
}

const footerHeader = ["Support", "Community", "Hosting", "AirPh"];

const ModalFooter: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  // onSubmit,
  // title,
  // body,
  // footer,
  // actionLabel,
  disabled,
  // secondaryAction,
  // secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  // const handleSubmit = useCallback(() => {
  //   if (disabled) {
  //     return;
  //   }

  //   onSubmit();
  // }, [disabled, onSubmit]);

  // const handleSecondaryAction = useCallback(() => {
  //   if (disabled || !secondaryAction) {
  //     return;
  //   }

  //   secondaryAction();
  // }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-end flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative bottom-0 w-full bg-[#fcfcfc] z-10 shadow-sm">
          {/* Content */}
          <div
            className={`translate duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* header */}
              <div className="flex items-center p-6 rounded-t justify-center relative">
                <button
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                  onClick={handleClose}
                >
                  <IoMdCloseCircle size={18} />
                </button>
                {/* <div className="text-md">{title}</div> */}
              </div>
              {/* Body */}
              <div className="relative p-2 justify-evenly flex flex-row gap-3">
                <div className="mt-2 text-sm text-neutral-500 flex flex-col gap-3">
                  <h2 className="mb-5 text-lg text-gray-600 text-center gap-2 hover:underline">
                    Support
                  </h2>
                  <span className="hover:underline">Help Center</span>
                  <span className="hover:underline">AirPh Cover</span>
                  <span className="hover:underline">Cancellation Options</span>
                  <span className="hover:underline">Supporting People</span>
                </div>

                <div className="mt-2 text-sm text-neutral-500 flex flex-col gap-3">
                  <h2 className="mb-5 text-lg text-gray-600 text-center gap-2 hover:underline">
                    Community
                  </h2>
                  <span className="hover:underline">AirPh Housing Program</span>
                  <span className="hover:underline">Tourism</span>
                </div>

                <div className="mt-2 text-sm text-neutral-500 flex flex-col gap-3">
                  <h2 className="mb-5 text-lg text-gray-600 text-center gap-2 hover:underline">
                    Hosting
                  </h2>
                  <span className="hover:underline">AirPh Home</span>
                  <span className="hover:underline">AirPH Cover</span>
                  <span className="hover:underline">Explore Hosting</span>
                  <span className="hover:underline">Visit Community</span>
                  <span className="hover:underline">Host responsibility</span>
                  <span className="hover:underline">AirPh Relevant Places</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalFooter;
