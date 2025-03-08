// 删除或注释所有可能加载header.html的代码
// 例如，如果文件中有类似下面的代码，应该删除或注释掉：

// document.addEventListener('DOMContentLoaded', function() {
//     fetch('header.html')
//         .then(response => response.text())
//         .then(data => {
//             // 可能在页面开始处插入标题
//             document.body.insertAdjacentHTML('afterbegin', data);
//             // 或者插入到某个特定元素
//             // document.querySelector('some-selector').innerHTML = data;
//         });
// });

document.addEventListener('DOMContentLoaded', function() {
    // 查找所有导航链接
    let navLinks = document.querySelectorAll('.nav-link');
    
    // 为每个链接添加正确的动画样式
    navLinks.forEach(link => {
        link.style.position = 'relative';
        link.style.overflow = 'hidden';
        
        // 清除可能存在的旧的伪元素样式
        link.classList.add('custom-nav-link');
    });
    
    // 添加自定义样式
    let style = document.createElement('style');
    style.innerHTML = `
        .custom-nav-link::after {
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
        
        .custom-nav-link:hover::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
}); 