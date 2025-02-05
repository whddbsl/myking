import { FilterComponent } from "./Filter.styles";

const Filter = () => {
  return (
    <FilterComponent>
      <button>필터</button>
      <button>최신순</button>
      <button>산</button>
      <button>모집상태</button>
      <button>연령</button>
      <button>성별</button>
    </FilterComponent>
  );
};

export default Filter;
