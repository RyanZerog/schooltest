document.addEventListener('DOMContentLoaded', function() {
    // 获取轮播元素
    const carousel = document.getElementById('heroCarousel');
    
    // 如果存在轮播元素，则初始化Bootstrap轮播
    if (carousel) {
        // 创建Bootstrap轮播实例
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,  // 5秒切换一次
            pause: 'hover',  // 鼠标悬停时暂停
            wrap: true,      // 循环播放
            keyboard: true   // 允许键盘控制
        });
        
        // 为小屏幕设备优化轮播图显示
        function adjustCarouselHeight() {
            const carouselItems = document.querySelectorAll('.carousel-item');
            if (window.innerWidth < 768) {
                carouselItems.forEach(item => {
                    item.style.height = '450px';
                });
            } else {
                carouselItems.forEach(item => {
                    item.style.height = '600px';
                });
            }
        }
        
        // 页面加载时调整
        adjustCarouselHeight();
        
        // 窗口大小变化时调整
        window.addEventListener('resize', adjustCarouselHeight);
        
        // 为轮播图添加进入动画，与页面标题动画配合
        carousel.addEventListener('slide.bs.carousel', function(event) {
            const caption = event.relatedTarget.querySelector('.carousel-caption');
            const elements = caption.querySelectorAll('h1, p, .chinese, .btn');
            
            // 先隐藏所有元素
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
            });
            
            // 然后延迟显示它们
            setTimeout(() => {
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }, 300);
        });
    }
}); 