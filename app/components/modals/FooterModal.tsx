"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import ModalFooter from "./ModalFooter";
import useFooterModal from "../../hooks/useFooterModal";

const FooterModal = () => {
  const footerModal = useFooterModal();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ModalFooter
      disabled={isLoading}
      isOpen={footerModal.isOpen}
      // title="Footer"
      // actionLabel="Footer"
      onClose={footerModal.onClose}
      // onSubmit={handleSubmit(onSubmit)}
      // body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default FooterModal;
