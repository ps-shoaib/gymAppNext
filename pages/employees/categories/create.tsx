
import { GetServerSideProps } from 'next'
import AddEditEmpCategoryComponent from '../../../src/components/AddEditEmpCategoryComponent'
import { parseCookies } from 'src/parseCookies'

const CreateEmployeeCategory = ({ data }) => {


    return (
        <AddEditEmpCategoryComponent data='' />
    )
}

export default CreateEmployeeCategory



// export const getServerSideProps: GetServerSideProps = async (context) => {

//     let CookieObj = parseCookies(context.req);



//     if (Object.keys(CookieObj).length == 0) {
//         return {
//             redirect: {
//                 destination: '/login?callbackUrl=https://gym-app.ps-beta.com/employees/categories/create',
//                 permanent: false
//             }
//         }
//     }


//     return {
//         props: {
//         }
//     }

// }