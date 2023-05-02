import {products} from '../config/mongoCollections.js';

const create = async (productName,description,imgLink)=> {
    
  
    let product= { 
      _id:new ObjectId(),
      productName,
      description,
      imgLink
    }
    const productCol= await products();
    
    const insertInfo = await productCol.insertOne(product);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add a product';
    const newId = insertInfo.insertedId.toString();
    return get(newId)
};

export {create}