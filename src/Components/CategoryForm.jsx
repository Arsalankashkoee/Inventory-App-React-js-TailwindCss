import { useState } from "react";
import { toast } from "react-toastify";

const CategoryForm = ({ categoryList, setCategoryList }) => {
  const [isShow, setIsShow] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({
    title: "",
    description: "",
  });

  // Lifting to app.jsx
  // const [categoryList, setCategoryList] = useState([]);

  const cancelFormHandler = (e) => {
    e.preventDefault();
    setIsShow(false);
  };

  const changeHandler = (e) => {
    setCategoryFormData({
      ...categoryFormData,
      [e.target.name]: e.target.value,
    });
  };

  const addNewCategoryHandler = (e) => {
    e.preventDefault();
    if (categoryFormData.title === "" || categoryFormData.description === "") {
      toast.error("Fill title and description");
      return;
    } else {
      setCategoryList([
        ...categoryList,
        {
          ...categoryFormData,
          createdAt: new Date().toISOString(),
          id: new Date().getTime(),
        },
      ]);

      setCategoryFormData({ title: "", description: "" });
      setIsShow(false);
      toast.success(
        `${categoryFormData.title} was added successfully to your category`
      );
    }
  };

  return (
    <section className="max-w-screen-sm mx-auto p-4">
      <div
        className={`container mb-6 ${isShow ? "block" : "hidden"} `}
        id="category-wrapper"
      >
        <h2 className="text-xl text-slate-300 font-bold mb-2">
          Add New category
        </h2>
        <form className="bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4">
          <div>
            <label
              htmlFor="category-title"
              className="block mb-1 text-slate-400 cursor-pointer"
            >
              title
            </label>
            <input
              type="text"
              name="title"
              value={categoryFormData.title}
              onChange={changeHandler}
              id="category-title"
              className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto "
            />
          </div>

          <div>
            <label
              htmlFor="category-description"
              className="block mb-1 text-slate-400 cursor-pointer"
            >
              description
            </label>
            <textarea
              className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full resize-none"
              type=" text"
              name="description"
              value={categoryFormData.description}
              onChange={changeHandler}
              id="category-description"
            ></textarea>
          </div>

          <div className="flex items-center justify-between gap-x-4">
            <button
              className="flex-auto border border-slate-400 text-slate-400 rounded-xl py-2"
              id="cancel-add-category"
              onClick={cancelFormHandler}
            >
              Cancel
            </button>
            <button
              id="add-new-category"
              className="flex-auto bg-slate-500 text-slate-200 rounded-xl py-2"
              onClick={addNewCategoryHandler}
            >
              Add Category
            </button>
          </div>
        </form>
      </div>

      <button
        id="toggle-add-category"
        className={`text-slate-600 text-lg mb-4 font-medium px-6 mt-3 ${
          isShow ? "hidden" : "block"
        } `}
        onClick={() => setIsShow(!isShow)}
      >
        Add new Category?
      </button>
    </section>
  );
};

export default CategoryForm;
