import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'

const InputWrapper = ({ label, name, type = "text", value, onChange }) => {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">{label}</InputGroup.Text>
            <Form.Control
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
        </InputGroup>
    )
}

export default InputWrapper