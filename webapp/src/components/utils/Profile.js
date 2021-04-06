import { useLDflex } from "@solid/react";

const Profile= (webId) => {
    const currentLoggedUser = webId;
    const [name, nameP, nameE] = useLDflex(`[${webId}].name`);
    const [friends, friendsP, friendsE] = useLDflex(`[${webId}].knows`);
    const [image, imageP, imageE] = useLDflex(`[${webId}].image`);
    const [photo, photoP, photoE] = useLDflex(`[${webId}].vcard_hasPhoto`);
    const [fn, fnP, fnE] = useLDflex(`[${webId}].vcard_fn`);
    const pending = nameP || imageP|| photoP || fnP || friendsP;
    const error = nameE|| imageE || photoE || fnE || friendsE ;

    return {
        webId,
        loggedUserWebID: currentLoggedUser,
        pending,
        error,
        fullName: name || fn,
        imageSrc: image || photo,
        friends: friends
    }
}

export default Profile;