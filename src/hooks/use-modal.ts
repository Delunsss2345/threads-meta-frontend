import { hideModal, showModal } from "@/features/modal";
import { useAppDispatch } from "@/store";
import { useCallback, type ReactNode } from "react";

export function useModal() {
  const dispatch = useAppDispatch();
  const show = useCallback(
    (modal: ReactNode) => {
      dispatch(
        showModal({
          modal: () => modal,
        })
      );
    },
    [dispatch]
  );

  const hide = useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  return { show, hide };
}
