import { useEffect, useState } from "react";
import CategoryForm from "./Components/CategoryForm";
import Navbar from "./Components/Navbar";
import ProductsList from "./Components/ProductsList";
import ProductsForm from "./Components/ProductsForm";
import FilterSearchComponent from "./Components/FilterSearchComponent";

function App() {
  const [categoryList, setCategoryList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sort, setSort] = useState("newest");
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const searchHandler = (e) => {
    setSearchValue(e.target.value.trim().toLowerCase());
  };

  const sortHandler = (e) => {
    setSort(e.target.value);
  };

  const selectedCategoryHandler = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filterSearchTitle = (array) => {
    return array.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    );
  };

  const sortDate = (array) => {
    let sortedProducts = [...array];

    return sortedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
  };

  const filterSelectedCategory = (array) => {
    if (!selectedCategory) {
      return array;
    }
    return array.filter((product) => product.category === selectedCategory);
  };

  useEffect(() => {
    //? filteredProducts!
    let result = productsList;
    result = filterSearchTitle(result);
    result = filterSelectedCategory(result);
    result = sortDate(result);
    setFilteredProducts(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsList, sort, searchValue, selectedCategory]);

  // LocalStorage
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    setProductsList(savedProducts);
    setCategoryList(savedCategories);
  }, []);

  useEffect(() => {
    if (productsList.length) {
      localStorage.setItem("products", JSON.stringify(productsList));
    }
  }, [productsList]);

  useEffect(() => {
    if (categoryList.length) {
      localStorage.setItem("categories", JSON.stringify(categoryList));
    }
  }, [categoryList]);

  return (
    <section className="">
      <Navbar productsList={productsList} />

      <div className="container max-w-screen-sm mx-auto p-4">
        <CategoryForm
          categoryList={categoryList}
          setCategoryList={setCategoryList}
        />

        <ProductsForm
          categoryList={categoryList}
          productsList={productsList}
          setProductsList={setProductsList}
        />

        <FilterSearchComponent
          onSort={sortHandler}
          sort={sort}
          onSearch={searchHandler}
          searchValue={searchValue}
          categoryList={categoryList}
          selectedCategory={selectedCategory}
          onSelectCategory={selectedCategoryHandler}
        />

        <ProductsList
          // productsList={productsList}
          productsList={filteredProducts}
          setProductsList={setProductsList}
          categoryList={categoryList}
        />
      </div>
    </section>
  );
}

export default App;
