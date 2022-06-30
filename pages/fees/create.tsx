
import { GetServerSideProps, GetStaticProps } from 'next'
import AddEditFeeComponent from 'src/components/AddEditFeeComponent'
import AddEditEmployeeComponent from '../../src/components/AddEditEmployeeComponent'


const CreateEmployeeCategory = ({ data }) => {


    return (
        <AddEditFeeComponent data='' />
    )
}

export default CreateEmployeeCategory



// export const getServerSideProps: GetServerSideProps = async (context) => {

//     return {
//         props: {
//         }
//     }

// }



