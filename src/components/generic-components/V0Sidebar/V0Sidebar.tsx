import { styled } from "@mui/material";
import { useState } from "react";

const Sidebar = styled("aside")`
  width: 250px;
  padding: 2rem;
  border-right: 1px solid #333;
`;

const CategoryTitle = styled("h2")`
  font-size: 1rem;
  color: #999;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const CategoryList = styled("ul")`
  list-style-type: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const CategoryItem = styled("li")<{ active?: boolean }>`
  margin-bottom: 0.5rem;
  color: ${(props) => (props.active ? "#fff" : "#999")};
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #fff;
  }
`;

const Checkbox = styled("input")`
  margin-right: 0.5rem;
`;

export enum SidebarEnum {
  LIVING,
  FOLLOWED,
}

interface SidebarFilter {
  living: boolean;
  auto: boolean;
  gadget: boolean;
}

const V0Sidebar = () => {
  const [filters, setFilters] = useState<SidebarFilter>({
    living: false,
    auto: false,
    gadget: true,
  });

  const toggleFilter = (filter: string) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  return (
    <Sidebar>
      <CategoryTitle>Category</CategoryTitle>
      <CategoryList>
        <CategoryItem>
          <Checkbox
            type="checkbox"
            checked={filters.living}
            onChange={() => toggleFilter("living")}
          />
          Living
        </CategoryItem>
        <CategoryItem>
          <Checkbox
            type="checkbox"
            checked={filters.auto}
            onChange={() => toggleFilter("auto")}
          />
          Auto
        </CategoryItem>
        <CategoryItem active={true}>
          <Checkbox
            type="checkbox"
            checked={filters.gadget}
            onChange={() => toggleFilter("gadget")}
          />
          Gadget
        </CategoryItem>
      </CategoryList>
      <CategoryTitle>Price</CategoryTitle>
      <CategoryList>
        <CategoryItem>
          <Checkbox type="checkbox" />
          $0 - $500
        </CategoryItem>
        <CategoryItem>
          <Checkbox type="checkbox" />
          $501 - $1000
        </CategoryItem>
        <CategoryItem>
          <Checkbox type="checkbox" />
          $1001 - $2000
        </CategoryItem>
        <CategoryItem>
          <Checkbox type="checkbox" />
          $2001+
        </CategoryItem>
      </CategoryList>
    </Sidebar>
  );
};

export default V0Sidebar;
