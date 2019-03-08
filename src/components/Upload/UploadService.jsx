import { API_BASE } from 'app.config';

const UploadService = (option) => {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (option.onSuccess) {
        let res = xhr.responseText;
        if (res) {
          res = JSON.parse(res);
        }
        option.onSuccess(res);
      }
    }
  };

  // 侦查当前附件上传情况
  xhr.upload.onprogress = (evt) => {
    if (option.uploading) {
      const loaded = evt.loaded;
      const tot = evt.total;
      const per = Math.floor((100 * loaded) / tot); // 已经上传的百分比
      option.uploading(per);
    }
  };

  xhr.open('post', API_BASE + option.url);
  xhr.send(option.params);
};
export default UploadService;
