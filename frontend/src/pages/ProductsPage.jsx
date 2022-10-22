import axios from 'axios';
import React from 'react'
import MainLayout from '../layouts/MainLayout'

function ProductsPage() {

  let base64code = ""

  const onChange = e => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };
 
  const onLoad = fileString => {
    console.log(fileString);
    base64code = fileString
  };
 
  const getBase64 = file => {
    const preview = document.querySelector("#img_previwe");
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {//triggerd when finish read file
      onLoad(  preview.src=reader.result);
    
    };
  };

function saveNew(){
console.log("hooooooo");
const newname = document.querySelector("#name");
const newprice = document.querySelector("#price");
const newpreview = document.querySelector("#img_previwe").getAttribute("src");
 let  opt = {
  url:'http://localhost:5000/products',
  method:'post',
  data:{
    name:newname,
    price:Number(newprice),
    img:newpreview
  }
}
axios(opt).then(function(data_res){
  console.log(data_res)
  if(data_res.status == 200){
    alert("hiiiiiiiiii,sucsess")
  }
  
})
.catch(function(ex){
  console.log(ex);
})


}



  return (
    <MainLayout>
   
          <form>
          <div className="mb-3">
               <label htmlFor="name" className="form-label" >name</label>
               <input type="text" className="name" id="name" autocomplete='off' />
          </div>
          <div className="mb-3">
                <label htmlFor="price" className="form-label">price</label>
                <input type="text" className="price" id="price" />
          </div>
          <div className="mb-3">
               <label htmlFor="img" className="form-label">image</label>
               <input type="file" className="img" id="img"   onChange={onChange}/>
               {/* onChange={onChange} */}
               {/* <textarea rows="50" cols="50" value={base64code}></textarea> */}
           </div>
 
            <img id="img_previwe" src="" height={200} alt="previwe......" />
           <button type="button" className="btn btn-primary" onClick={saveNew}>add</button>
        </form>
    </MainLayout>
   
 
  )
}

export default ProductsPage