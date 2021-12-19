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
  const [four04, setfour04] = React.useState(false);
  const coordinates = React.useContext(LocationContext);

  const { pending, makeRequest } = useRequest<UrlDetails>({
    url: `/api/url/${params.shortUrl}`,
    method: 'get',
    payload: {},
    onSuccess: async (data) => {
      setRedirectUrl(data.url);
      setId(data.id);
    },
    onError: (error) => {
      // @ts-ignore
      if (error.response.status) setfour04(true);
    },
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

  if (!pending && redirectUrl) {
    window.location.replace(redirectUrl);
  }

  return four04 ? <Four04 /> : <Loading text="redirecting" />;
};

export default Redirect;
