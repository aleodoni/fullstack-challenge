import { useState } from 'react';

import api from '../service/api';

type Method = 'get' | 'post' | 'put' | 'delete';

type Params = {
  url: string;
  method: Method;
  body: any,
  onSuccess(data: any): any;
}

function useRequest({ url, method, body , onSuccess }: Params) {
  const [errors, setErrors] = useState(null);

  async function doRequest() {
    try {
      setErrors(null);
      const response = await api[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err: any) {
      setErrors(err.message);
    }
  }

  return { doRequest, errors };
}

export default useRequest;
