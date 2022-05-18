import styled from "styled-components";
import { Form, Input, Modal, Table, Tabs, Progress } from "antd";
import { Breakpoints } from "./Breakpoints";

export const AntDesignTable = styled(Table)`
  max-width: 1440px;
  margin: 0 auto;

  .ant-table-tbody > tr.ant-table-row > td {
    background: var(--color-lumber);
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
    background: var(--color-primary);
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

  .ant-dropdown-menu-title-content {
    color: var(--dark);
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
    color: var(--color-red);
  }

  .ant-checkbox-checked.ant-checkbox-inner {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }

  .ant-dropdown-menu-item-selected {
    color: var(--color-primary);
  }

  .ant-table-thead th.ant-table-column-has-sorters:hover {
    background-color: var(--color-primary);
  }

  .ant-tag {
    font-size: 1.3rem;
    padding: 0.25rem 0.5rem;
    text-transform: uppercase;
    font-family: "Khand", sans-serif;
    min-width: 100px;
    text-align: center;
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

  .ant-input {
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
    color: ${(props) =>
      props.admin ? "var(--text-light)" : "var(--color-red)"};
  }

  .ant-select-status-error.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
    .ant-select-selector,
  .ant-input-number-status-error:not(.ant-input-number-disabled):not(.ant-input-number-borderless).ant-input-number,
  .ant-picker-status-error.ant-picker,
  .ant-picker-status-error.ant-picker:not([disabled]):hover,
  .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input {
    border-color: ${(props) =>
      props.admin
        ? "var(--color-primary)!important"
        : "var(--color-red)!important"};
  }
  .ant-select-selection-item {
    color: var(--dark);
  }
`;

export const AntDesignTab = styled(Tabs)`
  padding: 0.5rem 0;
  border-radius: 8px;
  .ant-tabs-ink-bar {
    background: var(--color-red);
  }
  .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    width: 2px;
  }
  div.ant-tabs-content-holder {
    border-left: 2px solid #f0f0f0;
    margin-left: -2px;
    div.ant-tabs-content {
      div.ant-tabs-tabpane {
        padding: 0 16px;
      }
    }
  }
`;

export const AntDesignSearch = styled(Input.Search)`
  margin-right: 0.5rem;

  .ant-btn-primary {
    border-color: var(--blue-magenta);
    background: var(--blue-magenta);
  }

  .ant-btn-primary:hover {
    border-color: var(--blue-magenta);
    background: var(--blue-magenta);
  }
`;

export const AntDesignModal = styled(Modal)`
  .ant-modal-title {
    font-size: 1.5rem;
    font-family: "Changa", sans-serif;
    font-weight: 700;
    text-align: center;
  }

  label {
    color: #000;
    text-align: left;
    display: block;
  }

  .ant-form-item-label
    > label.ant-form-item-required:not(.ant-form-item-required-mark-optional):before {
    display: none;
  }

  span {
    font-size: 1.3rem;
    font-family: "Khand", sans-serif;
  }

  .ant-btn-primary {
    height: auto;
    background-color: var(--color-primary);
  }

  .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
    padding: 4px 0;
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: auto;
  }
`;

export const AntDesignProgress = styled(Progress)`
  .ant-progress-bg {
    background-color: #ce9ad9;
  }

  .ant-progress-text {
    color: var(--text-light);
  }
`;
