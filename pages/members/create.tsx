
import { GetServerSideProps, GetStaticProps } from 'next'
import AddEditMemberComponent from 'src/components/AddEditMemberComponent'


const CreateEmployeeCategory = ({ data }) => {


    return (
        <AddEditMemberComponent data='' />
    )
}

export default CreateEmployeeCategory



export const getServerSideProps: GetServerSideProps = async (context) => {

    return {
        props: {
        }
    }

}



