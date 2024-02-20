// import axios from 'axios'

document.addEventListener('DOMContentLoaded', async() => {
    const listProduct = document.querySelector('#listProduct')
    try {

        const { data } = await axios.get('https://hausport-c06d7-default-rtdb.firebaseio.com/product.json')
        const products = Object.entries(data)
        console.log(products);
        const product = products.map((product, index) => `<tr class="text-center">
        <th scope="row">${index + 1}</th>
        <td>${product[1].name}</td>
        <td style="width: 200px;">
             <img src="modules/quanlyproduct/uploads/${product[1].image1}" alt="" class="img-fluid"> 
        </td>
        <td style="width: 200px;">
             <img src="modules/quanlyproduct/uploads/${product[1].image2}" alt="" class="img-fluid" style="object-fit: cover;"> 
        </td>
        <td>${product[1].price}</td>
        <td>260,000đ</td>
        <td>56</td>
        <td>Sữa tắm</td>
        <td>
            <textarea name="" id="" cols="30" rows="7" disabled>${product[1].description}</textarea>
        </td>
        <td>
            Kích hoạt </td>
        <td class="">
            <a href="?action=quanlysanpham&query=edit&idproduct=50" class="nav-link btn btn-warning mb-2">EDIT</a>
            <a href="modules/quanlyproduct/handle.php?idproduct=50" class="nav-link btn btn-danger" onclick="return confirm('Bạn chắc chắn muốn xoá ?')">DELETE</a>
        </td>
    </tr>`).join('')
        listProduct.insertAdjacentHTML('beforeend', product)
    } catch (error) {
        console.log(error);
    }
})