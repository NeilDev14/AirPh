"use client";

import { useState, useCallback, useRef, useEffect, MouseEvent } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { CgMenu } from "react-icons/cg";
import Avatar from "../Avatar";
import MenuItem from "../navbar/MenuItem";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import useRentModal from "../../hooks/useRentModal";
import { SafeUser } from "../../types";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

export function useOutsideClick(ref: any, onClickOut: () => void) {
  useEffect(() => {
    const onClick = ({ target }: any) => {
      if (ref.current && !ref.current.contains(target as Node)) {
        onClickOut?.();
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [ref, onClickOut]);
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useOutsideClick(menuRef, () => {
    setIsOpen(false);
  });

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-lg hover:bg-blue-400 hover:text-white transition cursor-pointer"
        >
          AirPh Home
        </div>
        {currentUser ? (
          <div className="text-neutral-500 text-base italic">
            Welcome!
            <div className="text-sm text-black font-medium not-italic">
              {currentUser?.name}
            </div>
          </div>
        ) : (
          <span className="text-neutral-500 font-medium">Welcome! Guest</span>
        )}
        <div
          onClick={toggleOpen}
          ref={buttonRef}
          className="p-5 md:py-2 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-lg cursor-pointer hover:shadow-sm transition"
        >
          <CgMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute mt-1 rounded-lg shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
          ref={menuRef}
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My Trips"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My Favorites"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My Reservations"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My Properties"
                />
                <MenuItem onClick={rentModal.onOpen} label="AirPh Home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Signup" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
