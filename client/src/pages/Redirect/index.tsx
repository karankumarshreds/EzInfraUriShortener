import React from 'react';
import { useParams } from 'react-router-dom';
import { UrlDetails } from '../../interfaces';
import useRequest from 'hooks/useRequest';
import { api } from 'api';
import { LocationContext } from 'context/location';
// components
import Four04 from 'components/404';
import Loading from 'pages/Loading';

const Redirect: React.FC = () => {
  const params = useParams<{ shortUrl: string }>();
  const [redirectUrl, setRedirectUrl] = React.useState('');
  const [id, setId] = React.useState<string | null>(null);
  const coordinates = React.useContext(LocationContext);

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
          await api.put(`/api/url/visits/${id}`, { coordinates: coordinates });
        } catch (error) {
          console.error(error);
        }
      };
      updatePageVisits();
    }
  }, [redirectUrl, id]);

  if (pending) return <Loading text="redirecting" />;

  if (!pending && redirectUrl) {
    // window.location.replace(redirectUrl);
    console.log(coordinates);
  }

  return pending ? <React.Fragment /> : <Four04 />;
};

export default Redirect;
