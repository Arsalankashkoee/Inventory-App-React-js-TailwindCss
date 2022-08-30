import { toast } from "react-toastify";
import FormDialog from "./DialogEdit";

const ProductsList = ({ productsList, setProductsList, categoryList }) => {
  const findCategoryTitle = (categoryId) => {
    return categoryList.find((category) => category.id === parseInt(categoryId))
      .title;
  };

  const deleteProductHandler = (product) => {
    const filteredProductList = productsList.filter(
      (p) => p.id !== parseInt(product.id)
    );
    setProductsList(filteredProductList);
    toast.success(`${product.title} was deleted successfully`);
  };

  return (
    <section className="max-w-screen-sm mx-auto p-4">
      <div className="mb-5">
        <h2 className="container text-xl text-slate-300 font-bold ">
          ProductsList
        </h2>
      </div>

      <div className="overflow-x-auto">
        {productsList.map((product) => {
          return (
            <section key={product.id} className=" mb-5">
              <div className="container flex items-center justify-between w-full min-w-[320px]">
                <span className="text-slate-400">{product.title}</span>
                <div className="flex items-center gap-3 ">
                  <span className="text-slate-400">
                    {new Date(product.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                  <span className="block px-3 py-1 text-slate-400 border border-slate-400 text-sm rounded-2xl">
                    {findCategoryTitle(product.category)}
                  </span>
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-500 border-2 border-slate-300 text-slate-300">
                    {product.quantity}
                  </span>
                  <span className="">
                    <FormDialog product={product} productsList={productsList} setProductsList={setProductsList} />
                  </span>
                  <button
                    className="delete-product px-3 py-1 rounded-2xl border border-red-400 text-red-400"
                    onClick={() => deleteProductHandler(product)}
                  >
                    delete
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsList;
