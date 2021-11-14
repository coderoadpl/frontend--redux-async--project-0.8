import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { storage } from '../../firebaseConfig'

export const upload = async (userId, file, progressCallback) => {
  const metadata = {
    contentType: file.type
  }

  const storageRef = ref(storage, 'avatar/' + userId)

  const uploadTask = uploadBytesResumable(storageRef, file, metadata)

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        progressCallback(progress)
      },
      (error) => {
        reject(error)
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => resolve(downloadURL))
      }
    )
  })
}
