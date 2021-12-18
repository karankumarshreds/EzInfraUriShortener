import React from 'react';
import { useParams } from 'react-router-dom';
import { UrlDetails } from '../../interfaces';
import useRequest from 'hooks/useRequest';
import Loading from 'pages/Loading';
import { api } from 'api';

const Redirect: React.FC = () => {
  const params = useParams<{ shortUrl: string }>();
  const [redirectUrl, setRedirectUrl] = React.useState('');
  const [id, setId] = React.useState<string | null>(null);

  const { pending, makeRequest } = useRequest<UrlDetails>({
    url: `/api/url/${params.shortUrl}`,
    method: 'get',
    payload: {},
    onSuccess: async (data) => {
      setRedirectUrl(data.url);
      setId(data.id);
    },
    onError: () => {},
  });

  React.useEffect(() => {
    makeRequest();
  }, [params.shortUrl]);

  React.useEffect(() => {
    if (redirectUrl && id) {
      const updatePageVisits = async () => {
        // send a request to increase the views
        try {
          await api.put(`/api/url/visits/${id}`);
        } catch (error) {
          console.error(error);
        }
      };
      updatePageVisits();
    }
  }, [redirectUrl, id]);

  if (pending) return <Loading text="redirecting" />;

  // if (!pending && redirectUrl) {
  //   window.location.replace(redirectUrl);
  // }

  return <React.Fragment />;
};

export default Redirect;
