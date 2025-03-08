/**
 * 页面标题动态显示效果
 * 在页面加载时为网页主标题添加动态效果
 */
document.addEventListener('DOMContentLoaded', function() {
    // 选择首页主标题元素
    const mainTitle = document.querySelector('.carousel-caption h1');
    const subTitle = document.querySelector('.carousel-caption p.lead');
    const chineseText = document.querySelector('.carousel-caption .chinese p');
    const buttons = document.querySelectorAll('.carousel-caption .btn');
    
    // 如果在首页并找到了元素
    if (mainTitle) {
        // 1. 首先隐藏所有元素
        [mainTitle, subTitle, chineseText, ...buttons].forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }
        });
        
        // 2. 依次显示各元素
        setTimeout(() => {
            if (mainTitle) {
                mainTitle.style.opacity = '1';
                mainTitle.style.transform = 'translateY(0)';
            }
        }, 300);
        
        setTimeout(() => {
            if (subTitle) {
                subTitle.style.opacity = '1';
                subTitle.style.transform = 'translateY(0)';
            }
        }, 800);
        
        setTimeout(() => {
            if (chineseText) {
                chineseText.style.opacity = '1';
                chineseText.style.transform = 'translateY(0)';
            }
        }, 1200);
        
        setTimeout(() => {
            buttons.forEach((btn, index) => {
                setTimeout(() => {
                    btn.style.opacity = '1';
                    btn.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 1600);
        
        // 3. 为其他章节标题添加淡入效果
        const sectionTitles = document.querySelectorAll('.section-title');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // 一旦显示，就不再观察此元素
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        sectionTitles.forEach(title => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
            title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(title);
        });
    }
    
    // 其他页面标题的动画效果
    const pageHeaders = document.querySelectorAll('.page-header h1, .hero-section h1');
    pageHeaders.forEach(header => {
        if (header) {
            // 为内页标题设置打字机效果
            const text = header.textContent;
            header.textContent = '';
            header.style.opacity = '1';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    header.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        }
    });
}); 