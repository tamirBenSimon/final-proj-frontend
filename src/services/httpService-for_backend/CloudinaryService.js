export default {
    uploadImg
}

function uploadImg(ev) {
    const CLOUD_NAME = "ddarfzyr2"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'a5icujx4');

    return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res
        })
        // .catch(err => console.error(error))
}