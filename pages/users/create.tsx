
import { GetServerSideProps } from 'next'
import AddEditUserComponent from '../../src/components/AddEditUserComponent'
import {parseCookies} from '../../src/parseCookies'

const CreateUser = ({data}) => {


    return (
        <AddEditUserComponent data={''} />
    )
}

export default CreateUser