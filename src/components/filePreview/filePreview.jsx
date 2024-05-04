import React from 'react'
import { checkImageURL } from '../../helper/util';
import "./style.css";
import { SectionHeader } from '../../pages/profile';

const FilePreview = ({files, heading}) => {

  return (
    <div className='file-preview-container-wraper'>
      <SectionHeader title={heading || "My files"} noBorder styles={"mb-2"}/>
    {
      files?.length > 0 && files.map((file, index) => {
        return <FilePreviewByType key={`file-preview-${file?.fileId}${file?.mimeType}`} file={file} />
      })
    }
    </div>
  )
}

export default FilePreview;

const FilePreviewByType = ({ file }) => {
  const fileUrl = checkImageURL(file?.fileURL);
  const fileType = fileUrl.split('.').pop().toLowerCase(); // Get the file extension
  let comp = <></>;
  switch (fileType) {
     case 'jpg':
     case 'jpeg':
     case 'png':
     case 'gif':
      comp = <img src={fileUrl} alt="Preview" style={{ width: '160px', objectFit: "contain" }} />;
      break
     case 'mp3':
     case 'wav':
      comp = <audio controls src={fileUrl} />;
      break
     case 'mp4':
     case 'webm':
       comp = <video controls src={fileUrl} style={{ maxWidth: '100%', maxHeight: '100%' }} />;
      break
     default:
      comp = (
        <div></div>
      );
  }
  return (
    <div className='file-preview-container'>
      <div className='prev-container'>
        {comp}
      </div>
      <div className='main-data-container'>
        {/* {comp} */}
      </div>
    </div>
  )
 };
