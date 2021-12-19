import React from 'react';
import { AnalyticsResponse } from 'interfaces';
import useRequest from 'hooks/useRequest';
// material ui components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
// custom
import { ColorModeContext } from 'context/theme';
import Loading from 'pages/Loading';

const TableColumns = ['Short URL', 'Mapped URL', 'Total Visits', 'Unique Visits', 'Created At'];
const NestedColumns = ['Operating System', 'Device Details', 'Location'];

const Analytics: React.FC = () => {
  const colorMode = React.useContext(ColorModeContext);
  const [error, setError] = React.useState(false);
  const [response, setResponse] = React.useState<AnalyticsResponse | null>(null);

  const { pending, makeRequest } = useRequest<AnalyticsResponse>({
    url: `/api/url`,
    method: 'get',
    payload: {},
    onSuccess: (data) => {
      setResponse(data);
    },
    onError: () => {
      setError(true);
    },
  });

  React.useEffect(() => {
    makeRequest();
  }, []);

  if (pending || !response) return <Loading />;

  const renderRows = () => {
    return response.map((each, i: number) => {
      return (
        <Accordion key={i} sx={{ backgroundColor: `${colorMode.mode === 'light' ? '#fff' : '#14192e'}` }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'text.primary' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Box width={150} sx={{ px: 1, borderRight: '1px solid #efefef' }}>
              <Typography sx={{ color: 'text.secondary' }} variant="body2">
                {each.shortUrl}
              </Typography>
            </Box>
            <Box width={150} sx={{ px: 1, borderRight: '1px solid #efefef' }}>
              <Tooltip title={each.url}>
                <Typography sx={{ color: 'text.secondary' }} variant="body2">
                  {each.url.slice(0, 17)}...
                </Typography>
              </Tooltip>
            </Box>
            <Box width={150} sx={{ px: 1, borderRight: '1px solid #efefef' }}>
              <Typography sx={{ color: 'text.secondary' }} variant="body2">
                {each.views}
              </Typography>
            </Box>
            <Box width={150} sx={{ px: 1, borderRight: '1px solid #efefef' }}>
              <Typography sx={{ color: 'text.secondary' }} variant="body2">
                {each.visits.length}
              </Typography>
            </Box>
            <Box width={200} sx={{ px: 1, borderRight: '1px solid #efefef' }}>
              <Typography sx={{ color: 'text.secondary' }} variant="body2">
                {new Date(each.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Paper
              elevation={0}
              key={`${i}_${new Date()}`}
              sx={{ pl: 3, py: 3, backgroundColor: `${colorMode.mode === 'light' ? '#fafafa' : '#070a1a'}` }}>
              <Typography sx={{ pb: 1, color: 'text.secondary', fontWeight: 600 }} variant="h6">
                Visitors Information
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                {NestedColumns.map((th: string) => (
                  <Box
                    width={'30%'}
                    sx={{
                      px: 1,
                      py: 1,
                      border: '1px solid #efefef',
                    }}
                    key={th}>
                    <Typography sx={{ color: 'text.primary' }} variant="body2">
                      {th}
                    </Typography>
                  </Box>
                ))}
              </div>

              {each.visits.map((info: any, k: number) => (
                <div style={{ display: 'flex', width: '100%' }} key={`${k}_${new Date()}`}>
                  <Box
                    width={'30%'}
                    sx={{
                      px: 1,
                      py: 1,
                      border: '1px solid #efefef',
                    }}>
                    <Typography sx={{ color: 'text.secondary' }} variant="body2">
                      {info.analytics.os.name} {` `} {info.analytics.os.version}
                    </Typography>
                  </Box>
                  <Box
                    width={'30%'}
                    sx={{
                      px: 1,
                      py: 1,
                      border: '1px solid #efefef',
                    }}>
                    <Typography sx={{ color: 'text.secondary' }} variant="body2">
                      {info.analytics.device.type} {` `} {info.analytics.client.name}
                    </Typography>
                  </Box>
                  <Box
                    width={'30%'}
                    sx={{
                      px: 1,
                      py: 1,
                      border: '1px solid #efefef',
                    }}>
                    <Typography sx={{ color: 'text.secondary' }} variant="body2">
                      {info.location}
                    </Typography>
                  </Box>
                </div>
              ))}
            </Paper>
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  return (
    <div style={{ paddingTop: 100 }}>
      <Typography variant="h4" fontWeight={600} sx={{ color: 'text.primary' }}>
        Detailed Analytics
      </Typography>
      <br />
      <br />

      <Paper sx={{ display: 'flex', px: 2, py: 3, backgroundColor: `${colorMode.mode === 'light' ? '#fff' : '#14192e'}` }}>
        {TableColumns.map((each: string) => (
          <Box width={each === 'Created At' ? 200 : 150} sx={{ px: 1, borderRight: '1px solid #efefef' }} key={each}>
            <Typography sx={{ color: 'text.primary' }} variant="subtitle2">
              {each}
            </Typography>
          </Box>
        ))}
      </Paper>
      {renderRows()}
      <br />
      <br />
      <br />
    </div>
  );
};

export default Analytics;
