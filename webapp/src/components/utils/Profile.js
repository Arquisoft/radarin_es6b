import { useLDflex, useWebId } from "@solid/react";

const Profile= (webId) => {
    const currentLoggedUser = useWebId();
    const [name, nameP, nameE] = useLDflex(`[${webId}].name`);
    const [image, imageP, imageE] = useLDflex(`[${webId}].image`);
    const [photo, photoP, photoE] = useLDflex(`[${webId}].vcard_hasPhoto`);
    const [fn, fnP, fnE] = useLDflex(`[${webId}].vcard_fn`);
    const pending = nameP || imageP|| photoP || fnP;
    const error = nameE|| imageE || photoE || fnE ;

    return {
        webId,
        loggedUserWebID: currentLoggedUser,
        pending,
        error,
        fullName: name || fn,
        imageSrc: image || photo
    }
}

export default Profile;