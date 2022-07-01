
import { GetServerSideProps, GetStaticProps } from 'next'
import AddEditExpenseComponent from 'src/components/AddEditExpenseComponent'

import { parseCookies } from 'src/parseCookies'

const CreateEmployeeCategory = ({ data }) => {


    return (
        <AddEditExpenseComponent data='' />
    )
}

export default CreateEmployeeCategory



// export const getServerSideProps: GetServerSideProps = async (context) => {

//     let CookieObj =  parseCookies(context.req);

  

//     if(Object.keys(CookieObj).length == 0){
//       return {
//         redirect : {
//           destination : '/login?callbackUrl=https://gym-app.ps-beta.com/expenses/create',
//           permanent : false
//         }
//       }
//     }

//     return {
//         props: {
//         }
//     }

// }



