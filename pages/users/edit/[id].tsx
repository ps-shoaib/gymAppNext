
import { GetServerSideProps } from "next";
import { parseCookies } from "src/parseCookies";
import AddEditUserComponent from "src/components/AddEditUserComponent";
import { GetUserById } from "src/Services/userService";


const Index = ({ data }) => {


    return (
        <AddEditUserComponent data={data} />
    )
}

export default Index


export const getServerSideProps: GetServerSideProps = async (context) => {

    const { params } = context;

    const { id } = params;
    const { data } = await GetUserById(id.toString());

    let CookieObj =  parseCookies(context.req);

  

    if(Object.keys(CookieObj).length == 0){
      return {
        redirect : {
          destination : `/login?callbackUrl=https://gym-app.ps-beta.com/users/edit/${id}`,
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