import { getDownloadURL, ref,  uploadBytesResumable } from 'firebase/storage'
import { storage } from 'src/firebase'

const useUploadImgaeHook = () => {
  return (
     event => {
        const fileUploaded = event.target.files[0];
        const file = event.target.files[0] 
        const reader = new FileReader();
        if (!file.type.startsWith('image/')) return;
    
        reader.onload = (e) => {
            imgRef.current.src = e.target.result
        }
        reader.readAsDataURL(file)
    
            const uploadImage = (file)=>{
              if(!fileUploaded)return
             const storageRef =   ref(storage,`profile-photo/${fileUploaded.name}`)
             const uploadTask = uploadBytesResumable(storageRef,fileUploaded)
      
             uploadTask.on("state_changed",(snapshot)=>{
              const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
              setImgPrograss(prog)
      
             },(error)=>{
              console.log(error)
             },
             ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                setImageUrl(url)
              })
             }
             )
            }
            uploadImage(file)
      }
  )
}


function useUploadResumeHook(setResumePrograss,setResumeUrl,setResume){
    return event => {
        const file = event.target.files[0] 
             setResume(file.name)
            const uploadResume = (file)=>{
              if(!file)return
             const storageRef =   ref(storage,`resume/${file.name}`)
             const uploadTask = uploadBytesResumable(storageRef,file)
      
             uploadTask.on("state_changed",(snapshot)=>{
              const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
              setResumePrograss(prog)
      
             },(error)=>{
              console.log(error)
             },
             ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((url)=>{

               setResumeUrl(url)
              })
             }
             )
            }
            uploadResume(file)
      };
}

export {useUploadImgaeHook,useUploadResumeHook}
