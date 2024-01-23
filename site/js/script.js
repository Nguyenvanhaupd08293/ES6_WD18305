window.addEventListener('load', function() {
        const sliderMain = this.document.querySelector('.slider_main, .slider_main_foot')
        const sliderItems = this.document.querySelectorAll('.slider_item, .slider_item_foot')
        const sliderItemWidth = sliderItems[0].offsetWidth
        const sliderLenght = sliderItems.length
        let index = 0

        // Tự động chuyển slide sau mỗi 3 giây
        function autoSlide() {
            index = (index + 1) % sliderLenght
            sliderMain.style.transform = `translateX(-${index * sliderItemWidth}px)`
        }

        setInterval(autoSlide, 3000)

        // ======== toggle search =========
        const search = document.querySelector('#search')
        const searchBlock = document.querySelector('.search-block')

        const formSearch = searchBlock.querySelector('.search-form')
        formSearch.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('.search-input')
            if (searchInput.value.trim() === '') {
                alert('Vui lòng nhập tên sản phẩm trước khi tìm kiếm.')
                e.preventDefault()
            }
        })

        search.addEventListener('click', () => searchBlock.classList.toggle('active-search'))
        searchBlock.addEventListener('click', (e) => e.stopPropagation())
            //========chuyển áo đấu
        const images = document.querySelectorAll('.details-item-img img');
        const detailsLeftImg = document.getElementById('srcImage');

        images.forEach(image => {
            image.addEventListener('click', function() {
                // Xóa lớp 'active-img' khỏi tất cả các hình ảnh
                images.forEach(img => img.parentNode.classList.remove('active-img'));

                // Thêm lớp 'active-img' vào li cha của hình ảnh được nhấp
                this.parentNode.classList.add('active-img');

                // Đặt nguồn của chi tiết_left-img thành nguồn của hình ảnh được nhấp
                detailsLeftImg.src = this.src;
            });
        })
    })
    //scroll