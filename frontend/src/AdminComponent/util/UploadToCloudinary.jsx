const upload_preset = "Berlin-Food";
const cloud_name = "dt7h7xfjq";
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

export const uploadImageToCloudinary = async(file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);

    const res = await fetch(api_url, {
        method : "post",
        body : data
    });

    const fileData = await res.json();
    return fileData.url;
}