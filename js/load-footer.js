// 页脚加载脚本 - 增强版
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM已加载，开始加载页脚...');
    
    // 通过判断当前页面路径来确定footer.html的正确路径
    let footerPath = 'footer.html';
    // 如果当前页面在子目录中，需要调整路径
    if (window.location.pathname.includes('/')) {
        const pathDepth = window.location.pathname.split('/').filter(Boolean).length;
        if (pathDepth > 1) {
            footerPath = '../'.repeat(pathDepth - 1) + 'footer.html';
        }
    }
    
    console.log('使用页脚路径:', footerPath);
    
    // 查找页脚占位符
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    // 如果找到页脚占位符，加载页脚
    if (footerPlaceholder) {
        console.log('找到页脚占位符，正在加载页脚...');
        
        fetch(footerPath)
            .then(response => {
                if (!response.ok) {
                    console.error('页脚文件加载失败，状态:', response.status);
                    throw new Error('页脚文件加载失败');
                }
                console.log('页脚文件加载成功');
                return response.text();
            })
            .then(data => {
                console.log('页脚内容加载成功，长度:', data.length);
                footerPlaceholder.innerHTML = data;
                console.log('页脚已添加到页面');
            })
            .catch(error => {
                console.error('加载页脚时出错:', error);
                // 提供一个基本的页脚作为后备方案
                footerPlaceholder.innerHTML = getBackupFooter();
            });
    } else {
        console.warn('未找到页脚占位符 (#footer-placeholder)，将直接在页面底部添加页脚');
        
        // 如果没有找到页脚占位符，在页面底部添加页脚
        fetch(footerPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('页脚文件加载失败');
                }
                return response.text();
            })
            .then(data => {
                // 创建页脚容器
                const footerContainer = document.createElement('div');
                footerContainer.innerHTML = data;
                
                // 将页脚添加到 body 末尾
                document.body.appendChild(footerContainer.firstElementChild);
                console.log('页脚已直接添加到页面底部');
            })
            .catch(error => {
                console.error('加载页脚时出错:', error);
                // 动态创建后备页脚
                const backupFooter = document.createElement('footer');
                backupFooter.className = 'py-5';
                backupFooter.style.backgroundColor = '#003366';
                backupFooter.style.color = 'white';
                backupFooter.innerHTML = `
                    <div class="container">
                        <div class="row g-4">
                            <div class="col-lg-4">
                                <h5>Academic Research Institute</h5>
                                <p class="chinese">学术研究院</p>
                                <p>Advancing knowledge and innovation through collaborative research</p>
                                <div class="chinese mb-3">
                                    <p>通过协作研究促进知识创新</p>
                                </div>
                                <div class="social-links">
                                    <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                                    <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
                                    <a href="#" class="social-icon"><i class="fab fa-linkedin"></i></a>
                                    <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <h5>Contact Us</h5>
                                <p><i class="fas fa-map-marker-alt me-2"></i> 云南省昆明市呈贡区吴家营街道昆明理工大学呈贡校区信自楼</p>
                                <p><i class="fas fa-phone me-2"></i> 0123-12345678</p>
                                <p><i class="fas fa-envelope me-2"></i> abcdefg@163.com</p>
                            </div>
                            <div class="col-lg-4">
                                <h5>Quick Links</h5>
                                <ul class="list-unstyled">
                                    <li><a href="#" class="text-white">昆明理工大学</a></li>
                                    <li><a href="#" class="text-white">师生信息服务平台</a></li>
                                    <li><a href="#" class="text-white">VPN虚拟专用网</a></li>
                                    <li><a href="#" class="text-white">网络办公</a></li>
                                    <li><a href="#" class="text-white">科技处科研管理</a></li>
                                    <li><a href="#" class="text-white">云南省第一人民医院</a></li>
                                    <li><a href="#" class="text-white">xxx有限公司</a></li>
                                    <li><a href="#" class="text-white">xxxxx有限公司</a></li>
                                </ul>
                            </div>
                        </div>
                        <hr class="mt-4 mb-4" style="background-color: rgba(255,255,255,0.2)">
                        <div class="row">
                            <div class="col-md-6">
                                <p class="mb-0">&copy; 2023 Academic Research Institute. All rights reserved.</p>
                            </div>
                            <div class="col-md-6 text-md-end">
                                <a href="#" class="text-white">Terms of Use</a>
                                <span class="mx-2">|</span>
                                <a href="#" class="text-white">Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(backupFooter);
            });
    }
    
    // 后备页脚HTML
    function getBackupFooter() {
        return `
            <footer class="py-5" style="background-color: #003366; color: white;">
                <div class="container">
                    <div class="row g-4">
                        <div class="col-lg-4">
                            <h5>Academic Research Institute</h5>
                            <p class="chinese">学术研究院</p>
                            <p>Advancing knowledge and innovation through collaborative research</p>
                            <div class="chinese mb-3">
                                <p>通过协作研究促进知识创新</p>
                            </div>
                            <div class="social-links">
                                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
                                <a href="#" class="social-icon"><i class="fab fa-linkedin"></i></a>
                                <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <h5>Contact Us</h5>
                            <p><i class="fas fa-map-marker-alt me-2"></i> 云南省昆明市呈贡区吴家营街道昆明理工大学呈贡校区信自楼</p>
                            <p><i class="fas fa-phone me-2"></i> 0123-12345678</p>
                            <p><i class="fas fa-envelope me-2"></i> abcdefg@163.com</p>
                        </div>
                        <div class="col-lg-4">
                            <h5>Quick Links</h5>
                            <ul class="list-unstyled">
                                <li><a href="#" class="text-white">昆明理工大学</a></li>
                                <li><a href="#" class="text-white">师生信息服务平台</a></li>
                                <li><a href="#" class="text-white">VPN虚拟专用网</a></li>
                                <li><a href="#" class="text-white">网络办公</a></li>
                                <li><a href="#" class="text-white">科技处科研管理</a></li>
                                <li><a href="#" class="text-white">云南省第一人民医院</a></li>
                                <li><a href="#" class="text-white">xxx有限公司</a></li>
                                <li><a href="#" class="text-white">xxxxx有限公司</a></li>
                            </ul>
                        </div>
                    </div>
                    <hr class="mt-4 mb-4" style="background-color: rgba(255,255,255,0.2)">
                    <div class="row">
                        <div class="col-md-6">
                            <p class="mb-0">&copy; 2023 Academic Research Institute. All rights reserved.</p>
                        </div>
                        <div class="col-md-6 text-md-end">
                            <a href="#" class="text-white">Terms of Use</a>
                            <span class="mx-2">|</span>
                            <a href="#" class="text-white">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}); 