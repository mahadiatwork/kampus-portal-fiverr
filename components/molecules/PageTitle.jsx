import React from 'react'
import HeaderText from "@/components/atoms/HeaderText";
import HelperText from "@/components/atoms/HelperText";

const PageTitle = ({headerText,helperText}) => {
  return (
    <>
    <HeaderText headerText={headerText}/>
    <HelperText helperText={helperText}/>
    </>
  )
}

export default PageTitle