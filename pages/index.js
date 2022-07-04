import { Grid } from "@mui/material";
import BlogCard from "../src/components/dashboard/BlogCard";
import SalesOverview from "../src/components/dashboard/SalseOverview";
import DailyActivity from "../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../src/components/dashboard/ProductPerfomance";
import { parseCookies } from "../src/parseCookies";
import Cookie from 'js-cookie'
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from '../src/Services/authService'
import Image from 'next/image'
import icon1 from '../assets/svgs/userCount.svg'
import icon2 from '../assets/svgs/creditCard.svg'
import icon3 from '../assets/svgs/cash.svg'

export default function Index() {

  const [DashboardDataObj, setDashboardDataObj] = useState({})
  useEffect(() => {
    // Cookie.set("abc", "333333");
    //  Cookie.
    console.log('API_URL In dashbaord cmpt', API_URL);
    axios.get(`${API_URL}/api/Dashboard`)
      .then(res => {
        console.log('dashboard data == ', res.data);
        setDashboardDataObj(res.data);
      })
  }, [])



  return (
    <Grid container spacing={0}>

      <div className='row g-5 g-sm-4 m-2 w-100 '>


        {/* public float DashboardDataObj.totalMembersLoginInLastMonth { get; set; }
        public float TotalMembersLogin { get; set; }

        public float TotalExpenses { get; set; }

        public float FeeTotal { get; set; } */}


        <div className='col-sm-4'>

          <div className={` bg-${'secondary'}  ${'card-xl-stretch mb-xl-8 rounded'}`} style={{ 'cursor': 'default' }}>
            {/* begin::Body */}
            <div className='card-body'>
              {/* <KTSVG path={svgIcon} className={`svg-icon-${iconColor} svg-icon-3x ms-n1`} /> */}
              <Image
                src={icon1}
                alt={icon1}
                width="40"
                height="40"
              // className="roundedCircle"
              />


              <div className={`fw-bold text-inverse-${'warning'} text-light fs-4 mt-2`}>{DashboardDataObj.totalMembersLogin}</div>

              <div className={`text-inverse-${'warning'} text-light fs-4 mb-2 mt-2`}>{'Total Members'}</div>
            </div>
            {/* end::Body */}
          </div>

        </div>

        <div className='col-sm-4'>

          <div className={` bg-${'danger'}  ${'card-xl-stretch mb-xl-8 rounded'}`} style={{ 'cursor': 'default' }}>
            {/* begin::Body */}
            <div className='card-body'>
              {/* <KTSVG path={svgIcon} className={`svg-icon-${iconColor} svg-icon-3x ms-n1`} /> */}
              <Image
                src={icon2}
                alt={icon2}
                width="40"
                height="40"
              />


              <div className={`fw-bold text-inverse-${'warning'}  text-light fs-4 mt-2`}>{DashboardDataObj.totalExpenses}</div>

              <div className={`text-inverse-${'warning'} text-light  fs-4 mb-2 mt-2`}>{'Total Expenses'}</div>

            </div>
            {/* end::Body */}
          </div>

        </div>

        <div className='col-sm-4'>

          <div className={` bg-${'primary'}  ${'card rounded'}`} style={{ 'cursor': 'default' }}>
            {/* begin::Body */}
            <div className='card-body'>
              {/* <KTSVG path={svgIcon} className={`svg-icon-${iconColor} svg-icon-3x ms-n1`} /> */}
              <Image
                src={icon3}
                alt={icon3}
                width="40"
                height="40"
              // className="roundedCircle"
              />


              <div className={`fw-bold text-inverse-${'primary'} text-light fs-4 mt-2`}>{DashboardDataObj.feeTotal}</div>

              <div className={`text-inverse-${'primary'} text-light  fs-4 mb-2 mt-2`}>{'Total Fee Collection'}</div>



            </div>
            {/* end::Body */}
          </div>

        </div>

      </div>

      <Grid item xs={12} lg={12}>
        <SalesOverview
          Dates={DashboardDataObj.lastThirtyDays}
          RevenueByDate={DashboardDataObj.lastThirtyDaysRevenue}
        />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}


    </Grid>
  );
}


export async function getServerSideProps(context) {
  let CookieObj = parseCookies(context.req);



  if (Object.keys(CookieObj).length == 0) {
    return {
      redirect: {
        destination: '/login?callbackUrl=https://gym-app.ps-beta.com',
        permanent: false
      }
    }
  }

  return {
    props: {
      CookieObj,
      data: 'Data form getServerSideProps'
    }
  }
}