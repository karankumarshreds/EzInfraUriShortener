import React from 'react';
import { api } from 'api';
import { AxiosError } from 'axios';

// interface Params

export const useRequest = <T>(params: {
  url: string;
  method: 'get' | 'put' | 'post' | 'delete' | 'patch';
  payload: any;
  onSuccess: (data: T) => void;
  onError: (error: AxiosError) => void;
}): { errors: string[] | null; errorsMap: { [field: string]: string }; makeRequest: () => void; pending: boolean } => {
  const [pending, setPending] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<string[] | null>(null);
  const [errorsMap, setErrorsMap] = React.useState<{ [field: string]: string }>({});

  const makeRequest = async () => {
    try {
      setPending(true);
      setErrors(null);
      setErrorsMap({});
      const response = (await api[params.method](params.url, { ...params.payload })) as { data: T };
      setPending(false);
      params.onSuccess(response.data);
    } catch (error: AxiosError | any) {
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
        params.onError(error);
      } else setErrors(['Something went wrong']);
    }
  };
  return { errors, errorsMap, makeRequest, pending };
};

export default useRequest;
