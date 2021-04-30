import React from 'react';
import { deleteUser } from '../../api/api';
import StandardUserElement from './StandardUserElement';
import { useWebId } from '@solid/react';
import Typography from '@material-ui/core/Typography';

function UsersList({ users }) {

    const webId = useWebId();

    const deleteOneUser = async function (id, userDeleteId) {
        try {
            await deleteUser(id, userDeleteId);
        }
        catch (err) {
            console.log(err);
        }
    }

    if (users) {
        if (users.length > 0) {
            return (
                <div style={{ display: 'inline-block', overflow: 'auto', height: '600px' }}>
                    {
                        users.map((user, i) => {
                            return <StandardUserElement key={`user${i}`} user={user} webId={webId} deleteOneUser={deleteOneUser} />;
                        })
                    }
                </div>
            );
        }
        else {
            return (
                <div style={{ display: 'inline-block', overflow: 'auto', width: '800px', height: '600px' }}>
                    <Typography component="p">
                        You still do not have any user using the application
            </Typography>
                </div>);

        }
    }
    else {
        return null;
    }
}

export default UsersList;