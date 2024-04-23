import React from 'react'

function ImageUpload(props) {
    function imageUploader(e){
        const file= e.target.files[0]
        if(file){
            const reader= new FileReader();
            reader.onload=()=>{
                props.UploadingImage(file,reader.result)
            }
            reader.readAsDataURL(file)
        };
    }
  return (
    <div>
        <input type='file' accept='image/*' onChange={imageUploader}/>
    </div>
  )
}

export default ImageUpload