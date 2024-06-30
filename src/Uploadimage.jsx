import React, { useState, useEffect } from 'react'
import { storage } from './firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Uploadimage = () => {

    const [image, setImage] = useState(null);
    const [imageList, setImageList] = useState([]);

    const imageListRef = ref(storage, "images/")
    const uploadImage = () => {
        if (image == null)
            return;

        const imageRef = ref(storage, `images/${image.name + v4()}`)
        uploadBytes(imageRef, image)
            .then(() => {
                alert("Image Uploaded!!!")
            })
    }



    //for multiple image upload 




    //   const uploadImage = async (e) => {
    //     e.preventDefault();
    //     if (image.length === 0) return;


    //     const confirmation = confirm("Are you sure to upload the selected images? Once you uploaded you cant change it!")

    //     if (confirmation) {
    //       const urls = [];
    //       for (const oneimage of image) {
    //         const imageRef = ref(storage, `images/${oneimage.name + v4()}`);
    //         await uploadBytes(imageRef, oneimage);
    //         const downloadURL = await getDownloadURL(imageRef);
    //         urls.push(downloadURL);
    //       }

    //       setImage([]);
    //       setOptions({ ...options, imageUploaded: true })
    //       alert("Images Uploaded!!!");
    //     }
    //   };







    // useEffect(()=>{
    //     listAll(imageListRef)
    //     .then((response)=>{
    //         setImageList([]);
    //         response.items.forEach((item)=>{
    //             getDownloadURL(item).then((URL)=>{
    //                 setImageList(imageList=>[...imageList, URL])
    //             })
    //         })
    //     })

    //     console.log(imageList)

    // },[])


    useEffect(() => {
        const fetchImageURLs = async () => {
            try {
                const response = await listAll(imageListRef);
                const urls = await Promise.all(response.items.map(async (item) => {
                    const url = await getDownloadURL(item);
                    return url;
                }));
                setImageList(urls);
            } catch (error) {
                console.error("Error fetching image URLs:", error);
            }
        };

        fetchImageURLs();
    }, []);



    return (
        <>
            {image && (
                <div>
                    <h4>Image Preview</h4>
                    <img src={URL.createObjectURL(image)} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </div>
            )}
            <input type='file' onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={uploadImage} className='bg-backgroundBlue border-2 border-solid text-white px-2'>Submit</button>
            <div>
                {
                    imageList.map((url) => {
                        return <img src={url} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    })
                }
            </div>
        </>
    )
}

export default Uploadimage