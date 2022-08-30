const FilterSearchComponent = ({
  onSort,
  sort,
  onSearch,
  searchValue,
  categoryList,
  selectedCategory,
  onSelectCategory,
}) => {
  // Lifting to app.js
  //   const [sort, setSort] = useState("newest");
  //   const [searchValue, setSearchValue] = useState("");

  //   const searchHandler = (e) => {
  //     setSearchValue(e.target.value);
  //     const value = e.target.value.trim().toLowerCase();
  //     const filteredProducts = productsList.filter((product) =>
  //       product.title.toLowerCase().includes(value)
  //     );
  //     setFilteredProducts(filteredProducts);
  //   };

  //   const sortHandler = (e) => {
  //     setSort(e.target.value);
  //     let sortedProducts = [...productsList];

  //     sortedProducts.sort((a, b) => {
  //       if (e.target.value === "newest") {
  //         return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
  //       } else if (e.target.value === "oldest") {
  //         return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
  //       }
  //     });
  //     setFilteredProducts(sortedProducts);
  //   };

  return (
    <section className="max-w-screen-sm mx-auto p-4">
      <div className="mb-5">
        <div className=" container flex items-center justify-between ">
          <label
            htmlFor="search-input"
            className="text-slate-500 text-lg cursor-pointer"
          >
            search
          </label>
          <input
            type="text"
            name="search-input"
            id="search-input"
            placeholder="Search ..."
            className="bg-transparent rounded-xl border border-slate-500 text-slate-400"
            value={searchValue}
            onChange={onSearch}
          />
        </div>
      </div>

      <div className="mb-5">
        <div className="container flex items-center justify-between mb-6">
          <label htmlFor="sort-products" className="text-slate-500 text-lg">
            sort
          </label>
          <select
            name="sort-products"
            id="sort-products"
            className="bg-transparent text-slate-400 rounded-xl border border-slate-500"
            value={sort}
            onChange={onSort}
          >
            <option className="bg-slate-500 text-slate-300" value="">
              select a category
            </option>
            <option className="bg-slate-500 text-slate-300" value="newest">
              newest
            </option>
            <option className="bg-slate-500 text-slate-300" value="oldest">
              oldest
            </option>
          </select>
        </div>
      </div>

      <div className="container flex items-center justify-between mb-6">
        <label htmlFor="sort-products" className="text-slate-500 text-lg">
          Filter Category
        </label>
        <select
          name="sort-products"
          id="sort-products"
          className="bg-transparent text-slate-400 rounded-xl border border-slate-500"
          value={selectedCategory}
          onChange={onSelectCategory}
        >
          <option className="bg-slate-500 text-slate-300" value="">
            All
          </option>
          {categoryList.map((category) => {
            return (
              <option
                className="bg-slate-500 text-slate-300"
                value={category.id}
                key={category.id}
              >
                {category.title}
              </option>
            );
          })}
        </select>
      </div>
    </section>
  );
};

export default FilterSearchComponent;
