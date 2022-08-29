import { useState } from "react";
import { toast } from "react-toastify";

const ProductsForm = ({ categoryList, productsList, setProductsList }) => {
  const [productFormData, setProductFormData] = useState({
    title: "",
    quantity: "",
    category: "",
  });

  // Lifting to app.jsx
  // const [productsList, setProductsList] = useState([]);

  const changeHandler = (e) => {
    setProductFormData({
      ...productFormData,
      [e.target.name]: e.target.value,
    });
  };

  const addNewProductHandler = (e) => {
    e.preventDefault();
    if (
      productFormData.title === "" ||
      productFormData.quantity === "" ||
      productFormData.category === ""
    ) {
      toast.error("Fill title and quantity and category");
      return;
    } else {
      setProductsList([
        ...productsList,
        {
          ...productFormData,
          createdAt: new Date().toISOString(),
          id: new Date().getTime(),
        },
      ]);

      setProductFormData({ title: "", quantity: "", category: "" });
      toast.success(`${productFormData.title} was added successfully`);
    }
  };

  return (
    <section className="max-w-screen-sm mx-auto p-4">
      <div className="container mb-6">
        <h2 className="text-xl text-slate-300 font-bold mb-2">
          Add New Product
        </h2>

        <form className="bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4">
          <div>
            <label
              htmlFor="product-title"
              className="block mb-1 text-slate-400 cursor-pointer"
            >
              title
            </label>
            <input
              type="text"
              name="title"
              value={productFormData.title}
              onChange={changeHandler}
              id="product-title"
              className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
            />
          </div>

          <div>
            <label
              htmlFor="product-quantity"
              className="block mb-1 text-slate-400 cursor-pointer"
            >
              quantity
            </label>
            <input
              className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
              type="number"
              name="quantity"
              value={productFormData.quantity}
              onChange={changeHandler}
              id="product-quantity"
            />
          </div>

          <div>
            <label
              htmlFor="product-category"
              className="block mb-1 text-slate-400 cursor-pointer"
            >
              category
            </label>
            <select
              name="category"
              value={productFormData.category}
              onChange={changeHandler}
              id="product-category"
              className="bg-transparent text-slate-400 rounded-xl w-full"
            >
              <option className="bg-slate-500 text-slate-300" value="">
                select a category
              </option>

              {categoryList.map((category) => {
                return (
                  <option
                    key={category.id}
                    className="bg-slate-500 text-slate-300"
                    value={category.id}
                  >
                    {category.title}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex items-center justify-between gap-x-4">
            <button
              id="add-new-product"
              className="flex-1 bg-slate-500 text-slate-200 rounded-xl py-2"
              onClick={addNewProductHandler}
            >
              Add new Product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProductsForm;
