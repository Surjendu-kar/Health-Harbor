import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModernPaymentForm from "./ModernPaymentForm";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  price: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onClose,
  onPaymentSuccess,
  price,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={isMobile ? "xs" : "sm"}
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <DialogContent
        sx={{
          position: "relative",
          padding: isMobile ? 2 : 4,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <ModernPaymentForm
          onPaymentSuccess={onPaymentSuccess}
          onClose={onClose}
          price={price}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;