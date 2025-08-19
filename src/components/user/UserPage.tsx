import {useParams} from "react-router-dom";


const UserPage = () => {

    const {userId} = useParams<{userId: string}>();

    return (
        <div>
            <div>Contact with user id #{userId}</div>

        </div>
    );
};

export default UserPage;
