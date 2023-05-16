import { create } from "zustand";

interface FooterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useFooterModal = create<FooterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFooterModal;
