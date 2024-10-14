import { styled } from "@mui/material";
import React from "react";

const V0Breadcrumb = () => {
  return (
    <Breadcrumb>
      <BreadcrumbItem href="#">Category</BreadcrumbItem>
      <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
      <BreadcrumbItem href="#">Homepage</BreadcrumbItem>
      <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
      <BreadcrumbItem href="#">Gadget</BreadcrumbItem>
      <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
      <BreadcrumbItem href="#">Apple Official Store</BreadcrumbItem>
    </Breadcrumb>
  );
};

export default V0Breadcrumb;

const Breadcrumb = styled("nav")`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BreadcrumbItem = styled("a")`
  color: #999;
  text-decoration: none;

  &:hover {
    color: #fff;
  }

  &:last-child {
    color: #fff;
    pointer-events: none;
  }
`;

const BreadcrumbSeparator = styled("span")`
  color: #666;
`;
