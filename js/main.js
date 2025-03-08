// 下拉菜单悬停效果
document.addEventListener('DOMContentLoaded', function() {
    // 确保下拉菜单在鼠标离开后有一定延迟关闭，避免意外关闭
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        let timeout;
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
        });
        dropdown.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    if (typeof bootstrap !== 'undefined') {
                        const dropdownInstance = bootstrap.Dropdown.getInstance(dropdownMenu);
                        if (dropdownInstance) {
                            dropdownInstance.hide();
                        }
                    }
                }
            }, 200);
        });
    });
    
    // 其他通用功能...
}); 