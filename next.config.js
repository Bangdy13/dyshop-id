/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URL:
      "mongodb://bangdy-store:bangdy123@ac-gyouzzl-shard-00-00.m9cqn3c.mongodb.net:27017,ac-gyouzzl-shard-00-01.m9cqn3c.mongodb.net:27017,ac-gyouzzl-shard-00-02.m9cqn3c.mongodb.net:27017/dyshop-id?ssl=true&replicaSet=atlas-4xl07v-shard-0&authSource=admin&retryWrites=true&w=majority",
    NEXTAUTH_SECRET: "something",
    STRIPE_WEBHOOK_SECRET:
      "whsec_f8fc7ce3f6d5bf73fc52401a18e0c24640f8c30d10ce56c5766525d1cc2788eb",
    STRIPE_PUBLIC_KEY:
      "pk_test_51NJq2eIJLksH0grHv8Zuotc1YdVkzvIHxX3m5oaDcb3RbEIwmQPsspwC0gzwJ1Kq3JMyv4sSHMIH7k3zzKGOGAbT00GXUQzgly",
    STRIPE_PRIVATE_KEY:
      "sk_test_51NJq2eIJLksH0grH43d4kFh1j88OPscBaGTNQhkPIXqdjHGzZ9xsgyfbjLOTzs5TZCXCT9c1tE8DKU95GFDrLklh007WtPw3Fc",
    // CLOUD_NAME: "bangdy",
    // CLOUDINARY_API_KEY: "668867119761934",
    // CLOUDINARY_API_SECRET: "LB-xTLLGtS-slZO4I81XGvJONLY",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
