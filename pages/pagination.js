import { Grid, Pagination, Stack } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import { parseCookies } from "../src/parseCookies";
// import https from "react";
import Cookie from 'js-cookie'
import { https, Agent } from 'https';
import axios from "axios";
import reactDom from "react-dom";
const Paginations = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Paginations">
          <Stack spacing={2}>
            <Pagination count={10} />
            <Pagination count={10} color="primary" />
            <Pagination count={10} color="secondary" />
            <Pagination count={10} disabled />
          </Stack>
        </BaseCard>
      </Grid>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Outlined Paginations">
          <Stack spacing={2}>
            <Pagination count={10} variant="outlined" />
            <Pagination count={10} variant="outlined" color="primary" />
            <Pagination count={10} variant="outlined" color="secondary" />
            <Pagination count={10} variant="outlined" disabled />
          </Stack>
        </BaseCard>
      </Grid>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Squred Paginations">
          <Stack spacing={2}>
            <Pagination count={10} shape="rounded" variant="outlined" />
            <Pagination
              count={10}
              shape="rounded"
              variant="outlined"
              color="primary"
            />
            <Pagination
              count={10}
              shape="rounded"
              variant="outlined"
              color="secondary"
            />
            <Pagination
              count={10}
              shape="rounded"
              variant="outlined"
              disabled
            />
          </Stack>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default Paginations;


export async function getServerSideProps(context) {
  const CookieObj = parseCookies(context.req);




  console.log('CookieObj == ');
  console.log(CookieObj);


  const agent = new Agent({
    rejectUnauthorized: false
  });

  const { data } = await axios.get('https://localhost:44303/api/Administration/AllUsers', {
    httpsAgent: agent
  });

  console.log('All users data == ', data);


  if (Object.keys(CookieObj).length == 0) {

    return {
      redirect: {
        destination: '/login?callbackUrl=http://localhost:3000/pagination',
        permanent: false
      }
    }
  }

  return {
    props: {
      CookieObj
    }
  }
}