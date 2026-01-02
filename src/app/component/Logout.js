import { doLogOut } from "../actions/login";


import React from 'react'

export default function Logout() {
  return (
    <form action={doLogOut}>
      <button
      name="action"
      value="logout"
      type="submit"
      >Logout</button>
    </form>
  )
}
