import { styled } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const BreadcrumbContainer = styled("div")`
  padding: 0.5rem 2rem;
  background: #1a1a1a;
  border-bottom: 1px solid #333;
`;

const BreadcrumbList = styled("div")`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #999;
  font-size: 0.875rem;
`;

const BreadcrumbLink = styled(Link)`
  color: #999;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: white;
  }

  &:last-child {
    color: white;
    pointer-events: none;
  }
`;

const BreadcrumbSeparator = styled(ChevronRight)`
  width: 16px;
  height: 16px;
  color: #666;
`;

interface BreadcrumbMapping {
  [key: string]: string;
}

const pathNames: BreadcrumbMapping = {
  admin: "Admin",
  products: "Products",
  categories: "Categories",
  brands: "Brands",
  users: "Users",
  add: "Add New",
  profile: "Profile",
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  // Generate breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const displayName = pathNames[segment] || segment;

    return {
      name: displayName,
      url: url,
    };
  });

  // Add home as first item
  breadcrumbItems.unshift({
    name: "Homepage",
    url: "/home",
  });

  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={item.url} style={{ display: "flex", alignItems: "center" }}>
            <BreadcrumbLink to={item.url}>{item.name}</BreadcrumbLink>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
