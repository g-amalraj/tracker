import React, { useEffect } from 'react';
import ModalContainer from './common/ModalContainer';
import InputWrapper from './common/InputWrapper';

const UpdateUserModal = ({ show,handleRoleChange, setShow, handleSubmit, handleInputChange, userDetails, title, okText = "Submit" }) => {
    const roles = [
        { value: "User", label: "User" },
        { value: "Admin", label: "Admin" },
        { value: "Manager", label: "Manager" },

    ];

 

    return (
        <ModalContainer title={title} show={show} setShow={setShow} handleSubmit={handleSubmit} ok={okText}>
            <form encType="multipart/form-data gap-4" className="container " >
                <InputWrapper label="Name" value={userDetails.name} onChange={handleInputChange} name={"name"} style={{ color: 'black' }} />
                <InputWrapper label="Phone" value={userDetails.phone} onChange={handleInputChange} name={"phone"} style={{ color: 'black' }} />
                <InputWrapper label="Email" value={userDetails.email} onChange={handleInputChange} name={"email"} style={{ color: 'black' }} />
                <InputWrapper label="Place" value={userDetails.place} onChange={handleInputChange} name={"place"} style={{ color: 'black' }} />
                <InputWrapper label="Password" value={userDetails.password} onChange={handleInputChange} name={"password"} style={{ color: 'black' }} />
                <div className="d-flex mb-3">
                    <div className="input-group-prepend">
                        <label
                            className="input-group-text"
                            htmlFor="inputGroupSelect01"
                            style={{ borderRadius: '0.25rem 0 0 0.25rem', color: 'black' }}>Role</label>
                    </div>
                    <select
                        name='role'
                        className="custom-select w-100 px-2 border"
                        id="inputGroupSelect01"
                        value={userDetails.role}
                        onChange={(e) => handleRoleChange(e.target.value)}
                        style={{ color: 'black' }}>
                        {roles.map((role) => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </ModalContainer >
    );
};


export default UpdateUserModal;
