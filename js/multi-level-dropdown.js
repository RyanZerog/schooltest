// 完全重写的多级下拉菜单 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('多级菜单JS已加载');
    
    // 清理可能存在的旧事件监听器
    const clearOldListeners = () => {
        document.querySelectorAll('.dropdown-submenu > a').forEach(element => {
            const newElement = element.cloneNode(true);
            if (element.parentNode) {
                element.parentNode.replaceChild(newElement, element);
            }
        });
    };
    
    // 初始化处理
    const initializeDropdowns = () => {
        console.log('初始化多级菜单');
        
        // 移动设备处理
        document.querySelectorAll('.dropdown-submenu > a.dropdown-toggle').forEach(element => {
            // 移除可能存在的旧事件监听器
            const newElement = element.cloneNode(true);
            if (element.parentNode) {
                element.parentNode.replaceChild(newElement, element);
            }
            
            // 添加新的事件监听器
            newElement.addEventListener('click', function(e) {
                console.log('子菜单点击', this.textContent);
                e.preventDefault();
                e.stopPropagation();
                
                const submenu = this.nextElementSibling;
                if (!submenu || !submenu.classList.contains('dropdown-menu')) return;
                
                // 关闭所有其他子菜单
                document.querySelectorAll('.dropdown-submenu > .dropdown-menu').forEach(menu => {
                    if (menu !== submenu && menu.classList.contains('show')) {
                        menu.classList.remove('show');
                    }
                });
                
                // 切换当前子菜单
                submenu.classList.toggle('show');
            });
        });
        
        // 确保点击子菜单项不会关闭整个菜单
        document.querySelectorAll('.dropdown-menu a.dropdown-item').forEach(item => {
            item.addEventListener('click', function(e) {
                // 如果是子菜单标题，阻止事件传播
                if (this.nextElementSibling && this.nextElementSibling.classList.contains('dropdown-menu')) {
                    e.stopPropagation();
                }
            });
        });
    };
    
    // 监听文档点击，关闭子菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-submenu')) {
            document.querySelectorAll('.dropdown-submenu > .dropdown-menu.show').forEach(function(menu) {
                menu.classList.remove('show');
            });
        }
    });
    
    // 监听主菜单关闭事件
    document.querySelectorAll('.navbar .dropdown').forEach(dropdown => {
        dropdown.addEventListener('hidden.bs.dropdown', function() {
            // 关闭所有子菜单
            this.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        });
    });
    
    // 初始化
    clearOldListeners();
    initializeDropdowns();
    
    // 窗口大小改变时重新初始化
    window.addEventListener('resize', function() {
        clearOldListeners();
        initializeDropdowns();
    });
}); 