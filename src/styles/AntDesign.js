import styled from "styled-components";
import { Form, Table } from "antd";
import { Breakpoints } from "./Breakpoints";

export const AntDesignTable = styled(Table)`
    max-width: 1440px;
    margin: 0 auto;

  .ant-table-tbody > tr.ant-table-row > td {
    background: var(--lumber);
    color: var(--dark);
    font-size: 1.3rem;

    ${Breakpoints.md} {
      font-size: 1.1rem;
    }

    ${Breakpoints.sm} {
      font-size: 1rem;
      padding: 0.5rem;
    }
  }

  .ant-table-column-title {
    font-size: 1.5rem;
  }

  .ant-table-thead tr th {
    background: var(--primary);
    color: var(--light);
    font-size: 1.5rem;
    font-family: "Khand", sans-serif;

    ${Breakpoints.md} {
      font-size: 1.3rem;
    }

    ${Breakpoints.sm} {
      font-size: 1.1rem;
      padding: 0.5rem;
    }
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: var(--light-red);
    color: var(--dark);
  }
  .ant-table-content {
    border: 1px solid var(--light);
  }
  a {
    color: var(--dark);
  }

  .anticon > svg {
    color: var(--red);
  }

  .ant-checkbox-checked.ant-checkbox-inner {
    background-color: var(--primary);
    border-color: var(--primary);
  }

  .ant-dropdown-menu-item-selected {
    color: var(--primary);
  }
`;

export const AntDesignForm = styled(Form)`
  background-color: transparent;
  margin: 0rem auto;
  padding: 1rem;
  max-width: 1000px;
`;

export const AntDesignFormItem = styled(Form.Item)`
  label {
    color: var(--light);
    font-size: 1.3rem;
  }
  .ant-form-item-control-input {
    color: var(--light);
  }

  .ant-input{
    font-size: 1.3rem;
  }

  .ant-switch-handle::before {
    background: #ff5757;
  }
  .ant-switch,
  .ant-switch-checked {
    background: var(--light);
  }

  .ant-form-item-explain-error {
    text-align: left;
  }
`;
