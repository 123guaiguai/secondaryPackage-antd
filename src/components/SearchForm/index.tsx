import React, { PropsWithChildren, createContext } from "react";
import { Form, Button, FormInstance } from 'antd';
import { FC } from 'react';
import styles from "../../styles/form.module.less"

type SearchFormProps = {
  onValuesChange: any;
  formLayout: number;
  onSearch: any;
  onReset: any;
}

interface ISearchForm extends FC<PropsWithChildren<SearchFormProps>>{
  Item?: any
}

export const formContext=createContext<FormInstance|null>(null)

const SearchForm: ISearchForm = ({ onValuesChange, formLayout = 1, onSearch, onReset, children }) => {
  const [form] = Form.useForm();

  const handleSearch = () => {
    form.validateFields().then(values => {
      if (onSearch) {
        onSearch(values, null, form);
      }
    }).catch(errors => {
      if (onSearch) {
        onSearch(null, errors, form);
      }
    });
  };

  const handleReset = () => {
    form.resetFields();
    if (onReset) {
      onReset(form.getFieldsValue(), form);
    }
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      onValuesChange={onValuesChange}
      className={styles.form}
    >
      <formContext.Provider value={form}>
        {children}
      </formContext.Provider>
      <Form.Item>
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button onClick={handleReset} style={{ marginLeft: 8 }}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
