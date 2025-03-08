// 立即执行函数，确保在页面加载时就运行
(function() {
    // 创建样式标签
    var style = document.createElement('style');
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
    
    // 将样式添加到页面
    document.head.appendChild(style);
})(); 