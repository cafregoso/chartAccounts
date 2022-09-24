import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <Fragment>
        <Outlet />
    </Fragment>
  )
}
