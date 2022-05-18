import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { SweetAlertWarning } from "../../models/models";
import {
  deleteConnectionAction,
  getConnectionAction,
  postConnectionAction,
  putConnectionAction,
} from "../../redux/actions";
import { AntDesignForm, AntDesignFormItem } from "../../styles/AntDesign";
import { StyledButton } from "../../styles/Styles";

export default function Connection() {
  const connection = useSelector((state) => state.ConnectionReducer.connection);
  const dispatch = useDispatch();

  const initialConnection = {
    _id: "",
    tmdbID: "",
    cybersoftID: "",
  };

  const [input, setInput] = useState(initialConnection);

  const { tmdbID, cybersoftID, _id: id } = input;

  const formData = { tmdbID, cybersoftID };

  const alertWarning = new SweetAlertWarning();

  const warning = () => {
    alertWarning.showConfirmButton = true;
    // alertWarning.confirmButtonText = "Login";
    alertWarning.title = "Oops, Something Went Wrong";
    alertWarning.showCancelButton = true;
    alertWarning.timer = "3000";
    alertWarning.timerProgressBar = "true";
    return Swal.fire({ ...alertWarning });
  };

  const handleUpdate = () => {
    if (id !== "") {
      return dispatch(putConnectionAction(formData, id));
    }

    return warning();
  };

  const handleCreate = () => {
    if (id === "" && tmdbID !== "" && cybersoftID !== "") {
      return dispatch(postConnectionAction(formData));
    }
    return warning();
  };

  const handleDelete = () => {
    if (id !== "") {
      return dispatch(deleteConnectionAction(id));
    }

    return warning();
  };

  useEffect(() => {
    dispatch(getConnectionAction());
  }, [dispatch]);

  const initialValues = [
    { name: ["tmdbID"], value: input.tmdbID },
    {
      name: ["cybersoftID"],
      value: input.cybersoftID,
    },
    { name: ["mongodbID"], value: input._id },
  ];

  const Form = () => (
    <AntDesignForm
      labelCol={{ span: 6 }}
      fields={initialValues}
      style={{ padding: "1rem 0 0" }}
    >
      <AntDesignFormItem label="Mongodb" name="mongodbID">
        <Input disabled />
      </AntDesignFormItem>

      <AntDesignFormItem
        label="Cybersoft"
        name="cybersoftID"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input
          onChange={(e) => setInput({ ...input, cybersoftID: e.target.value })}
        />
      </AntDesignFormItem>

      <AntDesignFormItem
        label="TMDB"
        name="tmdbID"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input
          onChange={(e) => setInput({ ...input, tmdbID: e.target.value })}
        />
      </AntDesignFormItem>
    </AntDesignForm>
  );

  return (
    <div>
      <Select
        style={{ width: "100%" }}
        onChange={(value) =>
          setInput(connection.filter((i) => i._id === value)[0])
        }
      >
        {connection.map((i, idx) => (
          <Select.Option key={idx} value={i._id}>
            {i.cybersoftID}
          </Select.Option>
        ))}
      </Select>

      {Form()}

      <S.Grid>
        <div>
          <StyledButton onClick={handleCreate}>Create</StyledButton>
        </div>
        <div>
          <StyledButton onClick={handleUpdate}>Update</StyledButton>
        </div>
        <div>
          <StyledButton onClick={() => setInput(initialConnection)}>
            Reset
          </StyledButton>
        </div>
        <div>
          <StyledButton onClick={handleDelete}>Delete</StyledButton>
        </div>
      </S.Grid>
    </div>
  );
}

const S = {
  Grid: styled.div`
    display: grid;
    row-gap: 1rem;
    grid-template-columns: 1fr 1fr;
  `,
};
