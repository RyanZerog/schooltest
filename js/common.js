document.addEventListener('DOMContentLoaded', function() {
    // 1. 添加导航栏横线动画样式
    let style = document.createElement('style');
    style.innerHTML = `
        .nav-link {
            position: relative !important;
            overflow: hidden !important;
        }
        
        .nav-link::after {
            content: '' !important;
            position: absolute !important;
            width: 0 !important;
            height: 2px !important;
            bottom: 0 !important;
            left: 50% !important;
            background-color: white !important;
            transition: all 0.3s ease !important;
            transform: translateX(-50%) !important;
        }
        
        .nav-link:hover::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
    
    // 2. 设置当前活动的导航项
    // 获取当前页面的文件名
    const currentPage = window.location.pathname.split('/').pop();
    
    // 设置相应的导航链接为活动状态
    if (currentPage) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else if (currentPage === '' && href === 'index.html') {
                link.classList.add('active');
            }
        });
    }
    
    // 3. 语言切换功能
    const langSelector = document.querySelector('.language-selector');
    if (langSelector) {
        langSelector.addEventListener('change', function() {
            // 实现语言切换功能
            const lang = this.value;
            console.log(`Switching language to: ${lang}`);
            // TODO: 实现实际的语言切换逻辑
        });
    }
}); 