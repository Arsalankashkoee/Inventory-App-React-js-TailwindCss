import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ product, productsList, setProductsList }) {
  const [open, setOpen] = React.useState(false);

  const [inputValue, setInputValue] = React.useState("");

  const editHandler = () => {
    setOpen(true);
    setInputValue(product.title);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const confirmHandler = (id) => {
    const index = productsList.findIndex((product) => product.id === id);
    const selectedProduct = { ...productsList[index] };
    selectedProduct.title = inputValue;
    const updatedProducts = [...productsList];
    updatedProducts[index] = selectedProduct;
    setProductsList(updatedProducts);
    setOpen(false);
  };

  return (
    <div className="">
      <button
        variant="outlined"
        className="px-3 py-1 rounded-2xl bg-slate-700 text-slate-400"
        onClick={editHandler}
      >
        Edit
      </button>

      <Dialog open={open} onClose={closeHandler}>
        <DialogTitle>Edit</DialogTitle>

        <DialogContent>
          <input
            type="text"
            className="outline-none border border-slate-300 py-1 px-3 rounded-lg shadow-lg text-slate-600 "
            value={inputValue}
            onChange={changeHandler}
          />
        </DialogContent>

        <DialogActions className="relative">
          <button
            className=" absolute left-9 px-3 py-1 rounded-lg border border-red-400 text-red-400"
            onClick={closeHandler}
          >
            Cancel
          </button>
          <button
            className=" mr-7  px-3 py-1 rounded-lg bg-slate-500 text-slate-100"
            onClick={() => confirmHandler(product.id)}
          >
            Confirm
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
