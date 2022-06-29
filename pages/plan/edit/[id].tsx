
import { GetServerSideProps } from "next";
import AddEditPlanComponent from "src/components/AddEditPlanComponent";
import { GetPlanById } from "src/Services/plansService";
import { parseCookies } from "src/parseCookies";


const CreateEmployeeCategory = ({ data }) => {


    return (
        <AddEditPlanComponent data={data} />
    )
}

export default CreateEmployeeCategory


export const getServerSideProps: GetServerSideProps = async (context) => {

    const { params } = context;

    const { id } = params;
    const { data } = await GetPlanById(parseInt(id.toString()));

    let CookieObj =  parseCookies(context.req);

  

    if(Object.keys(CookieObj).length == 0){
      return {
        redirect : {
          destination : `/login?callbackUrl=https://gym-app.ps-beta.com/plan/edit/${id}`,
          permanent : false
        }
      }
    }


    return {
        props: {
            data: data
        }
    }

}

// export async function getServerSideProps(context) {
//     const { params } = context;

//     const { id } = params;
//     const { data } = await GetPlanById(id);

//     return {
//         props: {
//             data: data
//         }
//     }

// }