import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "bangdy",
  api_key: "668867119761934",
  api_secret: "LB-xTLLGtS-slZO4I81XGvJONLY",
});

const uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};

export { uploads, cloudinary };
