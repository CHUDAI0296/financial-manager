import { MongoClient } from 'mongodb';

// 检查环境变量，使用默认值或空字符串
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/financial-manager';
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

// 创建一个模拟的MongoDB客户端，当没有真实连接时使用
const mockClient = {
  db: () => ({
    collection: () => ({
      findOne: async () => null,
      insertOne: async () => ({ insertedId: '123' }),
      updateOne: async () => ({ modifiedCount: 1 }),
    }),
  }),
  connect: () => Promise.resolve(mockClient),
};

// 如果没有MongoDB URI，使用模拟客户端
if (!process.env.MONGODB_URI) {
  console.warn('警告: 缺少MONGODB_URI环境变量，将使用模拟数据库');
  clientPromise = Promise.resolve(mockClient as unknown as MongoClient);
} else {
  if (process.env.NODE_ENV === 'development') {
    // 在开发环境中，使用全局变量，这样热重载不会创建新的连接
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // 在生产环境中，最好为每个请求创建一个新的连接
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

// 导出一个模块级变量，它可以被导入到服务端的任何地方
export default clientPromise; 