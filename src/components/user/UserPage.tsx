import {useParams} from "react-router-dom";


const UserPage = () => {

    const {userId} = useParams<{userId: string}>();

    return (
        <div>
            <div>User card#{userId}</div>

        </div>
    );
};

export default UserPage;
