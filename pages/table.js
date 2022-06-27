import { Grid } from "@mui/material";
import ProductPerfomance from "../src/components/dashboard/ProductPerfomance";
import { parseCookies } from "../src/parseCookies";

const Tables = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ProductPerfomance />
      </Grid>
    </Grid>
  );
};

export default Tables;


export async function getServerSideProps(context){

  

  return {
    props : {
    }
  }
}