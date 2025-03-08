/**
 * 标题动态呈现效果
 * 支持三种效果：typing（打字机效果）、fadeIn（淡入效果）、slideIn（滑入效果）
 */
class TitleAnimation {
    constructor(options = {}) {
        this.options = {
            elementSelector: options.elementSelector || '.animated-title',
            effect: options.effect || 'typing', // typing, fadeIn, slideIn
            delay: options.delay || 500,
            duration: options.duration || 1500,
            typeSpeed: options.typeSpeed || 100,
            startDelay: options.startDelay || 300,
            cursor: options.cursor !== undefined ? options.cursor : true
        };

        this.init();
    }

    init() {
        // 等待DOM加载完成
        document.addEventListener('DOMContentLoaded', () => {
            this.elements = document.querySelectorAll(this.options.elementSelector);
            
            if (this.elements.length === 0) return;
            
            // 根据选择的效果应用动画
            switch (this.options.effect) {
                case 'typing':
                    this.applyTypingEffect();
                    break;
                case 'fadeIn':
                    this.applyFadeInEffect();
                    break;
                case 'slideIn':
                    this.applySlideInEffect();
                    break;
                default:
                    this.applyTypingEffect();
            }
        });
    }

    applyTypingEffect() {
        this.elements.forEach((element, index) => {
            const originalText = element.textContent;
            element.textContent = '';
            element.style.visibility = 'visible';
            
            // 添加光标元素（如果启用）
            if (this.options.cursor) {
                const cursorElement = document.createElement('span');
                cursorElement.className = 'typing-cursor';
                cursorElement.textContent = '|';
                cursorElement.style.animation = 'blink 1s step-end infinite';
                element.appendChild(cursorElement);
                
                // 添加光标样式
                if (!document.getElementById('cursor-style')) {
                    const style = document.createElement('style');
                    style.id = 'cursor-style';
                    style.textContent = `
                        @keyframes blink {
                            from, to { opacity: 1; }
                            50% { opacity: 0; }
                        }
                        .typing-cursor {
                            font-weight: bold;
                            color: inherit;
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
            
            // 设置延迟，使多个标题依次执行
            setTimeout(() => {
                this.typeText(element, originalText, 0);
            }, this.options.startDelay + index * this.options.delay);
        });
    }

    typeText(element, text, index) {
        if (index < text.length) {
            // 替换光标之前的内容
            if (this.options.cursor) {
                const currentContent = element.textContent;
                element.textContent = currentContent.substring(0, currentContent.length - 1);
            }
            
            element.textContent += text.charAt(index);
            
            // 重新添加光标（如果启用）
            if (this.options.cursor) {
                element.innerHTML += '<span class="typing-cursor">|</span>';
            }
            
            setTimeout(() => {
                this.typeText(element, text, index + 1);
            }, this.options.typeSpeed);
        }
    }

    applyFadeInEffect() {
        this.elements.forEach((element, index) => {
            // 设置初始样式
            element.style.opacity = '0';
            element.style.visibility = 'visible';
            element.style.transition = `opacity ${this.options.duration}ms ease`;
            
            // 应用动画
            setTimeout(() => {
                element.style.opacity = '1';
            }, this.options.startDelay + index * this.options.delay);
        });
    }

    applySlideInEffect() {
        this.elements.forEach((element, index) => {
            // 设置初始样式
            element.style.opacity = '0';
            element.style.transform = 'translateY(-30px)';
            element.style.visibility = 'visible';
            element.style.transition = `opacity ${this.options.duration}ms ease, transform ${this.options.duration}ms ease`;
            
            // 应用动画
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, this.options.startDelay + index * this.options.delay);
        });
    }
}

// 页面加载时初始化动画
document.addEventListener('DOMContentLoaded', () => {
    // 创建标题动画实例
    new TitleAnimation({
        elementSelector: '.carousel-caption h1, .section-title',
        effect: 'typing', // 可选：typing, fadeIn, slideIn
        typeSpeed: 80,    // 打字速度（毫秒/字符）
        startDelay: 500,  // 开始前延迟
        delay: 300        // 多个标题之间的延迟
    });
}); 