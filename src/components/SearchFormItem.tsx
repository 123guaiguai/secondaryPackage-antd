import { FC, FormEvent, PropsWithChildren, useContext } from 'react';
import { Form, Input } from 'antd';
import { formContext } from './SearchForm';
import styles from "../styles/form.module.less"

export type SearchFormItemProps={
    name: string;
    label: string;
    inputType: string;
    restProps?:any[]
}

const SearchFormItem:FC<PropsWithChildren<SearchFormItemProps>> = ({ children, name, label, inputType,...restProps }) => {
  
  const form=useContext(formContext)

  const handleChange = (event: FormEvent<HTMLElement>) => {
    form?.setFieldValue(name,(event.target as HTMLInputElement).value)
  };
  
  return (
    <Form.Item className={styles.formItem} name={name} label={label} {...restProps}>
      {inputType === 'input' ? <Input /> :<div onChange={handleChange}>{children}</div>}
    </Form.Item>
  );
};

export default SearchFormItem;
