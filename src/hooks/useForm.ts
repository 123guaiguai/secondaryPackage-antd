import { useState } from 'react';

const useForm = () => {
  const [form] = useState(() => ({
    getFieldsValue: () => ({}),
    resetFields: () => {},
    validateFields: () => Promise.resolve({}),
  }));

  return form;
};

export default useForm;
