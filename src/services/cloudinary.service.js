export const cloudinaryService = {
    uploadImg
}

function uploadImg(ev) {
    console.log('in CLOUDINARY serviceee')
    const CLOUD_NAME = "dsamb9nef"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'oe93i5sr');

    return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res
        })
}