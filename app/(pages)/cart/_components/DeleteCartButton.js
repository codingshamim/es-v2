"use client";

import { deleteCartItemById } from "@/app/backend/actions";
import useCommonState from "@/app/src/hooks/useCommonState";

export default function DeleteCartButton({ cartId }) {
  const { common, setCommon } = useCommonState();
  const handleDelete = async () => {
    try {
      const response = await deleteCartItemById(cartId);
      if (response.ok) {
        setCommon({
          ...common,
          toast: true,
          toastMessage: response?.message,
          toastSuccess: true,
        });
      } else {
        setCommon({
          ...common,
          toast: true,
          toastMessage: response?.message,
          toastSuccess: false,
        });
      }
    } catch (err) {
      setCommon({
        ...common,
        toast: true,
        toastMessage: err?.message,
        toastSuccess: false,
      });
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="variable-btn bg-red-600 hover:bg-red-400"
    >
      Delete
    </button>
  );
}
