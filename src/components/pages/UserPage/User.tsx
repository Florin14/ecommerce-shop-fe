import React from 'react'
import GenericForm from '../../generic-components/GenericForm/GenericForm'
import { styled } from '@mui/material'

const UserPage: React.FC = () => {
 return (<Container><GenericForm/></Container>)
}

export default UserPage

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
  gap: 20px;
  padding-top: 80px;
`;
