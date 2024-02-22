// import axios from 'axios'

// document.addEventListener('DOMContentLoaded', async() => {
//     const listProduct = document.querySelector('#listProduct')
//     try {

//         const { data } = await axios.get('https://hausport-c06d7-default-rtdb.firebaseio.com/product.json')
//         const products = Object.entries(data)
//         console.log(products);
//         const product = products.map((product, index) => `<tr class="text-center">
//         <th scope="row">${index + 1}</th>
//         <td>${product[1].name}</td>
//         <td style="width: 200px;">
//              <img src="modules/quanlyproduct/uploads/${product[1].image1}" alt="" class="img-fluid"> 
//         </td>
//         <td style="width: 200px;">
//              <img src="modules/quanlyproduct/uploads/${product[1].image2}" alt="" class="img-fluid" style="object-fit: cover;"> 
//         </td>
//         <td>${product[1].price}</td>
//         <td>260,000đ</td>
//         <td>56</td>
//         <td>Sữa tắm</td>
//         <td>
//             <textarea name="" id="" cols="30" rows="7" disabled>${product[1].description}</textarea>
//         </td>
//         <td>
//             Kích hoạt </td>
//         <td class="">
//             <a href="?action=quanlysanpham&query=edit&idproduct=50" class="nav-link btn btn-warning mb-2">EDIT</a>
//             <a href="modules/quanlyproduct/handle.php?idproduct=50" class="nav-link btn btn-danger" onclick="return confirm('Bạn chắc chắn muốn xoá ?')">DELETE</a>
//         </td>
//     </tr>`).join('') 
//         listProduct.insertAdjacentHTML('beforeend', product)
//     } catch (error) {
//         console.log(error);
//     }
// })
const courseAPI = 'https://hausport-c06d7-default-rtdb.firebaseio.com/product.json'

// render froduct
function renderCourse(courses) {
    const listProduct = document.querySelector('#listProduct');
    const htmls = courses.map(function(course, index) {
        return `
                     <tr class="text-center">
                            <th scope="row">${index + 1}</th>
                            <td>${course[1].name}</td>
                            <td style="width: 200px;">
                                   <img src="../../../images/${course[1].image1}" alt="" class="img-fluid"> 
                            </td>
                            <td style="width: 200px;">
                                   <img src="../../../images/${course[1].image2}" alt="" class="img-fluid" style="object-fit: cover;"> 
                            </td>
                            <td>${course[1].price}</td>
                            <td>${course[1].quantity}</td>
                            <td>${course[1].categoryID}</td>
                            <td>
                                <textarea name="" id="" cols="30" rows="7" disabled>${course[1].description}</textarea>
                            </td>
                            <td>
                            Kích hoạt </td>
                            <td class="">
                            <a href="" class="btn_edit nav-link btn btn-warning mb-2 ">EDIT</a>
                            <div data-id="${course[0]}" class="btn-del nav-link btn btn-danger" onclick="return confirm('Bạn chắc chắn muốn xoá ?')">DELETE</div>
                            </td>
                     </tr>`;
    });

    return listProduct.innerHTML = htmls.join('');
}

function renderIndex(courses1) {
    const listProductindex = document.querySelector('#listProductindex');
    const htmlsindex = courses1.map(function(courses) {
        return `<div class="product-item">
                    <a href="#" class="product-link">
                        <img src=".../../images/${courses[1].image1}" alt="" class="product-img">
                        <img src=".../../images/${courses[1].image2}" alt="" class="product-img-hover">
                    </a>
                    <div class="product-price">
                        <span class="new-price">${courses[1].price}</span>
                    </div>
                    <div class="product-name"><a href="">${courses[1].name}</a></div>
                </div>`;
    });

    listProductindex.innerHTML = htmlsindex.join('');
}
const getCourse1 = () => fetch(courseAPI, { method: 'GET' }).then((res) => res.json()).then(data => {
    const courses1 = Object.entries(data)
    renderIndex(courses1)

})
getCourse1()
const getCourse = () => fetch(courseAPI, { method: 'GET' }).then((res) => res.json()).then(data => {
    const courses = Object.entries(data)
    renderCourse(courses)

    // delete Product
    const btns = document.querySelectorAll('.btn-del')
    btns.forEach(btn => btn.addEventListener('click', function() {
        const id = this.dataset.id
        fetch(`https://hausport-c06d7-default-rtdb.firebaseio.com/product/${id}.json`, { method: 'DELETE' }).then(() => window.location.reload())
    }))
})

getCourse()




// add product
// get selector
const form = document.querySelector('#addProductForm');
const productName = document.querySelector('#productName');
const image1 = document.querySelector('#productImage');
const image2 = document.querySelector('#productImage2');
const price = document.querySelector('#productPrice');
const quantity = document.querySelector('#productQuantity');
const description = document.querySelector('#productDesc');
const categoryID = document.querySelector('#productCategory');
const productList = document.querySelector('#productList');

function handleSubmit(event) {
    event.preventDefault(); // Ngăn chặn việc gửi biểu mẫu mặc định

    // Lấy giá trị từ các trường nhập liệu
    const productNameValue = productName.value;
    const image1Value = image1.files[0].name;
    const image2Value = image2.files[0].name;
    const priceValue = +price.value;
    const quantityValue = +quantity.value;
    const descriptionValue = description.value;
    const categoryIDValue = +categoryID.value;

    // Tạo một đối tượng sản phẩm mới
    const newProduct = {
        name: productNameValue,
        image1: image1Value,
        image2: image2Value,
        price: priceValue,
        quantity: quantityValue,
        description: descriptionValue,
        categoryID: categoryIDValue
    };

    // Thêm sản phẩm mới vào danh sách sản phẩm hoặc làm gì đó khác với dữ liệu này
    fetch('https://hausport-c06d7-default-rtdb.firebaseio.com/product.json', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct)
    }).then(() => window.location.reload())

}

form.addEventListener('submit', handleSubmit);




// function getCourse(callback) {
//     fetch(courseAPI)
//         .then(function(respone) {
//             return respone.json();
//         }).then(callback);
// }

// function creatPro(data, callback) {
//     const option = {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     };

//     fetch(courseAPI, option)
//         .then(function(response) {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(function() {
//             // After successfully adding the new product,
//             // fetch the updated list of courses and render them
//             getCourse(callback);
//         })
//         .catch(function(error) {
//             console.error('There was a problem with your fetch operation:', error);
//         });
// }





// function handleAddpro() {
//     const btnAdd = document.querySelector(".btn-success");
//     btnAdd.addEventListener("click", function(event) {
//         event.preventDefault(); // Prevent default form submission behavior
//         const name = document.querySelector('input[name="productName"]').value;
//         const price = document.querySelector('input[name="productPriceOld"]').value;
//         // Add further processing logic here
//         const formData = {
//             name: name,
//             price: price
//         };
//         creatPro(formData, function() {
//             getCourse(renderCourse);
//         })
//     });
// }

// function start() {
//     getCourse(renderCourse);
//     handleAddpro();
// }
// start();