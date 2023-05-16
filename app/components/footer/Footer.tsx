"use client";
import { useCallback } from "react";
import Container from "../Container";
import useFooterModal from "../../hooks/useFooterModal";
import useLoginModal from "../../hooks/useLoginModal";
import { IoIosArrowUp } from "react-icons/io";
// import { SafeUser } from "../../types";

// interface UserMenuProps {
//   currentUser?: SafeUser | null;
// }

const Footer = () => {
  const footerModal = useFooterModal();
  //   const loginModal = useLoginModal();

  //   const [isOpen, setIsOpen] = useState(false);

  //   const toggleOpen = useCallback(() => {
  //     setIsOpen((value) => !value);
  //   }, []);

  const onFooter = useCallback(() => {
    // if (!currentUser) {
    //   return footerModal.onOpen();
    // }
    footerModal.onOpen();
  }, [footerModal]);

  return (
    <div className="fixed bottom-0 w-full bg-[#fcfcfc] z-10 shadow-sm">
      <div className="py-4 border-[2px]">
        <Container>
          <div className="flex flex-row justify-between text-gray-600 text-sm">
            <span>Terms</span>
            <span>© 2023 AirPh</span>
            <IoIosArrowUp
              size={20}
              className="flex justify-end right-0"
              onClick={onFooter}
            />
          </div>
          {/* </div> */}
        </Container>
      </div>
    </div>
  );
};

export default Footer;
