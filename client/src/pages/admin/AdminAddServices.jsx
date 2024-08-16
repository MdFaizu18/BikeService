import React from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import { AdminContainer } from '../../assets/wrappers/AdminWrapper'
import AddServiceForm from '../../components/AddServiceForm'

const AdminAddServices = () => {
  return (
    <div>
      <AdminNavbar propName="Add Services" />
      <AdminContainer>
        <AddServiceForm />
      </AdminContainer>
    </div>
  )
}

export default AdminAddServices