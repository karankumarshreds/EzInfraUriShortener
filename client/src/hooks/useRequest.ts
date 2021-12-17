import axios from 'axios';
import React from 'react';

// interface Params

export const useRequest = <T>(params: {
  url: string;
  method: 'get' | 'put' | 'post' | 'delete' | 'patch';
  payload: any;
  onSuccess: (data: T) => void;
  onError: () => void;
}): { errors: string[] | null; errorsMap: { [field: string]: string }; makeRequest: () => void; pending: boolean } => {
  const [pending, setPending] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<string[] | null>(null);
  const [errorsMap, setErrorsMap] = React.useState<{ [field: string]: string }>({});

  const makeRequest = async () => {
    try {
      setPending(true);
      const response = (await axios[params.method](params.url, { ...params.payload })) as { data: T };
      setPending(false);
      params.onSuccess(response.data);
    } catch (error: any) {
      setPending(false);
      const errorsArray: { message: string; field?: string }[] = error?.response?.data?.errors;
      if (errorsArray && errorsArray.length) {
        // setErrors(errorsArray.map((each) => each.message));
        let err: string[] = [];
        let map: { [field: string]: string } = {};
        errorsArray.forEach((el) => {
          if (el.field) {
            map[el.field] = el.message;
          } else {
            err.push(el.message);
          }
        });
        setErrorsMap(map);
        setErrors(err);
      } else setErrors(['Something went wrong']);
    }
  };
  return { errors, errorsMap, makeRequest, pending };
};

export default useRequest;
