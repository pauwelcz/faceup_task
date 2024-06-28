import { useState } from "react";

const useDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return {
    open,
    handleClickOpen,
    handleClickClose,
  };
};

export default useDialog;